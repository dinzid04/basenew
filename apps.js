/*
🌸 𝗦𝗖𝗥𝗜𝗣𝗧 𝗜𝗡𝗙𝗢 🌸  
┌───────────────────────────────┐
│ 💫 𝗝𝘂𝗱𝘂𝗹 : Yurii-Md  
│ 👑 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : FallZx Infinity  
│ ⚠️ 𝗡𝗼𝘁𝗲 : Jangan hapus credit ini!  
│     Hargai creator dengan tetap mencantumkan nama.  
└───────────────────────────────┘
✨ Terima kasih telah menggunakan script ini!
*/
console.log('Starting...');
const SETTING = require('./connection/setting');
let getreq = SETTING['file'];
const pino = SETTING['modul']['pino'];
const chalk = SETTING['modul']['chalk'];
const fs = SETTING['modul']['fs'];
const jimp = SETTING['modul']['jimp'];
const path = SETTING['modul']['path'];
let { Boom } = SETTING['modul']['boom'];
const PhoneNumber = SETTING['modul']['phonenumber'];
const NodeCache = SETTING['modul']['nodecache'];
const readline = SETTING['modul']['readline'];
const { move } = require(SETTING['file']['move']);
const { smsg } = require(SETTING['file']['set']);
// --- [ UPDATE IMPORT ] Tambahkan jidNormalizedUser ---
let { default: makeWASocket, useMultiFileAuthState, jidDecode, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, proto, getAggregateVotesInPollMessage, jidNormalizedUser } = SETTING['modul']['baileys'];
const { color, bgcolor, ConsoleLog, biocolor } = require(SETTING['file']['color']);
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif, writeExifStc } = require(SETTING['file']['exif']);
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const DataBase = require('./library/database');
const database = new DataBase();

(async () => {
    const loadData = await database.read()
    if (loadData && Object.keys(loadData).length === 0) {
        global.db = {
            sticker: {},
            database: {}, 
            groups: {}, 
            game: {},
            others: {},
            users: {},
            chats: {},
            settings: {},
            ...(loadData || {}),
        }
        await database.write(global.db)
    } else {
        global.db = loadData
    }
    setInterval(async () => {
        if (global.db) await database.write(global.db)
    }, 10000)
})()

