const { proto, delay, downloadContentFromMessage, getContentType, areJidsSameUser, generateWAMessage, getAggregateVotesInPollMessage, jidNormalizedUser } = require("@whiskeysockets/baileys");
const chalk = require("chalk");
const fs = require("fs");
const FileType = require("file-type");
const Crypto = require("crypto");
const axios = require("axios");

// --- [ START LID DATABASE ] ---
// Ini logika penting agar LID otomatis dikonversi jadi Nomor WA (JID)
const lidPath = './database/DataUserLid.json';
if (!fs.existsSync(lidPath)) {
    if (!fs.existsSync('./database')) fs.mkdirSync('./database');
    fs.writeFileSync(lidPath, JSON.stringify({}));
}
let lidDatabase = {};
try {
	lidDatabase = JSON.parse(fs.readFileSync(lidPath));
} catch (e) {
	console.error('Gagal membaca DataUserLid.json, membuat ulang...');
	fs.writeFileSync(lidPath, JSON.stringify({}));
}
// --- [ END LID DATABASE ] ---

exports.smsg = (conn, m, store) => {
  if (!m) return m;
  let M = proto.WebMessageInfo;
  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat.endsWith("@g.us");
    
    // --- [ 1. FIX SENDER (LID to JID) ] ---
    // Ambil sender mentah dulu
    m.sender = conn.decodeJid(
      (m.fromMe && conn.user.id) ||
        m.participant ||
        m.key.participant ||
        m.chat ||
        ""
    );
    if (m.sender.includes(':')) m.sender = jidNormalizedUser(m.sender);

    // LOGIKA KHUSUS LID FIX (Diambil dari myfuncyoi)
    if (m.sender && m.sender.endsWith('@lid')) {
        // Cek di database lokal dulu
        if (lidDatabase[m.sender] && lidDatabase[m.sender].jid) {
            m.sender = lidDatabase[m.sender].jid;
        } else if (store && store.contacts) {
            // Cek di Store contacts
            const contact = Object.values(store.contacts).find(c => c.lid === m.sender);
            if (contact && contact.id) {
                m.sender = contact.id;
                // Simpan ke database biar besok2 gak nyari lagi
                lidDatabase[m.key.participant] = { jid: contact.id };
                try { fs.writeFileSync(lidPath, JSON.stringify(lidDatabase, null, 2)); } catch {}
            }
        }
    }
    
    // Paksa normalize biar belakangnya @s.whatsapp.net (Jaga-jaga)
    if (m.sender.endsWith('@lid')) {
         // Fallback jika gagal mapping: Biarkan @lid tapi bot mungkin menganggapnya user baru
         // Atau bisa dipaksa split (Resiko nomor salah, tapi format benar):
         // m.sender = m.sender.split('@')[0] + '@s.whatsapp.net' 
    } else {
         m.sender = m.sender.split('@')[0] + '@s.whatsapp.net';
    }
    // ----------------------------------------
    
    conn.downloadAndSaveYanz = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.m ? message.m : message;
    let mime = (message.m || message).mimetype || "";
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };

  conn.downloadMediaYanz = async (message) => {
    let mime = (message.m || message).mimetype || "";
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  };

  const { getImg, getBuffer } = require("../lib/function");

  conn.sendImage = async (jid, path, caption = "", quoted = "", options) => {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], "base64") : /^https?:\/\//.test(path) ? await await getImg(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
    return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted });
  };

    
    if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || "";
  }
  if (m.message) {
    m.xtype = getContentType(m.message);
    m.m = m.xtype == "viewOnceMessage" ? m.message[m.xtype].message[getContentType(m.message[m.xtype].message)] : m.message[m.xtype];

    m.body = m.message.conversation || m.m.caption || m.m.text || (m.xtype == "listResponseMessage" && m.m.singleSelectReply.selectedRowId) || (m.xtype == "buttonsResponseMessage" && m.m.selectedButtonId) || (m.xtype == "viewOnceMessage" && m.m.caption) || m.text;
    
    let quoted = (m.quoted = m.m.contextInfo ? m.m.contextInfo.quotedMessage : null);
    
    // --- [ 2. FIX MENTIONED JID (LID to JID) ] ---
    m.mentionedJid = m.m.contextInfo ? m.m.contextInfo.mentionedJid : [];
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        m.mentionedJid = m.mentionedJid.map(jid => {
            if (jid.endsWith('@lid')) {
                // Cek DB
                if (lidDatabase[jid] && lidDatabase[jid].jid) return lidDatabase[jid].jid;
                // Cek Store
                if (store && store.contacts) {
                    const contact = Object.values(store.contacts).find(c => c.lid === jid);
                    if (contact && contact.id) return contact.id;
                }
            }
            return jid;
        });
    }
    // ---------------------------------------------

    if (m.quoted) {
      let type = getContentType(quoted);
      m.quoted = m.quoted[type];
      if (["productMessage"].includes(type)) {
        type = getContentType(m.quoted);
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === "string")
        m.quoted = {
          text: m.quoted,
        };
      m.quoted.xtype = type;
      m.quoted.id = m.m.contextInfo.stanzaId;
      m.quoted.chat = m.m.contextInfo.remoteJid || m.chat;
      m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith("BAE5") && m.quoted.id.length === 16 : false;
      m.quoted.sender = conn.decodeJid(m.m.contextInfo.participant);
      m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id);

      // --- [ 3. FIX QUOTED SENDER (LID to JID) ] ---
      if (m.quoted.sender && m.quoted.sender.endsWith('@lid')) {
           if (lidDatabase[m.quoted.sender] && lidDatabase[m.quoted.sender].jid) {
               m.quoted.sender = lidDatabase[m.quoted.sender].jid;
           } else if (store && store.contacts) {
               const contact = Object.values(store.contacts).find(c => c.lid === m.quoted.sender);
               if (contact && contact.id) {
                   m.quoted.sender = contact.id;
               }
           }
      }
      // Normalize
      m.quoted.sender = m.quoted.sender.split('@')[0] + '@s.whatsapp.net';
      // ---------------------------------------------

      m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || "";
      m.quoted.mentionedJid = m.m.contextInfo ? m.m.contextInfo.mentionedJid : [];
      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted.id) return false;
        let q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return exports.smsg(conn, q, store);
      };
      let vM = (m.quoted.fakeObj = M.fromObject({
        key: {
          remoteJid: m.quoted.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id,
        },
        message: quoted,
        ...(m.isGroup ? { participant: m.quoted.sender } : {}),
      }));
      m.quoted.delete = () =>
        conn.sendMessage(m.quoted.chat, { delete: vM.key });
      m.quoted.download = () => conn.downloadMediaYanz(m.quoted);
    }
  }
  if (m.m.url) m.download = () => conn.downloadMediaYanz(m.m);
  m.text = m.m.text || m.m.caption || m.message.conversation || m.m.contentText || m.m.selectedDisplayText || m.m.title || "";
  m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, { ...options }) : conn.sendText(chatId, text, m, { ...options })
  m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
  m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)
  
  conn.appenTextMessage = async(text, chatUpdate) => {
  	let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
  		userJid: conn.user.id,
  		quoted: m.quoted && m.quoted.fakeObj
      })    
      messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
      messages.key.id = m.key.id
      messages.pushName = m.pushName
      if (m.isGroup) messages.participant = m.sender
      let m = {
      	...chatUpdate,
      	messages: [proto.WebMessageInfo.fromObject(messages)],
      	type: 'append'
      }   
      conn.ev.emit('messages.upsert', m)
  }  
  return m;
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
