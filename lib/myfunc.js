const { proto, delay, downloadContentFromMessage, getContentType, areJidsSameUser, generateWAMessage, getAggregateVotesInPollMessage } = require("@whiskeysockets/baileys");
const chalk = require("chalk");
const fs = require("fs");
const FileType = require("file-type");
const Crypto = require("crypto");
const axios = require("axios");

// Check if database directory exists
if (!fs.existsSync('./database')) {
    try {
        fs.mkdirSync('./database');
    } catch (e) {
        console.error('Failed to create database directory:', e);
    }
}

// LID Database Setup
const lidPath = './database/DataUserLid.json';
if (!fs.existsSync(lidPath)) {
    try {
        fs.writeFileSync(lidPath, JSON.stringify({}));
    } catch (e) {
        console.error('Failed to create DataUserLid.json:', e);
    }
}
let lidDatabase = {};
try {
  lidDatabase = JSON.parse(fs.readFileSync(lidPath));
} catch (e) {
  console.error('Error reading DataUserLid.json:', e);
}

// Helper: Resolve LID from Metadata
const resolveLidFromMetadata = (lid, metadata) => {
    if (!metadata || !metadata.participants) return null;
    const found = metadata.participants.find(p => p.lid === lid || p.id === lid || p.jid === lid);
    if (found) {
         if (found.id && !found.id.includes('@lid')) return found.id;
         if (found.jid && !found.jid.includes('@lid')) return found.jid;
    }
    return null;
};

// Helper: Generic Resolver
const resolveJid = (jid, store, metadata) => {
    if (!jid || !jid.endsWith('@lid')) return jid;

    // 1. Check Database
    if (lidDatabase[jid] && lidDatabase[jid].jid) {
        return lidDatabase[jid].jid;
    }

    // 2. Check Store Contacts
    if (store && store.contacts) {
        for (const [realJid, data] of Object.entries(store.contacts)) {
            if (data.lid === jid) return realJid;
        }
    }

    // 3. Check Metadata
    if (metadata) {
        const res = resolveLidFromMetadata(jid, metadata);
        if (res) {
            // Save to database
            lidDatabase[jid] = { jid: res };
            try {
                fs.writeFileSync(lidPath, JSON.stringify(lidDatabase, null, 2));
            } catch (err) {
                console.error('Failed to save DataUserLid:', err);
            }
            return res;
        }
    }

    return jid;
};


exports.smsg = async (conn, m, store) => {
  if (!m) return m;
  let M = proto.WebMessageInfo;
  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat.endsWith("@g.us");

    // Initial sender determination
    let rawSender = conn.decodeJid(
      (m.fromMe && conn.user.id) ||
        m.participant ||
        m.key.participant ||
        m.chat ||
        ""
    );
    
    m.sender = rawSender;

    // --- LOAD GROUP METADATA IF NEEDED ---
    let metadata = null;
    if (m.isGroup) {
         // Ensure groupMetadata is loaded
         if (!store.groupMetadata) store.groupMetadata = {};
         metadata = store.groupMetadata[m.chat];
         if (!metadata) {
              try {
                  metadata = await conn.groupMetadata(m.chat);
                  store.groupMetadata[m.chat] = metadata;
              } catch (e) {
                  // console.error('Failed to fetch group metadata for LID resolution:', e);
              }
         }
    }

    // --- FIX SENDER ---
    if (m.sender && m.sender.endsWith('@lid')) {
        const resolvedSender = resolveJid(m.sender, store, metadata);
        if (resolvedSender !== m.sender) {
            console.log(chalk.yellow(`[LID] Resolved Sender: ${m.sender} -> ${resolvedSender}`));
            m.sender = resolvedSender;
        }
    }

    // --- FIX CHAT (Private) ---
    if (!m.isGroup && m.chat.endsWith('@lid')) {
        const resolvedChat = resolveJid(m.chat, store, null); // Metadata null for private
         if (resolvedChat !== m.chat) {
            console.log(chalk.yellow(`[LID] Resolved Private Chat: ${m.chat} -> ${resolvedChat}`));
            m.chat = resolvedChat;
            if (!m.fromMe) m.sender = resolvedChat;
        }
    }


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
    m.mentionedJid = m.m.contextInfo ? m.m.contextInfo.mentionedJid : [];

    // --- FIX MENTIONS ---
    if (m.mentionedJid && m.mentionedJid.length > 0) {
        let metadata = null;
        // Optimization: reused metadata from sender check if available,
        // otherwise it's just what we have.
        // If we are in a group, we already loaded it above.
        if (m.isGroup && store.groupMetadata) metadata = store.groupMetadata[m.chat];

        m.mentionedJid = m.mentionedJid.map(jid => {
            if (jid.endsWith('@lid')) {
                const res = resolveJid(jid, store, metadata);
                if (res !== jid) {
                     console.log(chalk.yellow(`[LID] Resolved Mention: ${jid} -> ${res}`));
                     return res;
                }
            }
            return jid;
        });
    }

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

      // --- FIX QUOTED SENDER ---
      if (m.quoted.sender && m.quoted.sender.endsWith('@lid')) {
           let metadata = null;
           if (m.isGroup && store.groupMetadata) metadata = store.groupMetadata[m.chat];
           const res = resolveJid(m.quoted.sender, store, metadata);
           if (res !== m.quoted.sender) {
               console.log(chalk.yellow(`[LID] Resolved Quoted Sender: ${m.quoted.sender} -> ${res}`));
               m.quoted.sender = res;
           }
      }

      m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id);
      m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || "";
      m.quoted.mentionedJid = m.m.contextInfo ? m.m.contextInfo.mentionedJid : [];

      // --- FIX QUOTED MENTIONS ---
       if (m.quoted.mentionedJid && m.quoted.mentionedJid.length > 0) {
            let metadata = null;
            if (m.isGroup && store.groupMetadata) metadata = store.groupMetadata[m.chat];
            m.quoted.mentionedJid = m.quoted.mentionedJid.map(jid => {
                if (jid.endsWith('@lid')) {
                    return resolveJid(jid, store, metadata);
                }
                return jid;
            });
       }


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

  // Expose findJidByLid helper
  conn.findJidByLid = (lid) => {
      if (lidDatabase[lid] && lidDatabase[lid].jid) return lidDatabase[lid].jid;
      if (store && store.contacts) {
          for (const [jid, data] of Object.entries(store.contacts)) {
              if (data.lid === lid) return jid;
          }
      }
      return null;
  };

  return m;
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