// Pairing Code
const pairingCode = process.argv.includes("--pairing-code");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const msgDeduplicate = new NodeCache({ stdTTL: 5 }); 

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function parseMention(text) {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

// --- [ HELPER: Cari JID dari LID di Store ] ---
const findJidByLid = (lid, store) => {
    for (const contact of Object.values(store.contacts)) {
        if (contact.lid === lid) {
            return contact.id;
        }
    }
    return null;
}

try {
    async function operate() {
        let { state, saveCreds } = await useMultiFileAuthState(SETTING.sesionName);
        const msgRetryCounterCache = new NodeCache();
        const Yurii = makeWASocket({
            logger: pino({ level: 'silent' }),
            printQRInTerminal: !pairingCode,
            version: [2, 3000, 1028111649],
            browser: ['Ubuntu', 'Firefox', '20.0.00'],
            auth: state,
            getMessage: async (key) => {
                if (store) {
                    const m = await store.loadMessage(key.remoteJid, key.id);
                    return m.message || undefined;
                }
                return {
                    conversation: "XBOT-NEXT VERSIONS"
                };
            },
            msgRetryCounterCache
        });

        // Event Listeners
        Yurii.decodeJid = (jid) => {
            if (!jid) return jid;
            if (/:\d+@/gi.test(jid)) {
                let decode = jidDecode(jid) || {};
                return decode.user && decode.server && decode.user + '@' + decode.server || jid;
            } else return jid;
        };

        // --- [ LOGIKA PENTING: CONTACTS UPDATE (LID FIX) ] ---
        // Ini dicopas & disesuaikan dari indexyoi.js agar store menyimpan pasangan LID & JID
        Yurii.ev.on('contacts.update', update => {
            for (let contact of update) {
                let trueJid;
                // Jika update berupa LID, cari JID aslinya
                if (contact.id.endsWith('@lid')) {
                    trueJid = findJidByLid(contact.id, store) || contact.id;
                } else {
                    // Jika JID biasa, normalkan
                    trueJid = jidNormalizedUser(contact.id);
                }

                if (store && store.contacts) {
                    // Update data kontak di Store
                    store.contacts[trueJid] = {
                        ...(store.contacts[trueJid] || {}),
                        id: trueJid,
                        name: contact.notify || store.contacts[trueJid]?.name
                    }
                    // Jika yang update itu LID, simpan LID-nya di object JID aslinya
                    if (contact.id.endsWith('@lid')) {
                        store.contacts[trueJid].lid = contact.id;
                    }
                }
            }
        })
        // -----------------------------------------------------

        Yurii.yStyle = (jid, teks, title, body, url, quoted) => { 
            Yurii.sendMessage(jid, { text: teks, 
              contextInfo: { 
                "externalAdReply": { 
                    "showAdAttribution": false, 
                    "title": title, 
                    "body": body,
                    "containsAutoReply": true, 
                    "mediaType": 1, 
                    "thumbnailUrl": url,
                    "renderLargeThumbnail": true 
                }
              }}, {quoted: quoted})
        }  
  
        Yurii.replyNtag = (teks) => {
            Yurii.sendMessage(from, { text: teks, mentions: parseMention(teks) }, { quoted: m })
        }
  
        Yurii.sendFile = async (from, url, caption, m, men) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return Yurii.sendMessage(from, { video: await getBuffer(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: m})
            }
            let type = mime.split("/")[0]+"Message"
            if(mime.split("/")[0] === "image"){
                return Yurii.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: nay1})
            } else if(mime.split("/")[0] === "video"){
                return Yurii.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: m})
            } else if(mime.split("/")[0] === "audio"){
                return Yurii.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: m })
            } else {
                return Yurii.sendMessage(from, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : []}, {quoted: m })
            }
        }
        
        Yurii.xStyle = (jid, teks, url, quoted) => {
            Yurii.sendMessage(jid, { text: teks, contextInfo: {
                mentionedJid: [],
                groupMentions: [],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363300376066743@newsletter',
                   newsletterName: "XBOT-PROJECT",
                    serverMessageId: -1
                },
                forwardingScore: 256,
                externalAdReply: {
                    showAdAttribution: true,
                    title: `XBOT-PROJECT`,
                    body: `1.6 Version`,
                    thumbnailUrl: url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }}, { quoted: quoted })
        }

        Yurii.getName = (jid, withoutContact = false) => {
            id = Yurii.decodeJid(jid);
            withoutContact = Yurii.withoutContact || withoutContact;
            let v;
            if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
                v = store.contacts[id] || {};
                if (!(v.name || v.subject)) v = Yurii.groupMetadata(id) || {};
                resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'));
            });
            else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === Yurii.decodeJid(Yurii.user.id) ?
                Yurii.user :
                (store.contacts[id] || {});
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
        };

        Yurii.sendContact = async (jid, kon, quoted = '', opts = {}) => {
            let list = [];
            for (let i of kon) {
                list.push({
                    displayName: await Yurii.getName(i),
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Yurii.getName(i)}\nFN:${await Yurii.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:"fallzxcoderid@gmail.com"\nitem2.X-ABLabel:Email\nitem3.URL:"https://instagram.com/riyan_ff12"\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
                });
            }

            Yurii.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted });
        };

        // Pairing
        if (!Yurii.authState.creds.registered) {
            const phoneNumber = await question(`Please type your WhatsApp number : `);
            let code = await Yurii.requestPairingCode(phoneNumber);
            console.log(`Your Pairing Code : ${code}`);
        }

        Yurii.ev.on('connection.update', async (update) => {
            let { Connecting } = require("./connection/systemConnext.js");
            Connecting({ update, Yurii, Boom, DisconnectReason, sleep, operate });
        });

        // Save Session
        Yurii.ev.on('creds.update', saveCreds);
        
        store.bind(Yurii.ev);
        
        Yurii.ev.on('messages.upsert', async (chatUpdate) => {
            const { messages, type } = chatUpdate;
            if (!messages || messages.length === 0) return;

            for (const m of messages) {
                try {
                    if (!m.message) continue;
                    if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) continue; 
                    if (msgDeduplicate.has(m.key.id)) continue;
                    msgDeduplicate.set(m.key.id, true);

                    // Auto Read Status
                    if (m.key.remoteJid === 'status@broadcast' && SETTING['autoreadsw'] == true) {
                        setTimeout(() => {
                            Yurii.readMessages([m.key]);
                            let typ = getContentType(m.message);
                            console.log((/protocolMessage/i.test(typ)) ? `${m.key.participant.split('@')[0]} Deleted story❗` : 'View user stories : ' + m.key.participant.split('@')[0]);
                        }, 500);
                    }

                    const from = m.key.remoteJid;
                    
                    // Panggil fungsi handler
                    move(Yurii, m, store);
                    smsg(Yurii, m, store);
                    require('./message/msg.js')(m, Yurii, from, store);
                    
                } catch (err) {
                    console.error("Error processing message:", err);
                }
            }
        });

        // Respon Polling
        async function getMessage(key) {
            if (store) {
                const m = await store.loadMessage(key.remoteJid, key.id);
                return m?.message;
            }
            return {
                conversation: "Hai Im fallzxcoderid"
            };
        }

        Yurii.ev.on('messages.update', async chatUpdate => {
            for (const { key, update } of chatUpdate) {
                if (update.pollUpdates && key.fromMe) {
                    const pollCreation = await getMessage(key);
                    if (pollCreation) {
                        const pollUpdate = await getAggregateVotesInPollMessage({
                            message: pollCreation,
                            pollUpdates: update.pollUpdates,
                        });
                        var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name;
                        if (toCmd == undefined) return;
                        var prefCmd = (global.prefix || '.') + toCmd; 
                        Yurii.appenTextMessage(prefCmd, chatUpdate);
                    }
                }
            }
        });

        Yurii.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return Yurii.sendMessage(jid, { poll: { name, values, selectableCount } }) };

        // Send Text
        Yurii.sendText = (jid, text, quoted = "", options) =>
            Yurii.sendMessage(jid, { text: text, ...options }, { quoted });
            
        Yurii.sendImage = async (jid, path, caption = '', quoted = '', options) => {
            let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
            return await Yurii.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
        }

        Yurii.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
            let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
            let buffer
            if (options && (options.packname || options.author)) {
                buffer = await writeExifImg(buff, options)
            } else {
                buffer = await imageToWebp(buff)
            }
            await Yurii.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
            .then( response => {
                fs.unlinkSync(buffer)
                return response
            })
        }

        Yurii.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
            let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
            let buffer
            if (options && (options.packname || options.author)) {
                buffer = await writeExifVid(buff, options)
            } else {
                buffer = await videoToWebp(buff)
            }
            await Yurii.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
            return buffer
        }

        Yurii.copyNForward = async (jid, message, forceForward = false, options = {}) => {
            let vtype
            if (options.readViewOnce) {
                message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                delete message.message.viewOnceMessage.message[vtype].viewOnce
                message.message = {
                    ...message.message.viewOnceMessage.message
                }
            }
            let mtype = Object.keys(message.message)[0]
            let content = await generateForwardMessageContent(message, forceForward)
            let ctype = Object.keys(content)[0]
            let context = {}
            if (mtype != "conversation") context = message.message[mtype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo ? {
                contextInfo: {
                ...content[ctype].contextInfo,
                ...options.contextInfo
                }
                } : {})
            } : {})
            await Yurii.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
            return waMessage
        }

        Yurii.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
            let quoted = message.msg ? message.msg : message
            let mime = (message.msg || message).mimetype || ''
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
            const stream = await downloadContentFromMessage(quoted, messageType)
            let buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            let type = await FileType.fromBuffer(buffer)
            trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
            await fs.writeFileSync(trueFileName, buffer)
            return trueFileName
        }

        Yurii.downloadMediaMessage = async (message) => {
            let mime = (message.msg || message).mimetype || ''
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
            const stream = await downloadContentFromMessage(message, messageType)
            let buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            return buffer
        }

        Yurii.getFile = async (PATH, save) => {
            let res
            let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
            let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'}
            filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
            if (data && save) fs.promises.writeFile(filename, data)
            return {
            res,
            filename,
            size: await getSizeMedia(data),
            ...type,
            data}}

        Yurii.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
            let types = await Yurii.getFile(path, true)
            let { mime, ext, res, data, filename } = types
            if (res && res.status !== 200 || file.length <= 65536) {
                try { throw { json: JSON.parse(file.toString()) } }
                catch (e) { if (e.json) throw e.json }}
            let type = '', mimetype = mime, pathFile = filename
            if (options.asDocument) type = 'document'
            if (options.asSticker || /webp/.test(mime)) {
                let { writeExif } = require('./lib/exif')
                let media = { mimetype: mime, data }
                pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
                await fs.promises.unlink(filename)
                type = 'sticker'
                mimetype = 'image/webp'}
            else if (/image/.test(mime)) type = 'image'
            else if (/video/.test(mime)) type = 'video'
            else if (/audio/.test(mime)) type = 'audio'
            else type = 'document'
            await Yurii.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
            return fs.promises.unlink(pathFile)}

        Yurii.sendText = (jid, text, quoted = '', options) => Yurii.sendMessage(jid, { text: text, ...options }, { quoted })

        Yurii.serializeM = (m) => smsg(Yurii, m, store)

        Yurii.before = (teks) => smsg(Yurii, m, store)

        Yurii.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
            let buttonMessage = {
                text,
                footer,
                buttons,
                headerType: 2,
                ...options
            }
            Yurii.sendMessage(jid, buttonMessage, { quoted, ...options })
        }

        Yurii.sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
            let message = await prepareWAMessageMedia({ image: gam }, { upload: Yurii.waUploadToServer })
            const tod = generateWAMessageFromContent(jid,
                {"productMessage": {
                "product": {
                "productImage": message.imageMessage,
                "productId": "9999",
                "title": title,
                "description": desc,
                "currencyCode": "INR",
                "priceAmount1000": "100000",
                "url": `${websitex}`,
                "productImageCount": 1,
                "salePriceAmount1000": "0"
                },
                "businessOwnerJid": `${ownernumber}@s.whatsapp.net`
                }
                }, options)
            return Yurii.relayMessage(jid, tod.message, {messageId: tod.key.id})
        } 

        Yurii.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
            var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
                templateMessage: {
                hydratedTemplate: {
                "hydratedContentText": text,
                "locationMessage": {
                "jpegThumbnail": img },
                "hydratedFooterText": footer,
                "hydratedButtons": but
                }
                }
            }), options)
            Yurii.relayMessage(jid, template.message, { messageId: template.key.id })
        }
        global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name]: name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
            ...query, ...(apikeyqueryname ? {
                [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name]: name]
            }: {})
        })): '')

        Yurii.sendButImg = async (jid, path, teks, fke, but) => {
            let img = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
            let fjejfjjjer = {
                image: img, 
                jpegThumbnail: img,
                caption: teks,
                fileLength: "1",
                footer: fke,
                buttons: but,
                headerType: 4,
            }
            Yurii.sendMessage(jid, fjejfjjjer, { quoted: m })
        }

        Yurii.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return Yurii.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
            }
            let type = mime.split("/")[0]+"Message"
            if(mime === "application/pdf"){
                return Yurii.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
            }
            if(mime.split("/")[0] === "image"){
                return Yurii.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
            }
            if(mime.split("/")[0] === "video"){
                return Yurii.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
            }
            if(mime.split("/")[0] === "audio"){
                return Yurii.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
            }
        };
    }

    operate();
} catch (e) { console.log(chalk.red(e)); }

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.yellow(`New ${__filename}`));
    delete require.cache[file];
    require(file);
});
process.on('uncaughtException', console.error);
