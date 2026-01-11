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
const SETTING = require('../connection/setting')
const keywords = require('../lib/validator/allKeywords')

let modul = SETTING['modul'];
let getreq = SETTING['file'];
const chalk = modul['chalk'];
const fs = modul['fs'];
const util = modul['util'];
const https = modul['https'];
const os = require('os');
const axios = modul['axios'];
const ytsr = modul['ytsr'];
const { spawn, exec, execSync } = modul['child'];
const { downloadContentFromMessage, WA_DEFAULT_EPHEMERAL, getLastMessageInChat, MessageType, generateWAMessageFromContent, prepareWAMessageMedia, proto } = modul['baileys'];
const moment = modul['time'];
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const speed = modul['speed'];
const request = modul['request'];
const path = modul['path'];
const ms = modul['premium'];
const cheerio = require('cheerio');
const _prem = require('.' + getreq['prem']);
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
const { color, bgcolor, ConsoleLog, biocolor } = require('.' + getreq['color']);
const { formatSize, sleep, readTime, reSize, runtime, getBuffer, getRandom, pickRandom, fetchJson, isUrl, genMath, formatp } = require('.' + getreq['funct']);
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif, writeExifStc } = require('.' + getreq['exif']);

//SCRAPE
const { upload } = require('../lib/scrape/uploader.js');

//DATABASE 
var balance = JSON.parse(fs.readFileSync('./database/balance.json'));
var limit = JSON.parse(fs.readFileSync('./database/limit.json'));
var glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
var premium = JSON.parse(fs.readFileSync('./database/premium.json'));
var pendaftar = JSON.parse(fs.readFileSync('./database/user.json'));
const db_api = JSON.parse(fs.readFileSync('./database/api.json'));
const afk = require("../lib/afk");
let _afk = JSON.parse(fs.readFileSync("./database/afk.json"));
const databasefile = './database/database/database.json';
function loaddatabase() {
  if (fs.existsSync(databasefile)) {
    try {
      const raw = fs.readFileSync(databasefile);
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error reading DB file:', err);
      return {
        chats: {}
      };
    }
  } else {
    return {
      chats: {}
    };
  }
}

function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}
global.db = loaddatabase();
if (global.db) global.db = {
  sticker: {},
  database: {},
  game: {},
  others: {},
  users: {},
  chats: {},
  settings: {},
  ...(global.db || {})
}
const tebakgambar = {}
const tebakgame = {}
const tebakhero = {}
const tebakff = {}
const tebakkabupaten = {}
const tebakkartun = {}
const tebakjkt48 = {}
const tebaknct = {}
const tebakenhypen = {}
const tebakhewan = {}
const tebakml = {}
const tebakchara = {}
const tebaklogo = {}
const tebakaplikasi = {}
const tebakkata = {}
const asahotak = {}
const lengkapikalimat = {}
const tebakbendera = {}
const siapaaku = {}
const tebakkalimat = {}
const caklontong = {}
const susunkata = {}
const tekateki = {}
const kuisioner = {}
const tebakkimia = {}
const tebaklirik = {}
const tebaktebakan = {}
const petakbom = {}
const pirates = {}
const mathgame = {}
const verifyNumber = {}
let tebaklagu1 = []
let _family100 = []
let kuismath = []
let tebakgambar1 = []
let tebakkata1 = []
let transactionDetails = {};
let caklontong1 = []
let caklontong_desk = []
let tebakkalimat1 = []
let tebaklirik1 = []
let tebaktebakan1 = []
let tebakbendera1 = []
let tebakbendera2 = []
let tebakkabupaten1 = []
let tebakkimia1 = []
let tebakasahotak = []
let tebaksiapakahaku = []
let tebaksusunkata = []
let tebaktekateki = []
let vote = db.others.vote = []
//SETUP
module.exports = async(m, DinzBotz, from, store) => { 
   const isGrouP = from.endsWith('@g.us')
   const sender = isGrouP ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
   const pushname = m.pushName || "No Name"
   const CMD = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
   let pfxConf = JSON.parse(fs.readFileSync('./database/prefix.json'));
   let prefix;
   if (pfxConf.mode === 'noprefix') {
       prefix = '';
   } else if (pfxConf.mode === 'multi') {
       prefix = /^[#!.,®©¥€¢£/\∆✓]/.test(CMD) ? CMD.match(/^[#!.,®©¥€¢£/\∆✓]/gi) : '#';
   } else {
       prefix = pfxConf.symbol;
   }
   global.prefix = prefix;
   const chatmessage = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.xtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
   const ordermessage = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text.startsWith(prefix) ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId.startsWith(prefix) ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId.startsWith(prefix) ? m.message.templateButtonReplyMessage.selectedId : ''   
   const chats = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''   	
   const args = ordermessage.trim().split(/ +/).slice(1)         
   const order = ordermessage.slice(0).trim().split(/ +/).shift().toLowerCase()	   
   const isCmd = ordermessage.startsWith(prefix)   
   const command = isCmd ? ordermessage.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
   const text = q = args.join(' ')   
   const fatkuns = (m.quoted || m)
   const quoted = (fatkuns.xtyp == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.xtyp == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.xtyp == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m   
   const content = JSON.stringify(m.message)
   const orderPlugins = isCmd ? ordermessage.slice(1).trim().split(/ +/).shift().toLowerCase() : null
   const isGroup = from.endsWith(keywords[0]['chats'][1])
   const isChanel = from.endsWith('@newsletter')
   const getGroupAdmins = (participants) =>{
    return participants
        .filter(u => u.admin === 'admin' || u.admin === 'superadmin')
        .map(u => u.jid);
		};
   const normalize = jid => jid.split(':')[0] + '@s.whatsapp.net';
   const botNumber = DinzBotz.user.id.split(':')[0] + keywords[0]['chats'][0]
   const mime = (quoted.msg || quoted).mimetype || ''
   const isMedia = /image|video|sticker|audio/.test(mime)
   const itulho = isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid  
   const isOwner = [botNumber, ...global.ownerNumber].map(jid => jid.replace(/[^0-9]/g, '') + keywords[0]['chats'][0]).includes(itulho)
   const groupMetadata = m.isGroup ? await DinzBotz.groupMetadata(m.chat).catch(() => ({})) : null;
   const groupMembers = m.isGroup ? groupMetadata.participants || [] : [];
   const groupAdmins = m.isGroup ? getGroupAdmins(groupMembers) : [];
   const isBotAdmins = m.isGroup ? groupAdmins.map(normalize).includes(normalize(botNumber)) : false;
   const isAdmins = m.isGroup ? groupAdmins.map(normalize).includes(normalize(m.sender)) : false;
        m.isAdmins = isAdmins
        m.isAdmin = isAdmins
        let isAdmin = isAdmins
        m.isBotAdmin = isBotAdmins
        m.isBotAdmins = isBotAdmins
        let isBotAdmin = isBotAdmins
   const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
   const isPrem = isOwner ? true : _prem.checkPremiumUser(sender, premium)
   const gcounti = SETTING.gcount
   const gcount = isPremium ? gcounti.prem : gcounti.user
   const limitCount = SETTING.limitCount
   const isUser = pendaftar.includes(sender)
   const isAfkOn = afk.checkAfkUser(m.sender, _afk)
   const mentionedJid = m.mentionedJid || [] 
   _prem.expiredCheck(DinzBotz, premium)
   const mentionByTag = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
   const mentionByreply = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
  const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByreply) : []
  const mentionUser = mention != undefined ? mention.filter(n => n) : false
  const today = moment().tz("Asia/Jakarta")
  const day = today.format('dddd');
  const datee = today.format('D');
  const month = today.format('MMMM');
  const year = today.format('YYYY');


//----- configuration user ---//
    try {
      const isNumber = x => typeof x === 'number' && !isNaN(x)
      const user = global.db.users[m.sender]
      if (typeof user !== 'object') global.db.users[m.sender] = {}
      const chats = global.db.chats[m.chat]
      if (typeof chats !== 'object') global.db.chats[m.chat] = {}

      if (chats) {
        if (!('antitagsw' in chats)) chats.antitagsw = false
        if (!('autoyoimiya' in chats)) chats.autoyoimiya = false
        if (!('antipromosi' in chats)) chats.antipromosi = false
        if (!('owneronly' in chats)) chats.owneronly = false
      } else global.db.chats[m.chat] = {
        owneronly: false,
        antitagsw: false,
        autoyoimiya: false,
        antipromosi: false
      }

      if (user) {
        if (!isNumber(user.subscribers)) user.subscribers = 0
        if (!isNumber(user.like)) user.like = 0
        if (!isNumber(user.viewers)) user.viewers = 0
        if (!isNumber(user.playButton)) user.playButton = 0
        if (!isNumber(user.lastLive)) user.lastLive = 0
        if (!isNumber(user.chip)) user.chip = 0
        if (!isNumber(user.level)) user.level = 0
        if (!isNumber(user.atm)) user.atm = 0
        if (!isNumber(user.money)) user.money = 0
        if (!isNumber(user.fullatm)) user.fullatm = 0
        if (!isNumber(user.bank)) user.bank = 0
        if (!isNumber(user.health)) user.health = 100
        if (!isNumber(user.potion)) user.potion = 0
        if (!isNumber(user.trash)) user.trash = 0
        if (!isNumber(user.wood)) user.wood = 0
        if (!isNumber(user.rock)) user.rock = 0
        if (!isNumber(user.string)) user.string = 0
        if (!isNumber(user.petfood)) user.petfood = 0
        if (!isNumber(user.emerald)) user.emerald = 0
        if (!isNumber(user.diamond)) user.diamond = 0
        if (!isNumber(user.gold)) user.gold = 0
        if (!isNumber(user.botol)) user.botol = 0
        if (!isNumber(user.kardus)) user.kardus = 0
        if (!isNumber(user.kaleng)) user.kaleng = 0
        if (!isNumber(user.gelas)) user.gelas = 0
        if (!isNumber(user.plastik)) user.plastik = 0
        if (!isNumber(user.iron)) user.iron = 0
        if (!isNumber(user.common)) user.common = 0
        if (!isNumber(user.uncommon)) user.uncommon = 0
        if (!isNumber(user.mythic)) user.mythic = 0
        if (!isNumber(user.legendary)) user.legendary = 0
        if (!isNumber(user.umpan)) user.umpan = 0
        if (!isNumber(user.pet)) user.pet = 0
        if (!isNumber(user.paus)) user.paus = 0
        if (!isNumber(user.kepiting)) user.kepiting = 0
        if (!isNumber(user.gurita)) user.gurita = 0
        if (!isNumber(user.cumi)) user.cumi = 0
        if (!isNumber(user.buntal)) user.buntal = 0
        if (!isNumber(user.dory)) user.dory = 0
        if (!isNumber(user.lumba)) user.lumba = 0
        if (!isNumber(user.lobster)) user.lobster = 0
        if (!isNumber(user.hiu)) user.hiu = 0
        if (!isNumber(user.udang)) user.udang = 0
        if (!isNumber(user.orca)) user.orca = 0
        if (!isNumber(user.banteng)) user.banteng = 0
        if (!isNumber(user.gajah)) user.gajah = 0
        if (!isNumber(user.harimau)) user.harimau = 0
        if (!isNumber(user.kambing)) user.kambing = 0
        if (!isNumber(user.panda)) user.panda = 0
        if (!isNumber(user.buaya)) user.buaya = 0
        if (!isNumber(user.kerbau)) user.kerbau = 0
        if (!isNumber(user.sapi)) user.sapi = 0
        if (!isNumber(user.monyet)) user.monyet = 0
        if (!isNumber(user.babihutan)) user.babihutan = 0
        if (!isNumber(user.babi)) user.babi = 0
        if (!isNumber(user.ayam)) user.ayam = 0

        if (!isNumber(user.lastadventure)) user.lastadventure = 0
        if (!isNumber(user.lastkill)) user.lastkill = 0
        if (!isNumber(user.lastmisi)) user.lastmisi = 0
        if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
        if (!isNumber(user.lastwar)) user.lastwar = 0
        if (!isNumber(user.lastsda)) user.lastsda = 0
        if (!isNumber(user.lastduel)) user.lastduel = 0
        if (!isNumber(user.lastmining)) user.lastmining = 0
        if (!isNumber(user.lasthunt)) user.lasthunt = 0
        if (!isNumber(user.lastgift)) user.lastgift = 0
        if (!isNumber(user.lastberkebon)) user.lastberkebon = 0
        if (!isNumber(user.lastdagang)) user.lastdagang = 0
        if (!isNumber(user.lasthourly)) user.lasthourly = 0
        if (!isNumber(user.lastbansos)) user.lastbansos = 0
        if (!isNumber(user.lastrampok)) user.lastrampok = 0
        if (!isNumber(user.lastclaim)) user.lastclaim = 0
        if (!isNumber(user.lastnebang)) user.lastnebang = 0
        if (!isNumber(user.lastweekly)) user.lastweekly = 0
        if (!isNumber(user.lastmonthly)) user.lastmonthly = 0
        if (!isNumber(user.apel)) user.apel = 0
        if (!isNumber(user.anggur)) user.anggur = 0
        if (!isNumber(user.jeruk)) user.jeruk = 0
        if (!isNumber(user.mangga)) user.mangga = 0
        if (!isNumber(user.pisang)) user.pisang = 0
        if (!isNumber(user.makanan)) user.makanan = 0
        if (!isNumber(user.bibitanggur)) user.bibitanggur = 0
        if (!isNumber(user.bibitpisang)) user.bibitpisang = 0
        if (!isNumber(user.bibitapel)) user.bibitapel = 0
        if (!isNumber(user.bibitmangga)) user.bibitmangga = 0
        if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0
        if (!isNumber(user.horse)) user.horse = 0
        if (!isNumber(user.horseexp)) user.horseexp = 0
        if (!isNumber(user.cat)) user.cat = 0
        if (!isNumber(user.catexp)) user.catexp = 0
        if (!isNumber(user.fox)) user.fox = 0
        if (!isNumber(user.foxhexp)) user.foxexp = 0
        if (!isNumber(user.dog)) user.foxexp = 0
        if (!isNumber(user.dogexp)) user.dogexp = 0
        if (!isNumber(user.robo)) user.robo = 0
        if (!isNumber(user.roboexp)) user.roboexp = 0
        if (!isNumber(user.horselastfeed)) user.horselastfeed = 0
        if (!isNumber(user.catlastfeed)) user.catlastfeed = 0
        if (!isNumber(user.robolastfeed)) user.robolastfeed = 0
        if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0
        if (!isNumber(user.doglastfeed)) user.doglastfeed = 0
        if (!isNumber(user.robo)) user.robo = 0
        if (!isNumber(user.robodurability)) user.robodurability = 0
        if (!isNumber(user.armor)) user.armor = 0
        if (!isNumber(user.armordurability)) user.armordurability = 0
        if (!isNumber(user.sword)) user.sword = 0
        if (!isNumber(user.sworddurability)) user.sworddurability = 0
        if (!isNumber(user.pickaxe)) user.pickaxe = 1
        if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.rank)) user.rank = 0
        if (!isNumber(user.fishingrod)) user.fishingrod = 0
        if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
        if (!user.premium) user.premiumTime = 0
        if (!('afkReason' in user)) user.afkReason = ''
        if (!("premium" in user)) user.premium = false
        if (!('autoMikasa' in user)) user.autoMikasa = false
        if (!('autoaiset' in user)) user.autoaiset = false
        if (!('caiSesi' in user)) user.caiSesi = ''
        if (!('nama' in user)) user.nama = `${pushname}`;
      } else global.db.users[m.sender] = {
        subscribers: 0,
        like: 0,
        viewers: 0,
        youtube: `${pushname}`,
        playButton: 0,
        lastLive: 0,
        afkTime: -1,
        afkReason: '',
        premiumTime: 0,
        premium: false,
        money: 100000,
        exp: 0,
        rank: 0,
        autoMikasa: false,
        autoaiset: false,
        caiSesi: '',
        level: 0,
        rankup: 0,
        limit: 20,
        freelimit: 0,
        nama: `${pushname}`,
        lastclaim: 0,
        skata: 0,
        registered: false,
        name: m.name,
        pc: 0,
        joinlimit: 1,
        age: -1,
        regTime: -1,
        unreg: false,
        afk: -1,
        afkReason: '',
        banned: false,
        bannedTime: 0,
        warning: 0,
        rokets: 0,
        role: 'Beginner',
        skill: '',
        ojekk: 0,
        WarnReason: '',
        chip: 0,
        bank: 0,
        atm: 0,
        fullatm: 0,
        health: 1000,
        potion: 10,
        trash: 0,
        wood: 0,
        rock: 0,
        string: 0,
        emerald: 0,
        diamond: 0,
        gold: 0,
        iron: 0,
        common: 0,
        uncommon: 0,
        mythic: 0,
        legendary: 0,
        umpan: 0,
        pet: 0,
        horse: 0,
        horseexp: 0,
        horselastfeed: 0,
        cat: 0,
        catexp: 0,
        catlastfeed: 0,
        fox: 0,
        foxexp: 0,
        foxlastfeed: 0,
        robo: 0,
        roboexp: 0,
        robolastfeed: 0,
        dog: 0,
        dogexp: 0,
        doglastfeed: 0,
        paus: 0,
        kepiting: 0,
        gurita: 0,
        cumi: 0,
        buntal: 0,
        dory: 0,
        lumba: 0,
        lobster: 0,
        hiu: 0,
        udang: 0,
        ikan: 0,
        orca: 0,
        banteng: 0,
        harimau: 0,
        gajah: 0,
        kambing: 0,
        buaya: 0,
        kerbau: 0,
        sapi: 0,
        monyet: 0,
        babi: 0,
        ayam: 0,
        armor: 1,
        armordurability: 0,
        sword: 1,
        sworddurability: 0,
        pickaxe: 1,
        pickaxedurability: 0,
        fishingrod: 0,
        fishingroddurability: 0,
        robo: 0,
        robodurability: 0,
        apel: 20,
        pisang: 0,
        anggur: 0,
        mangga: 0,
        jeruk: 0,
        lastadventure: 0,
        lastkill: 0,
        lastmisi: 0,
        lastdungeon: 0,
        lastwar: 0,
        lastsda: 0,
        lastduel: 0,
        lastmining: 0,
        lasthunt: 0,
        lastgift: 0,
        lastberkebon: 0,
        lastdagang: 0,
        lasthourly: 0,
        lastbansos: 0,
        lastrampok: 0,
        lastclaim: 0,
        lastnebang: 0,
        lastweekly: 0,
        lastmonthly: 0

      }

      // Inisialisasi file database untuk Auto AI v2

      const setting = db.settings[botNumber]
      if (typeof setting !== 'object') db.settings[botNumber] = {}
      if (setting) {
        if (!('anticall' in setting)) setting.anticall = false
        if (!isNumber(setting.status)) setting.status = 0
        if (!('autobio' in setting)) setting.autobio = false
        if (!('autopromosi' in setting)) setting.autopromosi = false
        if (!('autoread' in setting)) setting.autoread = false
        if (!('goodbye' in setting)) chats.goodbye = setting.auto_leaveMsg
        if (!('onlygrub' in setting)) setting.onlygrub = false
        if (!('onlyadmin' in setting)) setting.onlyadmin = false
        if (!('onlypc' in setting)) setting.onlypc = false
        if (!('welcome' in setting)) chats.welcome = setting.auto_welcomeMsg
      } else global.db.settings[botNumber] = {
        anticall: false,
        status: 0,
        stock: 10,
        autobio: false,
        autopromosi: false,
        autoread: false,
        auto_ai_grup: false,
        goodbye: false,
        onlyadmin: false,
        onlygrub: false,
        onlypc: false,
        welcome: false,
        autoread: false
      }
      } catch (err) {
      console.error(err)
    }








//FUNCTION
const pathSewa = './database/sewa.json';
const readDbSewa = () => {
    try {
        if (!fs.existsSync(pathSewa)) {
            if (!fs.existsSync('./database')) fs.mkdirSync('./database'); 
            fs.writeFileSync(pathSewa, JSON.stringify([], null, 2));
            return [];
        }
        return JSON.parse(fs.readFileSync(pathSewa));
    } catch (e) { return []; }
};
const writeDbSewa = (data) => {
    try { fs.writeFileSync(pathSewa, JSON.stringify(data, null, 2)); } catch (e) {}
};
const checkIsSewa = (jid) => {
    let db = readDbSewa();
    return db.some(x => x.id === jid);
};
const checkSewaSafe = async (dinz) => {
    if (global.lastSewaCheck && Date.now() - global.lastSewaCheck < 60000) return;
    global.lastSewaCheck = Date.now(); 
    try {
        let dbSewa = readDbSewa();
        let now = Date.now();
        let isModified = false;

        for (let i = 0; i < dbSewa.length; i++) {
            let data = dbSewa[i];
            if (now >= data.expired) {
                console.log(`[SEWA] Expired: ${data.id}`);
                
                if (dinz && dinz.ws && dinz.ws.isOpen) {
                    await dinz.sendMessage(data.id, { 
                        text: `⚠️ *MASA SEWA HABIS* ⚠️\n\nBot akan keluar otomatis.\nTerima kasih telah menggunakan jasa kami.`,
                        contextInfo: {
                            externalAdReply: {
                                title: "RENTAL EXPIRED",
                                thumbnailUrl: "https://cdn.dinzid.biz.id/6S2g.jpg",
                                mediaType: 1, renderLargerThumbnail: true
                            }
                        }
                    });
                    
                    await new Promise(r => setTimeout(r, 2000));
                    await dinz.groupLeave(data.id);
                }
                dbSewa.splice(i, 1);
                isModified = true;
                i--; 
            }
        }
        if (isModified) writeDbSewa(dbSewa);
    } catch (e) {
        console.log('Error check sewa safe:', e);
    }
};
function getRandomImageUrl() {
      const imageUrls = [
        "https://cdn.dinzid.biz.id/jnrY.jpg",
        "https://cdn.dinzid.biz.id/rscu.jpg",
        "https://cdn.dinzid.biz.id/7ols.jpg",
        "https://cdn.dinzid.biz.id/xiSO.jpg",
        "https://cdn.dinzid.biz.id/KsNz.jpg",
        "https://cdn.dinzid.biz.id/GgXf.jpg",
        // Tambahkan URL gambar lain di sini
      ];
      return imageUrls[Math.floor(Math.random() * imageUrls.length)];
    }
async function reply(txt) {
      DinzBotz.sendMessage(m.chat, {
        text: txt,
        contextInfo: {
          "externalAdReply": {
            "title": `${global.botname}`,
            "body": `https://dinzid.my.id`,
            "previewType": "PHOTO",
            "thumbnailUrl": getRandomImageUrl(),
            "sourceUrl": ``
          },
        }
      }, {
        quoted: m
      })
    }
  const qkontak = { 
    key: {
        fromMe: false, 
        participant: "0@s.whatsapp.net", 
        ...(from ? { remoteJid: "status@broadcast" } : {})
    }, 
    message: { 
        contactMessage: { 
            displayName: `${m.sayingtime + m.timoji}\n☏User: ${pushname}`, 
            vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + `item1.TEL;waid=${sender.split("@")[0]}:+${sender.split("@")[0]}\n` + 'item1.X-ABLabel:Ponsel\n' + 'END:VCARD' 
        } 
    } 
  }

//CONFIG AFK
if (m.isGroup) {
let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
for (let ment of mentionUser) {
if (afk.checkAfkUser(ment, _afk)) {
let getId2 = afk.getAfkId(ment, _afk)
let getReason2 = afk.getAfkReason(getId2, _afk)
let getTime = Date.now() - afk.getAfkTime(getId2, _afk)
let heheh2 = await readTime(getTime)
m.reply(` *[ ⛔ PERINGATAN ⛔ ]*
 
 📝 *Note :* Jangan tag dia kak, Dia sedang afk
 💡 *Alasan* : ${getReason2}
 🕛 *Selama* : ${heheh2.hours} jam, ${heheh2.minutes} menit, ${heheh2.seconds} detik yg lalu`)
}
}
if (afk.checkAfkUser(m.sender, _afk)) {
let getId = afk.getAfkId(m.sender, _afk)
let getReason = afk.getAfkReason(getId, _afk)
let getTime = Date.now() - afk.getAfkTime(getId, _afk)
let heheh = await readTime(getTime)
_afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
DinzBotz.sendTextWithMentions(m.chat,`*[ 👑 KEMBALI DARI AFK 👑 ]*
 
 👤 *User* : @${m.sender.split('@')[0]}
 💡 *Alasan* : ${getReason}
 🕛 *Selama* : ${heheh.hours} jam, ${heheh.minutes} menit, ${heheh.seconds} detik yg lalu`, m)
}
}

//EVALED & EXEC
if (chatmessage.startsWith('<')) {
    if (!isOwner) return
    if (!q) return m.reply('Masukan Parameter Code!')
    let kode = chatmessage.trim().split(/ +/)[0]
    let teks
    try {
        teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
    } catch (e) {
        teks = e
    } finally {
        await m.reply(require('util').format(teks))
    }
}
if (chatmessage.startsWith('=>')) {
    if (!isOwner) return
    function Return(sul) {
        sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined) {
            bang = util.format(sul)
        }
        return m.reply(bang)
    }
    try {
        m.reply(util.format(eval(`(async () => { ${chatmessage.slice(3)} })()`)))
    } catch (e) {
        m.reply(String(e))
    }
}
if (chatmessage.startsWith('>')) {
    if (!isOwner) return
    try {
        let evaled = await eval(chatmessage.slice(2))
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        await m.reply(evaled)
    } catch (err) {
        m.reply(String(err))
    }
}
if (chatmessage.startsWith('$')) {
    if (!isOwner) return
    exec(chatmessage.slice(2), (err, stdout) => {
        if(err) return DinzBotz.sendMessage(from, {text :String(err)}, {quoted:m})
        if (stdout) return m.reply(stdout)
    })
}

//AUTO REGISTER
if (m.message && m.text && !isUser && !isGroup) {
    pendaftar.push(sender)
    fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
}

//ONLYGC
const onlygc = () => {
  DinzBotz.sendMessage(m.chat, {
    text: `_ʜᴀʟᴏ ${pushname}, *xʙᴏᴛ-ɴᴇxᴛ ᴠᴇʀꜱɪᴏɴ* ʜᴀɴʏᴀ ʙɪꜱᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ᴅᴀʟᴀᴍ ɢʀᴏᴜᴘ ꜱᴀᴊᴀ, ᴊɪᴋᴀ ɪɴɢɪɴ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴɴʏᴀ ᴅɪ ᴘʀɪᴠᴀᴛ ᴄʜᴀᴛ ᴘᴇʀᴛɪᴍʙᴀɴɢᴋᴀɴ ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴇʟɪ ʜᴀᴋ ᴀᴋꜱᴇꜱ ᴘʀᴇᴍɪᴜᴍ ᴀᴛᴀᴜ ᴍᴇᴍʙᴇʟɪ ꜱᴄʀɪᴘᴛ ɴʏᴀ_`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `AKSES DILARANG 🚫`,
        body: "Only In Group Chat",
        thumbnailUrl: "https://endpoint.web.id/server/file/Zy853r7VXWBRHTnM.jpg",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

//NYALAKAN INI JIKA INGIN ONLYGC
/*if (order) {
  if (!isOwner && !m.isGroup && !m.isChanel) return onlygc();
}*/

//CMD
if (m.message) {
  if (isCmd && !m.isGroup) {
    console.log(chalk.white(`===================================================
    📆 DATE: ${new Date().toLocaleString()}
    💭 PESAN : ${m.body || m.mtype}
    👤️ DARI : ${pushname}
    🔖 USER JID : ${m.sender}`));
  } else if (isCmd && m.isGroup) {
    console.log(chalk.white(`===================================================
    📆 DATE: ${new Date().toLocaleString()}
    💭 PESAN : ${m.body || m.mtype}
    👤 DARI : ${pushname}
    🔖 USER JID : ${m.sender}
    💡 LOKASI : ${DinzBotz.groupName}`));
  }
}

//CONFIG ANTILINK
let antilinkStatus = false;
const saveAntilinkStatus = () => {
    fs.writeFileSync('./database/antilink.json', JSON.stringify({ status: antilinkStatus }));
};
const loadAntilinkStatus = () => {
    if (fs.existsSync('./database/antilink.json')) {
        const data = JSON.parse(fs.readFileSync('./database/antilink.json'));
        antilinkStatus = data.status;
    }
};
loadAntilinkStatus();

//COMMAND 
    switch(command) {
  case 'menu': {
  DinzBotz.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
  
  // Cek mode yang dipilih user (default: nobutton)
  const currentMode = global.menuMode || 'nobutton';
  
  if (currentMode === 'button') {
    // Tampilkan menu versi button
    let menu = `Hai Kak ${pushname}👋,

ᴍᴇɴᴜ ɪɴɪ ᴍᴇɴᴜ ʙᴜᴛᴛᴏɴ 
ʏᴀɴɢ ᴅɪsɪᴍᴘᴇʟᴋᴀɴ 
ᴀɢᴀʀ ᴍᴇᴍᴜᴅᴀʜᴋᴀɴ
ᴜsᴇʀ sᴀᴀᴛ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ
ғɪᴛᴜʀ ғɪᴛᴜʀ ʙᴏᴛ

ʜᴜᴛᴀᴏ - ᴍᴅ ᴠ1 ʏᴀɴɢ sɪᴀᴘ
ᴍᴇɴᴇᴍᴀɴɪ ᴀɴᴅᴀ ᴋᴀᴘᴀɴᴘᴜɴ ɪᴛᴜ
ᴊɪᴋᴀ ᴋᴀᴍᴜ ʙᴜᴛᴜʜ ʙᴀɴᴛᴜᴀɴ
ᴀᴋᴜ sɪᴀᴘ ᴍᴇᴍʙᴀɴᴛᴜ 

> ᴄʟɪᴄᴋ ᴀʟʟᴍᴇɴᴜ ᴜɴᴛᴜᴋ ᴍᴇʟɪʜᴀᴛ sᴇᴍᴜᴀ ᴍᴇɴᴜ\n`
        DinzBotz.sendMessage(m.chat, {
          footer: '© DinzID VyL - 2025',
          buttons: [{
              buttonId: `.owner`,
              buttonText: {
                displayText: 'ᴏᴡɴᴇʀ'
              },
              type: 1
            },
            {
              buttonId: `.menu`,
              buttonText: {
                displayText: 'ᴍᴇɴᴜ sɪᴍᴘᴇʟ'
              },
              type: 1
            },
            {
              buttonId: 'action',
              buttonText: {
                displayText: 'ini pesan interactiveMeta'
              },
              type: 4,
              nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                  title: 'ᴀʟʟᴍᴇɴᴜ',
                  sections: [{
                      title: `ʟɪsᴛ ʏᴀɴɢ sᴇʀɪɴɢ ᴅɪᴘᴀᴋᴀɪ`,
                      highlight_label: `.ᴘᴏᴘᴜʟᴇʀ`,
                      rows: [{
                        title: "ᴀʟʟ ᴍᴇɴᴜ ʜᴜᴛᴀᴏ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴇᴍᴜᴀ ᴍᴇɴᴜ",
                        id: `.allmenubutton`,
                      }, ]
                    },
                    {
                      title: `ᴍᴇɴᴜ ᴄʜᴀʀᴀᴄᴛᴇʀ.ᴀɪ`,
                      highlight_label: ``,
                      rows: [{
                        title: "ᴄʜᴀʀᴀᴄᴛᴇʀ.ᴀɪ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴄᴀɪ ᴍᴇɴᴜ",
                        id: `.caibutton`,
                      }, ]
                    },
                    {
                      title: `ɴᴇᴡ ᴜᴘᴅᴀᴛᴇ`,
                      highlight_label: `ᴘᴇᴍʙᴀʀᴜᴀɴ ғɪᴛᴜʀ`,
                      rows: [{
                          title: "ɴᴇᴡ ᴜᴘᴅᴀᴛᴇ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ғɪᴛᴜʀ ʙᴀʀᴜ",
                          id: `.newupdatebutton`,
                        },
                        {
                          title: "ғɪᴛᴜʀ ғɪx",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ғɪᴛᴜʀ ʏᴀɴɢ sᴜᴅᴀʜ ᴅɪ ғɪx",
                          id: `.fixbutton`,
                        },
                        {
                          title: "ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘᴀɴᴇʟ ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ",
                          id: `.pterodactylmenuv1`,
                        },
                        {
                          title: "ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ sᴇʀᴠᴇʀ 2",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘᴀɴᴇʟ ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ",
                          id: `.pterodactylmenuv2`,
                        },
                      ]
                    },
                    {
                      title: `ʟɪsᴛ ᴍᴇɴᴜ ʏᴀɴɢ ᴅɪᴘɪsᴀʜᴋᴀɴ`,
                      highlight_label: ``,
                      rows: [{
                          title: "ʙᴀᴄᴀ ᴘᴇʀᴀᴛᴜʀᴀɴ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘᴇʀᴀᴛᴜʀᴀɴ",
                          id: `.bacaperaturanbutton`,
                        },
                        {
                          title: "ᴅᴏɴᴀsɪ",
                          description: "ᴍeɴᴀᴍᴘɪʟᴋᴀɴ ᴍᴇɴᴜ ᴅᴏɴᴀsɪ",
                          id: `.donasibutton`,
                        },
                        {
                          title: "ᴀɪ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴀɪ ᴍᴇɴᴜ",
                          id: `.aimenubutton`,
                        },
                        {
                          title: "ғᴜɴ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ғᴜɴ ᴍᴇɴᴜ",
                          id: `.funmenubutton`,
                        },
                        {
                          title: "ʀᴘɢ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ʀᴘɢ ᴍᴇɴᴜ",
                          id: `.rpgmenubutton`,
                        },
                        {
                          title: "ᴘᴜsʜᴍᴇɴᴜ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘᴜsʜᴍᴇɴᴜ ᴍᴇɴᴜ",
                          id: `.pushmenubutton`,
                        },
                        {
                          title: "ɴғsᴡ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ɴғsᴡ ᴍᴇɴᴜ",
                          id: `nfswmenubutton`,
                        },
                        {
                          title: "ɢᴀᴍᴇ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ɢᴀᴍᴇ ᴍᴇɴᴜ",
                          id: `.gamemenubutton`,
                        },
                        {
                          title: "sᴛᴏʀᴇ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴛᴏʀᴇ ᴍᴇɴᴜ",
                          id: `.storemenubutton`,
                        },
                        {
                          title: "ᴀɴɪᴍᴇ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴀɴɪᴍᴇ ᴍᴇɴᴜ",
                          id: `.animebutton`,
                        },
                        {
                          title: "ᴏᴛʜᴇʀ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴏᴛʜᴇʀ ᴍᴇɴᴜ",
                          id: `.othermenubutton`,
                        },
                        {
                          title: "ᴏᴡɴᴇʀ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴏᴡɴᴇʀ ᴍᴇɴᴜ",
                          id: `.ownermenubutton`,
                        },
                        {
                          title: "ɢʀᴏᴜᴘ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ɢʀᴏᴜᴘ ᴍᴇɴᴜ",
                          id: `.groupmenubutton`,
                        },
                        {
                          title: "ɪsʟᴀᴍɪᴄ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ɪsʟᴀᴍɪᴄ ᴍᴇɴᴜ",
                          id: `.islamimenubutton`,
                        },
                        {
                          title: "ʙᴇʀɪᴛᴀ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ʙᴇʀɪᴛᴀ ᴍᴇɴᴜ",
                          id: `.beritamenubutton`,
                        },
                        {
                          title: "ǫᴜᴏᴛᴇs ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ǫᴜᴏᴛᴇs ᴍᴇɴᴜ",
                          id: `.quotesmenubutton`,
                        },
                        {
                          title: "sᴛɪᴄᴋᴇʀ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴛɪᴄᴋᴇʀ ᴍᴇɴᴜ",
                          id: `.stickermenubutton`,
                        },
                        {
                          title: "sᴛᴀʟᴋᴇʀ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴛᴀʟᴋᴇʀ ᴍᴇɴᴜ",
                          id: `.stalkermenubutton`,
                        },
                        {
                          title: "ᴘʀɪᴍʙᴏɴ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘʀɪᴍᴏɴ ᴍᴇɴᴜ",
                          id: `.primbonmenubutton`,
                        },
                        {
                          title: "sᴇʀᴛɪғɪᴋᴀᴛ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴇʀᴛɪғɪᴋᴀᴛ ᴍᴇɴᴜ",
                          id: `.sertifikatmenubutton`,
                        },
                        {
                          title: "ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ",
                          id: `.downloadmenubutton`,
                        },
                        {
                          title: "ᴇᴘʜᴏᴛᴏ360 ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴇᴘʜᴏᴛᴏ360 ᴍᴇɴᴜ",
                          id: `.ephoto360menubutton`,
                        },
                        {
                          title: "ᴀɴᴏɴʏᴍᴏᴜs ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴀɴᴏɴʏᴍᴏᴜs ᴍᴇɴᴜ",
                          id: ".anonymousmenubutton",
                        },
                        {
                          title: "ʀᴀɴᴅᴏᴍ ᴠɪᴅᴇᴏ ᴍᴇɴᴜ",
                          description: ".ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ʀᴀɴᴅᴏᴍ ᴠɪᴅᴇᴏ ᴍᴇɴᴜ",
                          id: ".randomvideomenubutton",
                        },
                        {
                          title: "ʀᴀɴᴅᴏᴍ ᴘʜᴏᴛᴏ ᴍᴇɴᴜ",
                          description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ʀᴀɴᴅᴏᴍ ᴘʜᴏᴛᴏ ᴍᴇɴᴜ",
                          id: ".randomphotomenubutton",
                        },
                      ]
                    },
                    {
                      title: `ɪɴғᴏʀᴍᴀsɪ ʜᴜᴛᴀᴏ ᴀssɪsᴛᴇɴᴛ`,
                      highlight_label: `ᴅɪɴᴢɪᴅ ᴏғғᴄ`,
                      rows: [{
                          title: "ɪɴғᴏ ʙᴏᴛ",
                          description: "ɪɴғᴏʀᴍᴀsɪ ʙᴏᴛ",
                          id: `.infobot`,
                        },
                        {
                          title: "ᴍᴇɴᴜ sɪᴍᴘʟᴇ",
                          description: "ᴋᴇᴍʙᴀʟɪ ᴋᴇ ᴍᴇɴᴜ sɪᴍᴘᴇʟ",
                          id: `.menu`,
                        },
                      ]
                    },
                  ],
                })
              }
            }
          ],
      headerType: 1,
      image: fs.readFileSync('./media/menuv1.jpg'),
      caption: menu,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        mentionedJid: [m.sender],
        externalAdReply: {
          title: botname,
          body: global.ownername,
          thumbnailUrl: dinzmenu,
          sourceUrl: 'https://whatsapp.com/channel/0029VbAuu0fFHWpvAZAS3d17/107',
          mediaType: 1
        }
      }
    }, { quoted: m });
    
  } else {
    // Tampilkan menu versi no button (default)
    let ownernya = global.ownernumber + '@s.whatsapp.net';
    let me = m.sender;
    let uptime = await runtime(process.uptime());
    let timestampe = speed();
    let latensie = speed() - timestampe;
    
    DinzID_sad = `*ʜᴀʟʟᴏ ${pushname}.*  ɴᴀᴍᴀ ꜱᴀyᴀ ᴀᴅᴀʟᴀʜ *${botname}*, ᴀssɪsᴛᴇɴᴛ ʏᴀɴɢ ʙɪsᴀ ᴍᴇᴍʙᴀɴᴛᴜ ᴋᴀᴍᴜ

ʙᴏᴛ ɪɴɪ ᴅᴀᴘᴀᴛ ᴅɪɢᴜɴᴀᴋᴀɴ ᴜɴᴛᴜᴋ ʙᴇʀʙᴀɢᴀɪ ᴍᴀᴄᴀᴍ, ʙᴏᴛ ɪɴɪ ᴄᴏᴄᴏᴋ ᴜɴᴛᴜᴋ ᴊᴀɢᴀ ɢʀᴜᴘ. ᴋᴀᴍᴜ ʙɪsᴀ ɢᴜɴᴀᴋᴀɴ ʙᴏᴛ ɪɴɪ ᴜɴᴛᴜᴋ ᴜɴᴅᴜʜ ᴍᴇᴅɪᴀ,ᴇᴅᴜᴋᴀsɪ, ʙᴇʟᴀᴊᴀʀ ᴅᴀɴ ʟᴀɪɴɴʏᴀ, ʏᴀɴɢ ᴅᴀᴘᴀᴛ ᴍᴇᴍʙᴜᴀᴛ ʟᴇʙɪʜ ᴍᴜᴅᴀʜ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀʟᴀɴᴋᴀɴ sᴇʜᴀʀɪ ʜᴀʀɪ

✘ ᴄʀᴇᴀᴛᴏʀ: ${global.ig}

ᴊɪᴋᴀ ᴀᴅᴀ ᴍᴀsᴀʟᴀʜ ᴅᴀʟᴀᴍ ᴘᴇɴɢɢᴜɴᴀᴀɴ sɪʟᴀʜᴋᴀɴ ʜᴜʙᴜɴɢɪ ᴄʀᴇᴀᴛᴏʀ ᴜɴᴛᴜᴋ ᴍᴇɴᴀɴʏᴀᴋᴀɴ *.ᴏᴡɴᴇʀ*

┏═━ \`ɪɴғᴏʀᴍᴀsɪ ᴜsᴇʀ\` ━━
║◦ɴᴀᴍᴀ: *${pushname}* 
║◦sᴛᴀᴛᴜs: *${isPrem ? 'ᴘʀᴇᴍɪᴜᴍ ᴜsᴇʀ  ✓⃝' : 'ғʀᴇᴇ ᴜseʀ  𝕏'}*  
║◦ɴᴏᴍᴏʀ : ${m.sender.split("@")[0]}
┗━━━━━━━━━━━━

\`[ 𝗢 𝗪 𝗡 𝗘 𝗥 - 𝗜 𝗡 𝗙 𝗢 ]\`
> 𖥔 ︳ᴄʀᴇᴀᴛᴏʀ : ${global.ownername}
> 𖥔 ︳ᴠᴇʀsɪ : 0.1.0
> 𖥔 ︳ᴛʏᴘᴇ : ᴄᴀsᴇ
> 𖥔 ︳ɪɴsᴛᴀɢʀᴀᴍ : ${global.ig}
> 𖥔 ︳ᴡʜᴀᴛsᴀᴘᴘ ᴏᴡɴᴇʀ : ${global.ownernumber}

\`[ 𝗜 𝗡 𝗙 𝗢 - 𝗕 𝗢 𝗧 ]\`
> ║◦ɴᴀᴍᴀ ʙᴏᴛ: *${global.botname}*  
> ║◦ʀᴜɴᴛɪᴍᴇ: *${runtime(process.uptime())}*
> ║◦ᴘᴇɴɢᴇᴍʙᴀɴɢ: *${global.ownername}* 

╭──── \`ᴍᴇɴᴜ ᴜᴛᴀᴍᴀ\` ────╮  
├ .ʙᴀᴄᴀᴘᴇʀᴀᴛᴜʀᴀɴ
├ .ᴅᴏɴᴀsɪ
├ .ᴀʟʟᴍᴇɴᴜ
├ .ᴀɪᴍᴇɴᴜ
├ .ғᴜɴᴍᴇɴᴜ
├ .ʀᴘɢᴍᴇɴᴜ
├ .ᴘᴜsʜᴍᴇɴᴜ
├ .ɴᴏᴋᴏsᴍᴇɴᴜ
├ .ɴғsᴡᴍᴇɴᴜ
├ .ɢᴀᴍᴇᴍᴇɴᴜ
├ .sᴛᴏʀᴇᴍᴇɴᴜ
├ .ᴀɴɪᴍᴇᴍᴇɴᴜ
├ .ᴏᴛʜᴇʀᴍᴇɴᴜ
├ .ᴏᴡɴᴇʀᴍᴇɴᴜ
├ .ɢʀᴏᴜᴘᴍᴇɴᴜ
├ .ɪsʟᴀᴍɪᴍᴇɴᴜ
├ .ʙᴇʀɪᴛᴀᴍᴇɴᴜ
├ .ᴏ̨ᴜᴏᴛᴇsᴍᴇɴᴜ
├ .sᴛɪᴄᴋᴇʀᴍᴇɴᴜ
├ .sᴛᴀʟᴋᴇʀᴍᴇɴᴜ
├ .ᴘʀɪᴍʙᴏɴᴍᴇɴᴜ
├ .sᴇʀᴛɪғɪᴋᴀᴛᴍᴇɴᴜ
├ .ᴅᴏᴡɴʟᴏᴀᴅᴍᴇɴᴜ
├ .ɴᴇᴡᴜᴘᴅᴀᴛᴇᴍᴇɴᴜ
├ .ᴇᴘʜᴏᴛᴏ360ᴍᴇɴᴜ
├ .ᴀɴᴏɴʏᴍᴏᴜsᴍᴇɴᴜ
├ .ʀᴀɴᴅᴏᴍᴠɪᴅᴇᴏᴍᴇɴᴜ
├ .ʀᴀɴᴅᴏᴍᴘʜᴏᴛᴏᴍᴇɴᴜ
├ .ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟᴍᴇɴᴜ
╰─❒━━━━━━━━━━━❒─╯ 

┏
║◦ ʙᴇʀᴀʟɪʜ ᴋᴇ ᴍᴇɴᴜ ʙᴜᴛᴛᴏɴ : \`.button\` ᴀᴛᴀᴜ
║◦ \`ᴅɪɴᴢᴍᴇɴᴜ\`
║◦ ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴇᴍᴜᴀ ғɪᴛᴜʀ ʙᴏᴛ: \`.ᴀʟʟᴍᴇɴᴜ\`
┗
ʜᴀʀᴀᴘ ᴜɴᴛᴜᴋ ʙᴇʀɢᴀʙᴜɴɢ ɢʀᴏᴜᴘ ʙᴏᴛ ᴀɢᴀʀ ᴍᴇɴɢᴇᴛᴀʜᴜɪ ɪɴғᴏʀᴍᴀsɪ ʙᴏᴛ ᴊɪᴋᴀ *ᴇʀʀᴏʀ/ʙᴀɴɴᴇᴅ*
━─━─━─━─━─━─━─━─━
\`© ᴅɪɴᴢɪᴅ ᴄʜx\``;
    
    DinzBotz.sendMessage(m.chat, {
      video: fs.readFileSync('./media/hutao.mp4'),
      gifPlayback: true,
      caption: DinzID_sad,
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: `${global.ownername}`,
          newsletterJid: `120363403870324179@newsletter`,
        },
        externalAdReply: {
          title: botname,
          body: ownername,
          thumbnailUrl: `${global.thumbnail}`,
          sourceUrl: `https://whatsapp.com/channel/0029Vaa4rPI4yltIJcEJyN1x`,
          mediaType: 1,
          renderLargerThumbnail: true,
          mentionedJid: [m.sender]
        }
      }
    }, { quoted: m });
  }
  
  // Kirim audio menu
  let muskk = {
    audio: fs.readFileSync('./media/audio/menu.mp3'),
    mimetype: 'audio/mp4',  
    ptt: true
  };
  await DinzBotz.sendMessage(m.chat, muskk, { quoted: m });
  
  break;
}
  
  case 'dinzmenu':
    case 'menuv1':
    case 'menu-v1': {

      let menu = `Hai Kak ${pushname}👋,

ᴍᴇɴᴜ ᴠ1 ɪɴɪ ᴍᴇɴᴜ ʙᴜᴛᴛᴏɴ 
ʏᴀɴɢ ᴅɪsɪᴍᴘᴇʟᴋᴀɴ 
ᴀɢᴀʀ ᴍᴇᴍᴜᴅᴀʜᴋᴀɴ
ᴜsᴇʀ sᴀᴀᴛ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ
ғɪᴛᴜʀ ғɪᴛᴜʀ ʙᴏᴛ

ʜᴜᴛᴀᴏ - ᴍᴅ ᴠ1 ʏᴀɴɢ sɪᴀᴘ
ᴍᴇɴᴇᴍᴀɴɪ ᴀɴᴅᴀ ᴋᴀᴘᴀɴᴘᴜɴ ɪᴛᴜ
ᴊɪᴋᴀ ᴋᴀᴍᴜ ʙᴜᴛᴜʜ ʙᴀɴᴛᴜᴀɴ
ᴀᴋᴜ sɪᴀᴘ ᴍᴇᴍʙᴀɴᴛᴜ 

> ᴄʟɪᴄᴋ ᴀʟʟᴍᴇɴᴜ ᴜɴᴛᴜᴋ ᴍᴇʟɪʜᴀᴛ sᴇᴍᴜᴀ ᴍᴇɴᴜ\n`
      DinzBotz.sendMessage(m.chat, {
        footer: '© DinzID VyL - 2025',
        buttons: [{
            buttonId: `.owner`,
            buttonText: {
              displayText: 'ᴏᴡɴᴇʀ'
            },
            type: 1
          },
          {
            buttonId: `.menu`,
            buttonText: {
              displayText: 'ᴍᴇɴᴜ sɪᴍᴘᴇʟ'
            },
            type: 1
          },
          {
            buttonId: 'action',
            buttonText: {
              displayText: 'ini pesan interactiveMeta'
            },
            type: 4,
            nativeFlowInfo: {
              name: 'single_select',
              paramsJson: JSON.stringify({
                title: 'ᴀʟʟᴍᴇɴᴜ',
                sections: [{
                    title: `ʟɪsᴛ ʏᴀɴɢ sᴇʀɪɴɢ ᴅɪᴘᴀᴋᴀɪ`,
                    highlight_label: `.ᴘᴏᴘᴜʟᴇʀ`,
                    rows: [{
                      title: "ᴀʟʟ ᴍᴇɴᴜ ʜᴜᴛᴀᴏ",
                      description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴇᴍᴜᴀ ᴍᴇɴᴜ",
                      id: `.allmenubutton`,
                    }, ]
                  },
                  {
                    title: `ᴍᴇɴᴜ ᴄʜᴀʀᴀᴄᴛᴇʀ.ᴀɪ`,
                    highlight_label: ``,
                    rows: [{
                      title: "ᴄʜᴀʀᴀᴄᴛᴇʀ.ᴀɪ ᴍᴇɴᴜ",
                      description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴄᴀɪ ᴍᴇɴᴜ",
                      id: `.caibutton`,
                    }, ]
                  },
                  {
                    title: `ɴᴇᴡ ᴜᴘᴅᴀᴛᴇ`,
                    highlight_label: `ᴘᴇᴍʙᴀʀᴜᴀɴ ғɪᴛᴜʀ`,
                    rows: [{
                        title: "ɴᴇᴡ ᴜᴘᴅᴀᴛᴇ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ғɪᴛᴜʀ ʙᴀʀᴜ",
                        id: `.newupdatebutton`,
                      },
                      {
                        title: "ғɪᴛᴜʀ ғɪx",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ғɪᴛᴜʀ ʏᴀɴɢ sᴜᴅᴀʜ ᴅɪ ғɪx",
                        id: `.fixbutton`,
                      },
                      {
                        title: "ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘᴀɴᴇʟ ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ",
                        id: `.pterodactylmenuv1`,
                      },
                      {
                        title: "ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ sᴇʀᴠᴇʀ 2",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘᴀɴᴇʟ ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ",
                        id: `.pterodactylmenuv2`,
                      },
                    ]
                  },
                  {
                    title: `ʟɪsᴛ ᴍᴇɴᴜ ʏᴀɴɢ ᴅɪᴘɪsᴀʜᴋᴀɴ`,
                    highlight_label: ``,
                    rows: [{
                        title: "ʙᴀᴄᴀ ᴘᴇʀᴀᴛᴜʀᴀɴ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘᴇʀᴀᴛᴜʀᴀɴ",
                        id: `.bacaperaturanbutton`,
                      },
                      {
                        title: "ᴅᴏɴᴀsɪ",
                        description: "ᴍeɴᴀᴍᴘɪʟᴋᴀɴ ᴍᴇɴᴜ ᴅᴏɴᴀsɪ",
                        id: `.donasibutton`,
                      },
                      {
                        title: "ᴀɪ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴀɪ ᴍᴇɴᴜ",
                        id: `.aimenubutton`,
                      },
                      {
                        title: "ғᴜɴ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ғᴜɴ ᴍᴇɴᴜ",
                        id: `.funmenubutton`,
                      },
                      {
                        title: "ʀᴘɢ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ʀᴘɢ ᴍᴇɴᴜ",
                        id: `.rpgmenubutton`,
                      },
                      {
                        title: "ᴘᴜsʜᴍᴇɴᴜ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘᴜsʜᴍᴇɴᴜ ᴍᴇɴᴜ",
                        id: `.pushmenubutton`,
                      },
                      {
                        title: "ɴғsᴡ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ɴғsᴡ ᴍᴇɴᴜ",
                        id: `nfswmenubutton`,
                      },
                      {
                        title: "ɢᴀᴍᴇ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ɢᴀᴍᴇ ᴍᴇɴᴜ",
                        id: `.gamemenubutton`,
                      },
                      {
                        title: "sᴛᴏʀᴇ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴛᴏʀᴇ ᴍᴇɴᴜ",
                        id: `.storemenubutton`,
                      },
                      {
                        title: "ᴀɴɪᴍᴇ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴀɴɪᴍᴇ ᴍᴇɴᴜ",
                        id: `.animebutton`,
                      },
                      {
                        title: "ᴏᴛʜᴇʀ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴏᴛʜᴇʀ ᴍᴇɴᴜ",
                        id: `.othermenubutton`,
                      },
                      {
                        title: "ᴏᴡɴᴇʀ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴏᴡɴᴇʀ ᴍᴇɴᴜ",
                        id: `.ownermenubutton`,
                      },
                      {
                        title: "ɢʀᴏᴜᴘ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ɢʀᴏᴜᴘ ᴍᴇɴᴜ",
                        id: `.groupmenubutton`,
                      },
                      {
                        title: "ɪsʟᴀᴍɪᴄ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ɪsʟᴀᴍɪᴄ ᴍᴇɴᴜ",
                        id: `.islamimenubutton`,
                      },
                      {
                        title: "ʙᴇʀɪᴛᴀ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ʙᴇʀɪᴛᴀ ᴍᴇɴᴜ",
                        id: `.beritamenubutton`,
                      },
                      {
                        title: "ǫᴜᴏᴛᴇs ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ǫᴜᴏᴛᴇs ᴍᴇɴᴜ",
                        id: `.quotesmenubutton`,
                      },
                      {
                        title: "sᴛɪᴄᴋᴇʀ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴛɪᴄᴋᴇʀ ᴍᴇɴᴜ",
                        id: `.stickermenubutton`,
                      },
                      {
                        title: "sᴛᴀʟᴋᴇʀ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴛᴀʟᴋᴇʀ ᴍᴇɴᴜ",
                        id: `.stalkermenubutton`,
                      },
                      {
                        title: "ᴘʀɪᴍʙᴏɴ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴘʀɪᴍᴏɴ ᴍᴇɴᴜ",
                        id: `.primbonmenubutton`,
                      },
                      {
                        title: "sᴇʀᴛɪғɪᴋᴀᴛ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ sᴇʀᴛɪғɪᴋᴀᴛ ᴍᴇɴᴜ",
                        id: `.sertifikatmenubutton`,
                      },
                      {
                        title: "ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ",
                        id: `.downloadmenubutton`,
                      },
                      {
                        title: "ᴇᴘʜᴏᴛᴏ360 ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴇᴘʜᴏᴛᴏ360 ᴍᴇɴᴜ",
                        id: `.ephoto360menubutton`,
                      },
                      {
                        title: "ᴀɴᴏɴʏᴍᴏᴜs ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴀɴᴏɴʏᴍᴏᴜs ᴍᴇɴᴜ",
                        id: ".anonymousmenubutton",
                      },
                      {
                        title: "ʀᴀɴᴅᴏᴍ ᴠɪᴅᴇᴏ ᴍᴇɴᴜ",
                        description: ".ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ʀᴀɴᴅᴏᴍ ᴠɪᴅᴇᴏ ᴍᴇɴᴜ",
                        id: ".randomvideomenubutton",
                      },
                      {
                        title: "ʀᴀɴᴅᴏᴍ ᴘʜᴏᴛᴏ ᴍᴇɴᴜ",
                        description: "ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ʀᴀɴᴅᴏᴍ ᴘʜᴏᴛᴏ ᴍᴇɴᴜ",
                        id: ".randomphotomenubutton",
                      },
                    ]
                  },
                  {
                    title: `ɪɴғᴏʀᴍᴀsɪ ʜᴜᴛᴀᴏ ᴀssɪsᴛᴇɴᴛ`,
                    highlight_label: `ᴅɪɴᴢɪᴅ ᴏғғᴄ`,
                    rows: [{
                        title: "ɪɴғᴏ ʙᴏᴛ",
                        description: "ɪɴғᴏʀᴍᴀsɪ ʙᴏᴛ",
                        id: `.infobot`,
                      },
                      {
                        title: "ᴍᴇɴᴜ sɪᴍᴘʟᴇ",
                        description: "ᴋᴇᴍʙᴀʟɪ ᴋᴇ ᴍᴇɴᴜ sɪᴍᴘᴇʟ",
                        id: `.menu`,
                      },
                    ]
                  },
                ],
              })
            }
          }
        ],
        headerType: 1,
        viewOnce: true,
        image: fs.readFileSync('./media/menuv1.jpg'),
        gifPlayback: true,
        caption: menu,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
            newsletterName: `DinzID`,
            newsletterJid: `6556}`,
          },
          externalAdReply: {
            title: botname,
            body: ownername,
            thumbnailUrl: dinzmenu,
            sourceUrl: 'https://whatsapp.com/channel/0029VbAuu0fFHWpvAZAS3d17/107',
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      }, {
        quoted: m
      })
      await sleep(2500)
      DinzBotz.sendMessage(m.chat, {
        audio: fs.readFileSync('./media/audio/menu.mp3'),
        mimetype: 'audio/mp4',
        ptt: true
      }, {
        quoted: m
      })
    }
    db.users[m.sender].exp += 300;
    break
case 'setprefix': {
    if (!isOwner) return m.reply('Khusus Owner!');
    if (!text) return m.reply(`*Cara Pakai:*\n\n1. ${prefix}setprefix multi\n(Bisa pakai banyak simbol . # / dll)\n\n2. ${prefix}setprefix noprefix\n(Tanpa simbol, langsung ketik perintah)\n\n3. ${prefix}setprefix #\n(Hanya bisa pakai simbol #)`);

    let pfxConf = JSON.parse(fs.readFileSync('./database/prefix.json'));
    if (args[0] === 'multi') {
        pfxConf.mode = 'multi';
        m.reply('✅ Berhasil ubah ke mode *Multi Prefix*');
    } else if (args[0] === 'noprefix') {
        pfxConf.mode = 'noprefix';
        m.reply('✅ Berhasil ubah ke mode *No Prefix* (Tanpa Simbol)');
    } else {
        pfxConf.mode = 'single';
        pfxConf.symbol = args[0]; // Ambil simbol yang diketik user
        m.reply(`✅ Berhasil ubah ke mode *Single Prefix*. Simbol: ${args[0]}`);
    }
    fs.writeFileSync('./database/prefix.json', JSON.stringify(pfxConf, null, 2));
}
break
case "bck": case "backup": {
    const sender = m.sender.split("@")[0];
    const isCreator = global.owner.includes(sender);
    
    if (!isCreator && m.sender !== botNumber) {
        return m.reply(mess.owner);
    }

    try {        
        m.reply("Processing Backup Script . .");
        const tmpDir = "./data/trash";
        if (fs.existsSync(tmpDir)) {
            try { 
                const files = fs.readdirSync(tmpDir).filter(f => !f.endsWith(".js"));
                for (let file of files) fs.unlinkSync(`${tmpDir}/${file}`);
            } catch {}
        }

        const dateDisplay = typeof global.tanggal === 'function' ? global.tanggal(Date.now()) : new Date().toDateString();
        const safeDate = dateDisplay.replace(/[^a-zA-Z0-9]/g, '_');
        const name = `${global.botname} - ${safeDate}`; 

        const exclude = ["node_modules", "Auth", "session", "package-lock.json", "yarn.lock", ".npm", ".cache", ".git", ".gitignore", "setbot.json"];
        const filesToZip = fs.readdirSync(process.cwd())
            .filter(f => !exclude.includes(f) && f !== "" && !f.endsWith(".zip"));

        if (!filesToZip.length) return m.reply("Tidak ada file yang dapat di-backup.");

        execSync(`zip -r "${name}.zip" ${filesToZip.join(" ")}`);

        const zipPath = `./${name}.zip`;
        const zipBuffer = fs.readFileSync(zipPath);

        await DinzBotz.sendMessage(m.sender, {
            document: zipBuffer,
            fileName: `${name}.zip`,
            caption: `*SUCCESS BACKUP SCRIPT*\n\n` +
                     `- 📅 Tanggal: ${dateDisplay}\n` + 
                     `*💬 File aman tersimpan.*`, 
            mimetype: "application/zip"
        }, { quoted: m });

        if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
        if (m.isGroup) m.reply("Script bot berhasil dikirim ke private chat.");

    } catch (err) {
        console.error("Backup Error:", err);
        m.reply(`❌ Gagal Backup:\n${err.message}`);
    }
}
break;
case 'iqc': {
    if (!text) return reply(`Masukan pesan!\nContoh: ${prefix + command} Halo sayang`)

   DinzBotz.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    try {
        const time = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false })
        const battery = Math.floor(Math.random() * (100 - 20 + 1)) + 20
        
        const apiUrl = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(time)}&batteryPercentage=${battery}&carrierName=Indosat&messageText=${encodeURIComponent(text)}&emojiStyle=apple`

        const { data } = await axios.get(apiUrl, { responseType: 'arraybuffer' })

        await DinzBotz.sendMessage(m.chat, { 
            image: Buffer.from(data), 
            caption: 'Done' 
        }, { quoted: m })

       DinzBotz.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (error) {
        console.log(error)
        reply('Terjadi kesalahan saat membuat gambar.')
        DinzBotz.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }
}
break
case 'tourl': {
    if (!mime) return reply(`Kirim/Reply Video/Gambar Dengan Caption ${prefix + command}`)
    
    DinzBotz.sendMessage(m.chat, { react: { text: "⏳️", key: m.key } })

    try {
        let media = await DinzBotz.downloadAndSaveMediaMessage(quoted)
        
        const FormData = require('form-data')
        const form = new FormData()
        form.append('file', fs.createReadStream(media))

        const { data } = await axios.post('https://dinzapi-sweager.vercel.app/api/cdn/dinzid', form, {
            headers: {
                ...form.getHeaders()
            }
        })

        if (!data.status || !data.data || !data.data.url) throw new Error('Format respon API tidak sesuai')

        let responseUrl = data.data.url
        let fileSize = (fs.statSync(media).size / 1024).toFixed(2)
        let uploader = `${pushname}`
        let caption = `> ᴜᴋᴜʀᴀɴ ғɪʟᴇ : ${fileSize} ᴋʙ\n> ᴘᴇɴɢᴜɴɢɢᴀʜ : ${uploader}`.trim()

        if (/image|video/.test(mime)) {
            let msg = generateWAMessageFromContent(
                m.chat, {
                    viewOnceMessage: {
                        message: {
                            interactiveMessage: {
                                body: {
                                    text: `*sᴜᴅᴀʜ sᴇʟᴇsᴀɪ ${pushname} sɪʟᴀʜᴋᴀɴ ᴅɪᴄᴏᴘᴘʏ ʟɪɴᴋɴʏᴀ*`
                                },
                                carouselMessage: {
                                    cards: [{
                                        header: proto.Message.InteractiveMessage.Header.create({
                                            ...(await prepareWAMessageMedia({
                                                image: {
                                                    url: './media/hutaodinz.jpg'
                                                }
                                            }, {
                                                upload: DinzBotz.waUploadToServer
                                            })),
                                            title: '',
                                            gifPlayback: true,
                                            subtitle: global.ownername,
                                            hasMediaAttachment: false
                                        }),
                                        body: {
                                            text: caption
                                        },
                                        nativeFlowMessage: {
                                            buttons: [{
                                                "name": "cta_copy",
                                                "buttonParamsJson": `{\"display_text\":\"Click to get link\",\"id\":\"123456789\",\"copy_code\":\"${responseUrl}\"}`
                                            }, {
                                                "name": "cta_url",
                                                "buttonParamsJson": `{\"display_text\":\"Open Link\",\"url\":\"${responseUrl}\",\"merchant_url\":\"${responseUrl}\"}`
                                            }],
                                        },
                                    }, ],
                                    messageVersion: 1,
                                },
                            },
                        },
                    },
                }, {
                    quoted: m
                }
            )

            await DinzBotz.relayMessage(msg.key.remoteJid, msg.message, {
                messageId: msg.key.id,
            })

        } else {
            reply(`Link File: ${responseUrl}`)
        }

        await fs.unlinkSync(media)

    } catch (err) {
        console.log(err)
        reply("Ups, terjadi kesalahan saat mengunggah media.")
    }
}
break
case 'ht':
case 'h':
case 'hidetag': {
    if (!isGroup) return reply('Fitur ini hanya untuk grup!')
    if (!isAdmin) return reply('Fitur ini khusus admin grup!')

    const members = await groupMetadata.participants.map(u => u.id)
    const isQuoted = m.quoted ? true : false
    const mime = (isQuoted ? m.quoted.mimetype : m.mimetype) || ''
    const q = args.join(" ")

    if (/image|video/.test(mime)) {
        let media = isQuoted ? await m.quoted.download() : await m.download()
        let captionText = q ? q : (isQuoted ? m.quoted.text : '')

        await DinzBotz.sendMessage(m.chat, {
            [mime.split('/')[0]]: media,
            caption: captionText,
            mentions: members
        }, { quoted: m })

    } else if (isQuoted && m.quoted.text) {
        await DinzBotz.sendMessage(m.chat, {
            text: m.quoted.text,
            mentions: members
        }, { quoted: m })

    } else {
        let textToSend = q ? q : ''
        
        await DinzBotz.sendMessage(m.chat, {
            text: textToSend,
            mentions: members
        }, { quoted: m })
    }
    break
}
    case 'install':
case 'npm': {
    if (!isOwner) return reply('Fitur ini khusus Owner!')
    if (!text) return reply(`Mau install module apa?\nContoh: ${prefix + command} axios`)
    reply(`⏳ Sedang menginstall module *${text}*...\nMohon tunggu, bot akan restart otomatis jika berhasil.`)
    require('child_process').exec(`npm install ${text}`, (err, stdout, stderr) => {
        if (err) {
           
            return reply(`❌ Gagal menginstall module: ${err.message}`)
        }
        DinzBotz.sendMessage(m.chat, { 
            text: `✅ Sukses install *${text}*!\n\n📝 Output:\n${stdout}\n\n♻️ Bot sedang merestart sistem...` 
        }, { quoted: m }).then(() => {
            setTimeout(() => {
                process.exit()
            }, 3000)
        })
    })
}
break
case 'ytmp3':
case 'yta': {
  if (!args[0]) return reply(`Contoh: ${prefix + command} https://youtu.be/HWjCStB6k4o 128`)

  let url = args[0]
  let quality = args[1] || '128'

  DinzBotz.sendMessage(m.chat, {
    react: {
      text: "⏳",
      key: m.key
    }
  })

  try {
    const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/audio?url=${url}&quality=${quality}`
    const response = await fetch(apiUrl)
    const json = await response.json()

    if (!json.status || !json.result) {
      return reply('Gagal mengambil data audio.')
    }

    const meta = json.result.metadata
    const dl = json.result.download

    await DinzBotz.sendMessage(m.chat, {
      audio: {
        url: dl.url
      },
      mimetype: 'audio/mpeg',
      fileName: dl.filename,
      contextInfo: {
        externalAdReply: {
          title: meta.title,
          body: meta.author.name,
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: meta.thumbnail,
          sourceUrl: meta.url
        }
      }
    }, {
      quoted: m
    })

    DinzBotz.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key
      }
    })

  } catch (error) {
    console.error(error)
    reply('Terjadi kesalahan saat mengunduh.')
  }
}
break
case 'ytmp4':
case 'ytv': {
  if (!args[0]) return reply(`Contoh: ${prefix + command} https://youtu.be/HWjCStB6k4o 480`)

  let url = args[0]
  let quality = args[1] || '360'

  DinzBotz.sendMessage(m.chat, {
    react: {
      text: "⏳",
      key: m.key
    }
  })

  try {
    const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/video?url=${url}&quality=${quality}`
    const response = await fetch(apiUrl)
    const json = await response.json()

    if (!json.status || !json.result) {
      return reply('Gagal mengambil data video.')
    }

    const meta = json.result.metadata
    const dl = json.result.download

    const caption = `╭───┈ *YOUTUBE VIDEO* ┈───
│ 🎬 *Judul:* ${meta.title}
│ ⏱️ *Durasi:* ${meta.duration.timestamp}
│ 👁️ *Views:* ${meta.views}
│ 📅 *Upload:* ${meta.ago}
│ 💿 *Kualitas:* ${dl.quality}
╰──────────────────────

_Sedang mengirim video..._`

    await DinzBotz.sendMessage(m.chat, {
      video: {
        url: dl.url
      },
      caption: caption,
      mimetype: 'video/mp4',
      fileName: dl.filename
    }, {
      quoted: m
    })

    DinzBotz.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key
      }
    })

  } catch (error) {
    console.error(error)
    reply('Terjadi kesalahan saat mengunduh.')
  }
}
break
case 'play': {
    if (!text) return reply(`Ketik judul lagu.\nContoh: ${prefix + command} 505`);

    await DinzBotz.sendMessage(m.chat, { react: { text: "🎧", key: m.key } });

    const makeCaption = (title, artist, duration, url, source) => {
        return `╭───┈ *ᴍᴜsɪᴄ ᴘʟᴀʏᴇʀ* ┈───\n` +
               `│ 💿 *Title:* ${title}\n` +
               `│ 🎙️ *Artist:* ${artist}\n` +
               `│ ⏱️ *Duration:* ${duration}\n` +
               `│ 🔗 *Link:* ${url}\n` +
               `│ 📡 *Server:* ${source}\n` +
               `╰─────────────────────`;
    };

    try {
        /* -------------------------------------------
           PRIORITAS 1: NEKOLABS SPOTIFY
           ------------------------------------------- */
        let spotifyUrl = `https://api.nekolabs.web.id/downloader/spotify/play/v1?q=${encodeURIComponent(text)}`;
        let dataSpot = await (await fetch(spotifyUrl)).json();

        if (dataSpot.success && dataSpot.result) {
            let { title, artist, duration, cover, url } = dataSpot.result.metadata;
            let dlUrl = dataSpot.result.downloadUrl;

            await DinzBotz.sendMessage(m.chat, {
                audio: { url: dlUrl },
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: artist,
                        thumbnailUrl: cover,
                        sourceUrl: url,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                },
                caption: makeCaption(title, artist, duration, url, "Neko Spotify")
            }, { quoted: m });

        } else {
            throw new Error('Spotify Not Found');
        }

    } catch (errSpot) {
        try {
            /* -------------------------------------------
               PRIORITAS 2: NEKOLABS YOUTUBE (FALLBACK 1)
               ------------------------------------------- */
            let ytNekoUrl = `https://api.nekolabs.web.id/downloader/youtube/play/v1?q=${encodeURIComponent(text)}`;
            let dataYt = await (await fetch(ytNekoUrl)).json();

            if (dataYt.success && dataYt.result) {
                let { title, channel, duration, cover, url } = dataYt.result.metadata;
                let dlUrl = dataYt.result.downloadUrl;

                await DinzBotz.sendMessage(m.chat, {
                    audio: { url: dlUrl },
                    mimetype: 'audio/mpeg',
                    fileName: `${title}.mp3`,
                    contextInfo: {
                        externalAdReply: {
                            title: title,
                            body: channel,
                            thumbnailUrl: cover,
                            sourceUrl: url,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    },
                    caption: makeCaption(title, channel, duration, url, "Neko YouTube")
                }, { quoted: m });

            } else {
                throw new Error('Neko Youtube Not Found');
            }

        } catch (errYt) {
            try {
                /* -------------------------------------------
                   PRIORITAS 3: DINZAPI YOUTUBE (FALLBACK 2)
                   ------------------------------------------- */
                let dinzUrl = `https://dinzapi-sweager.vercel.app/api/downloader/ytaudio?query=${encodeURIComponent(text)}&direct=false`;
                let dataDinz = await (await fetch(dinzUrl)).json();

                if (dataDinz.status && dataDinz.data) {
                    let meta = dataDinz.data.metadata;
                    let audio = dataDinz.data.audio;

                    await DinzBotz.sendMessage(m.chat, {
                        audio: { url: audio.url },
                        mimetype: 'audio/mpeg',
                        fileName: audio.filename,
                        contextInfo: {
                            externalAdReply: {
                                title: meta.title,
                                body: meta.artist,
                                thumbnailUrl: meta.thumbnail,
                                sourceUrl: meta.youtubeUrl,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        },
                        caption: makeCaption(meta.title, meta.artist, meta.duration, meta.youtubeUrl, "DinzApi")
                    }, { quoted: m });

                } else {
                    reply(`❌ Lagu tidak ditemukan di semua server.`);
                }
            } catch (errFinal) {
                console.error(errFinal);
                reply(`❌ Terjadi kesalahan sistem.`);
            }
        }
    }
}
break;
case 'addprem':
case 'addpremium': {
    if (!DinzTheCreator) return reply('Khusus Owner')

    // 1. Ambil Raw Target (Bisa berupa JID atau LID)
    let rawTarget
    if (m.mentionedJid && m.mentionedJid[0]) rawTarget = m.mentionedJid[0]
    else if (m.quoted) rawTarget = m.quoted.sender
    else if (text) {
        let clean = text.replace(/[^0-9]/g, '')
        if (!clean) return reply(`Masukan nomor valid!\nContoh: ${prefix + command} 628xxx`)
        rawTarget = clean + '@s.whatsapp.net'
    } else {
        return reply(`Tag/Reply/Ketik Nomor!\nContoh: ${prefix + command} 628xxx`)
    }

    // 2. LOGIKA SMART SWAP (JID vs LID)
    let finalJid = rawTarget
    let finalLid = '-'

    // Cek apakah target adalah LID (biasanya diakhiri @lid)
    if (rawTarget.endsWith('@lid')) {
        finalLid = rawTarget
        finalJid = '-' // Default kalau JID gak ketemu
        
        // Usaha cari JID aslinya di Store contacts
        if (global.store) {
            const contacts = global.store.contacts
            for (let id in contacts) {
                if (contacts[id].lid === finalLid) {
                    finalJid = id // KETEMU! Ini nomor aslinya
                    break
                }
            }
        }
    } 
    // Jika target adalah JID (Nomor HP biasa @s.whatsapp.net)
    else if (rawTarget.endsWith('@s.whatsapp.net')) {
        finalJid = rawTarget
        
        // Cari LID pasangannya di Store
        if (global.store && global.store.contacts[finalJid]) {
            finalLid = global.store.contacts[finalJid].lid || '-'
        }
    }

    // Proteksi: Jika JID masih strip '-' (berarti cuma dapet LID doang & ga ketemu nomor HP)
    // Kita terpaksa pakai LID sebagai ID utama agar tetap premium, tapi kasih peringatan di console
    if (finalJid === '-') {
        finalJid = finalLid
    }

    // 3. Cek Database (Cegah Duplikat)
    if (premium.some(u => u.id === finalJid)) return reply('User tersebut SUDAH Premium.')

    // 4. Simpan dengan URUTAN BENAR (ID = JID, LID = LID)
    premium.push({
        id: finalJid, // Ini pasti Nomor HP (kecuali darurat)
        lid: finalLid // Ini pasti LID
    })
    
    fs.writeFileSync('./database/premium.json', JSON.stringify(premium, null, 2))
    
    reply(`✅ *SUKSES ADD PREMIUM*\n\n👤 ID: @${finalJid.split('@')[0]}\n🆔 LID: ${finalLid === '-' ? 'Tidak Terdeteksi' : finalLid}`)
}
break
case 'delprem':
case 'delpremium': {
    if (!DinzTheCreator) return reply('Khusus Owner')

    let rawTarget
    if (m.mentionedJid && m.mentionedJid[0]) rawTarget = m.mentionedJid[0]
    else if (m.quoted) rawTarget = m.quoted.sender
    else if (text) rawTarget = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    else return reply(`Tag/Reply/Ketik Nomor yang mau dihapus!`)

    // Cari index, cocokin ID atau LID nya (jadi hapus pake LID pun bisa)
    let index = premium.findIndex(u => u.id === rawTarget || u.lid === rawTarget)
    
    if (index === -1) return reply('User tersebut TIDAK ADA di database Premium.')

    let deletedUser = premium[index] // Simpan data user yg dihapus buat laporan
    premium.splice(index, 1)
    fs.writeFileSync('./database/premium.json', JSON.stringify(premium, null, 2))
    
    reply(`🗑️ Sukses menghapus @${deletedUser.id.split('@')[0]} dari Premium.`)
}
break
case 'listprem':
case 'listpremium': {
    if (premium.length < 1) return reply('Belum ada user premium.')
    
    let txt = `*LIST USER PREMIUM*\nTotal: ${premium.length} User\n\n`
    premium.forEach((u, i) => {
        txt += `${i + 1}. @${u.id.split('@')[0]}\n`
    })
    
    reply(txt)
}
break
case 'addcase': {
    if (!isOwner) return m.reply(mess.owner)
    if (!text) return m.reply(`*PERMINTAAN ERROR!! CONTOH :*\n> .addcase case 'test': {\n> m.reply('hello world')\n> }\n> break`)

    const fileName = 'message/msg.js';
    const newCase = `${text}`;

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('*ERROR SAAT MEMBACA FILE*', err);
            return;
        }

        const posisiAwal = data.indexOf("case ['addcase']:");
        if (posisiAwal !== -1) {
            const kodeBaru = data.slice(0, posisiAwal) + '\n' + newCase + '\n' + data.slice(posisiAwal);

            fs.writeFile(fileName, kodeBaru, 'utf8', (err) => {
                if (err) {
                    m.reply('*TERJADI KESALAHAN SAAT MENULIS CASE* :', err);
                } else {
                    m.reply('*CASE SUKSES DITAMBAHKAN*');
                }
            });

        } else {
            m.reply('*CASE ADDCASE TIDAK DITEMUKAN');
        }
    });
}
break;
case 's':
case 'sticker':
case 'stiker': {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image|video/.test(mime)) {
        if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 15) return reply('Maksimal durasi video 15 detik')
        }
        DinzBotz.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

        try {
            let media = await DinzBotz.downloadAndSaveMediaMessage(q)
             const Jimp = require('jimp')
            if (/image/.test(mime)) {
                try {
                    let image = await Jimp.read(media)
                    await image.cover(512, 512)
                    await image.writeAsync(media)
                } catch (e) {
                    console.log('Modul Jimp tidak terinstall, skip cropping.')
                }
            }

            await DinzBotz.sendImageAsSticker(m.chat, media, m, {
                packname: global.packname || 'Sticker',
                author: global.author || 'DinzBotz'
            })

            await fs.unlinkSync(media)

        } catch (err) {
            console.log(err)
            reply('Gagal membuat sticker.')
            if (typeof media !== 'undefined' && fs.existsSync(media)) fs.unlinkSync(media)
        }

    } else {
        reply(`Kirim gambar/video dengan caption ${prefix + command}\nAtau reply gambar/video yang sudah ada.`)
    }
}
break

break
case "brat": {

      if (!text) return m.reply('❌ Masukkan teks untuk membuat stiker.');
      DinzBotz.sendMessage(m.chat, {
        react: {
          text: "⏱️",
          key: m.key,
        }
      })
      try {
        const url = `https://api.hanggts.xyz/imagecreator/brat?text=${encodeURIComponent(text)}`;
        const response = await axios.get(url, {
          responseType: "arraybuffer"
        });

        const {
          Sticker
        } = require('wa-sticker-formatter');
        const sticker = new Sticker(response.data, {
          pack: 'dinzid',
          author: 'yt',
          type: "image",
        });

        const stikerBuffer = await sticker.toBuffer();
        DinzBotz.sendMessage(m.chat, {
          sticker: stikerBuffer
        }, {
          quoted: m
        });

      } catch (err) {
        console.error("❌ Error:", err);
        m.reply("Terjadi kesalahan saat membuat stiker.");
      }
    }
    break
    case "ping": case "os": {
    try {
        const THEME = {
            bg: "#0f1419", bgSecondary: "#1a1f2e", card: "#1e2433", cardHover: "#252b3d",
            primary: "#3b82f6", success: "#10b981", warning: "#f59e0b", danger: "#ef4444",
            purple: "#8b5cf6", cyan: "#06b6d4", pink: "#ec4899", textPrimary: "#f1f5f9",
            textSecondary: "#94a3b8", textTertiary: "#64748b", border: "#2d3548", glow: "rgba(59, 130, 246, 0.2)"
        };

        const formatSize = (bytes) => {
            if (bytes === 0) return '0 B';
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
        };

        const formatTime = (seconds) => {
            seconds = Number(seconds);
            const d = Math.floor(seconds / (3600 * 24));
            const h = Math.floor(seconds % (3600 * 24) / 3600);
            const m = Math.floor(seconds % 3600 / 60);
            const s = Math.floor(seconds % 60);
            if (d > 0) return `${d}d ${h}h ${m}m`;
            if (h > 0) return `${h}h ${m}m`;
            return `${m}m ${s}s`;
        };

        function drawBackground(ctx, w, h) {
            const gradient = ctx.createLinearGradient(0, 0, w, h);
            gradient.addColorStop(0, THEME.bg);
            gradient.addColorStop(0.5, THEME.bgSecondary);
            gradient.addColorStop(1, THEME.bg);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);
            ctx.globalAlpha = 0.02;
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                const size = Math.random() * 2;
                ctx.fillStyle = THEME.textPrimary;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.strokeStyle = THEME.border;
            ctx.lineWidth = 1;
            for (let i = 0; i < w; i += 50) {
                ctx.globalAlpha = 0.03;
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
            }
            for (let i = 0; i < h; i += 50) {
                ctx.globalAlpha = 0.03;
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
            }
            ctx.globalAlpha = 1;
        }

        function drawCard(ctx, x, y, w, h, radius) {
            ctx.save();
            ctx.shadowColor = THEME.glow;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, radius);
            ctx.fillStyle = THEME.card;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = THEME.border;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }

        function drawIcon(ctx, x, y, type, color) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            switch (type) {
                case 'cpu':
                    ctx.strokeRect(x - 12, y - 12, 24, 24);
                    ctx.fillRect(x - 6, y - 6, 12, 12);
                    ctx.beginPath();
                    ctx.moveTo(x - 12, y - 8); ctx.lineTo(x - 16, y - 8);
                    ctx.moveTo(x - 12, y); ctx.lineTo(x - 16, y);
                    ctx.moveTo(x - 12, y + 8); ctx.lineTo(x - 16, y + 8);
                    ctx.moveTo(x + 12, y - 8); ctx.lineTo(x + 16, y - 8);
                    ctx.moveTo(x + 12, y); ctx.lineTo(x + 16, y);
                    ctx.moveTo(x + 12, y + 8); ctx.lineTo(x + 16, y + 8);
                    ctx.stroke();
                    break;
                case 'memory':
                    for (let i = 0; i < 4; i++) { ctx.strokeRect(x - 10 + i * 6, y - 12, 5, 24); }
                    break;
                case 'disk':
                    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
                    break;
                case 'network':
                    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8);
                    ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x - 6, y - 6, 2, 0, Math.PI * 2);
                    ctx.arc(x + 6, y - 6, 2, 0, Math.PI * 2);
                    ctx.arc(x - 6, y + 6, 2, 0, Math.PI * 2);
                    ctx.arc(x + 6, y + 6, 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'server':
                    for (let i = 0; i < 3; i++) {
                        ctx.strokeRect(x - 12, y - 10 + i * 8, 24, 6);
                        ctx.beginPath(); ctx.arc(x + 8, y - 7 + i * 8, 1.5, 0, Math.PI * 2); ctx.fill();
                    }
                    break;
                case 'clock':
                    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 8);
                    ctx.moveTo(x, y); ctx.lineTo(x + 6, y); ctx.stroke();
                    break;
            }
            ctx.restore();
        }

        function drawLogo(ctx, x, y, size) {
            ctx.save();
            const gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
            gradient.addColorStop(0, THEME.primary);
            gradient.addColorStop(0.5, THEME.cyan);
            gradient.addColorStop(1, THEME.purple);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(x - size, y); ctx.lineTo(x, y - size); ctx.lineTo(x + size, y); ctx.lineTo(x, y + size); ctx.closePath(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x - size / 2, y); ctx.lineTo(x, y - size / 2); ctx.lineTo(x + size / 2, y); ctx.lineTo(x, y + size / 2); ctx.closePath(); ctx.stroke();
            ctx.restore();
        }

        function drawDonutChart(ctx, x, y, radius, lineWidth, percent, color) {
            ctx.save();
            ctx.lineCap = 'round';
            ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = THEME.bgSecondary; ctx.lineWidth = lineWidth; ctx.stroke();
            const startAngle = -Math.PI / 2;
            const endAngle = startAngle + (Math.PI * 2 * (percent / 100));
            ctx.shadowColor = color; ctx.shadowBlur = 10;
            ctx.beginPath(); ctx.arc(x, y, radius, startAngle, endAngle);
            ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 28px Arial";
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(`${Math.round(percent)}%`, x, y);
            ctx.restore();
        }

        function drawProgressBar(ctx, x, y, w, h, percent, color, label, value) {
            ctx.fillStyle = THEME.bgSecondary; ctx.fillRect(x, y, w, h);
            const gradient = ctx.createLinearGradient(x, y, x + w, y);
            gradient.addColorStop(0, color); gradient.addColorStop(1, color + 'aa');
            ctx.fillStyle = gradient; ctx.fillRect(x, y, w * (percent / 100), h);
            ctx.strokeStyle = THEME.border; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.textAlign = "left"; ctx.fillText(label, x, y - 6);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 11px Arial"; ctx.textAlign = "right"; ctx.fillText(value, x + w, y - 6);
        }

        function drawStatBox(ctx, x, y, w, h, label, value, color, iconType) {
            drawCard(ctx, x, y, w, h, 12);
            drawIcon(ctx, x + 28, y + 28, iconType, color);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.textAlign = "left"; ctx.fillText(label, x + 50, y + 22);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 16px Arial"; ctx.fillText(value, x + 50, y + 40);
        }

        async function renderDashboard(stats) {
            const W = 1200;
            const H = 800;
            const canvas = createCanvas(W, H);
            const ctx = canvas.getContext('2d');

            drawBackground(ctx, W, H);
            drawLogo(ctx, 60, 50, 20);

            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 32px Arial"; ctx.textAlign = "left"; ctx.fillText("SYSTEM MONITOR", 100, 58);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "13px Arial"; ctx.fillText("Real-time Performance Dashboard", 100, 80);

            const pingStatus = stats.ping < 100 ? THEME.success : stats.ping < 300 ? THEME.warning : THEME.danger;
            ctx.fillStyle = pingStatus; ctx.font = "bold 28px Arial"; ctx.textAlign = "right"; ctx.fillText(`${stats.ping}ms`, W - 50, 50);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "12px Arial"; ctx.fillText("LATENCY", W - 50, 70);

            const gradient = ctx.createLinearGradient(50, 100, W - 50, 100);
            gradient.addColorStop(0, THEME.primary); gradient.addColorStop(0.33, THEME.success); gradient.addColorStop(0.66, THEME.purple); gradient.addColorStop(1, THEME.cyan);
            ctx.strokeStyle = gradient; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(50, 100); ctx.lineTo(W - 50, 100); ctx.stroke();

            const mainY = 130, cardW = 260, cardH = 240, gap = 30;
            const x1 = 50, x2 = x1 + cardW + gap, x3 = x2 + cardW + gap, x4 = x3 + cardW + gap;

            drawCard(ctx, x1, mainY, cardW, cardH, 15);
            drawIcon(ctx, x1 + 30, mainY + 35, 'cpu', THEME.primary);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("CPU USAGE", x1 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`${stats.cpuCores} Cores @ ${stats.cpuSpeed} MHz`, x1 + 55, mainY + 58);
            drawDonutChart(ctx, x1 + cardW / 2, mainY + 140, 50, 12, stats.cpuLoad, THEME.primary);
            ctx.fillStyle = THEME.textTertiary; ctx.font = "10px Arial"; ctx.textAlign = "center"; ctx.fillText(stats.cpuModel.substring(0, 32), x1 + cardW / 2, mainY + 215);

            drawCard(ctx, x2, mainY, cardW, cardH, 15);
            drawIcon(ctx, x2 + 30, mainY + 35, 'memory', THEME.success);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("MEMORY", x2 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`Total: ${formatSize(stats.ramTotal)}`, x2 + 55, mainY + 58);
            const ramPercent = (stats.ramUsed / stats.ramTotal) * 100;
            drawDonutChart(ctx, x2 + cardW / 2, mainY + 140, 50, 12, ramPercent, THEME.success);
            ctx.fillStyle = THEME.textTertiary; ctx.font = "11px Arial"; ctx.textAlign = "center"; ctx.fillText(`${formatSize(stats.ramUsed)} Used`, x2 + cardW / 2, mainY + 205); ctx.fillText(`${formatSize(stats.ramTotal - stats.ramUsed)} Free`, x2 + cardW / 2, mainY + 220);

            drawCard(ctx, x3, mainY, cardW, cardH, 15);
            drawIcon(ctx, x3 + 30, mainY + 35, 'disk', THEME.purple);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("STORAGE", x3 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`Total: ${formatSize(stats.diskTotal)}`, x3 + 55, mainY + 58);
            let diskPercent = stats.diskTotal > 0 ? (stats.diskUsed / stats.diskTotal) * 100 : 0;
            drawDonutChart(ctx, x3 + cardW / 2, mainY + 140, 50, 12, diskPercent, THEME.purple);
            ctx.fillStyle = THEME.textTertiary; ctx.font = "11px Arial"; ctx.textAlign = "center"; ctx.fillText(`${formatSize(stats.diskUsed)} Used`, x3 + cardW / 2, mainY + 205); ctx.fillText(`${formatSize(stats.diskTotal - stats.diskUsed)} Free`, x3 + cardW / 2, mainY + 220);

            drawCard(ctx, x4, mainY, cardW, cardH, 15);
            drawIcon(ctx, x4 + 30, mainY + 35, 'network', THEME.cyan);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("NETWORK", x4 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`Interface: ${stats.networkInterface}`, x4 + 55, mainY + 58);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 13px Arial"; ctx.textAlign = "left"; ctx.fillText("RX (Download)", x4 + 30, mainY + 95);
            ctx.fillStyle = THEME.cyan; ctx.font = "bold 20px Arial"; ctx.fillText(formatSize(stats.networkRx), x4 + 30, mainY + 120);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 13px Arial"; ctx.fillText("TX (Upload)", x4 + 30, mainY + 155);
            ctx.fillStyle = THEME.pink; ctx.font = "bold 20px Arial"; ctx.fillText(formatSize(stats.networkTx), x4 + 30, mainY + 180);

            const statsY = 400, statW = 175, statH = 70, statGap = 20;
            drawStatBox(ctx, 50, statsY, statW, statH, "HOSTNAME", stats.hostname.substring(0, 15), THEME.primary, 'server');
            drawStatBox(ctx, 50 + (statW + statGap), statsY, statW, statH, "PLATFORM", `${stats.platform} (${stats.arch})`, THEME.success, 'server');
            drawStatBox(ctx, 50 + (statW + statGap) * 2, statsY, statW, statH, "BOT UPTIME", stats.uptimeBot, THEME.purple, 'clock');
            drawStatBox(ctx, 50 + (statW + statGap) * 3, statsY, statW, statH, "SERVER UPTIME", stats.uptimeServer, THEME.warning, 'clock');
            drawStatBox(ctx, 50 + (statW + statGap) * 4, statsY, statW, statH, "NODE.JS", stats.nodeVersion, THEME.cyan, 'server');

            const perfY = 500, perfH = 250, perfW = W - 100;
            drawCard(ctx, 50, perfY, perfW, perfH, 15);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 20px Arial"; ctx.textAlign = "left"; ctx.fillText("SYSTEM PERFORMANCE", 75, perfY + 35);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "12px Arial"; ctx.fillText("Real-time resource monitoring", 75, perfY + 55);

            const barY = perfY + 85, barW = 500, barH = 18, barGap = 35;
            drawProgressBar(ctx, 75, barY, barW, barH, stats.cpuLoad, THEME.primary, "CPU Load", `${stats.cpuLoad}%`);
            drawProgressBar(ctx, 75, barY + barGap, barW, barH, ramPercent, THEME.success, "Memory Usage", `${Math.round(ramPercent)}%`);
            drawProgressBar(ctx, 75, barY + barGap * 2, barW, barH, diskPercent, THEME.purple, "Disk Usage", `${Math.round(diskPercent)}%`);
            drawProgressBar(ctx, 75, barY + barGap * 3, barW, barH, Math.min(100, (stats.ping / 500) * 100), pingStatus, "Network Latency", `${stats.ping}ms`);

            const infoX = 620, infoStartY = perfY + 85, infoLineHeight = 28;
            let infoY = infoStartY;
            ctx.font = "13px Arial"; ctx.textAlign = "left";
            const drawInfoLine = (label, value) => {
                ctx.fillStyle = THEME.textSecondary; ctx.fillText(label, infoX, infoY);
                ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 13px Arial"; ctx.fillText(value, infoX + 150, infoY);
                ctx.font = "13px Arial"; infoY += infoLineHeight;
            };
            drawInfoLine("OS Release", stats.release);
            drawInfoLine("CPU Cores", `${stats.cpuCores} Cores`);
            drawInfoLine("CPU Speed", `${stats.cpuSpeed} MHz`);
            drawInfoLine("Total Memory", formatSize(stats.ramTotal));
            drawInfoLine("Free Memory", formatSize(stats.ramTotal - stats.ramUsed));
            ctx.fillStyle = THEME.textTertiary; ctx.font = "10px Arial"; ctx.textAlign = "center"; ctx.fillText(`Dashboard Generated: ${new Date().toLocaleString()}`, W / 2, H - 20);
            return canvas.toBuffer('image/png');
        }

        function getNetworkStats() {
            try {
                const interfaces = os.networkInterfaces();
                let totalRx = 0, totalTx = 0, activeInterface = 'N/A', ip = 'N/A';
                for (const [name, addrs] of Object.entries(interfaces)) {
                    if (name.toLowerCase().includes('lo')) continue;
                    for (const addr of addrs) {
                        if (addr.family === 'IPv4' && !addr.internal) { activeInterface = name; ip = addr.address; break; }
                    }
                }
                try {
                    const netstat = execSync("cat /proc/net/dev 2>/dev/null || echo ''").toString();
                    const lines = netstat.split('\n');
                    for (const line of lines) {
                        if (line.includes(':') && !line.includes('lo:')) {
                            const parts = line.trim().split(/\s+/);
                            if (parts.length >= 10) { totalRx += parseInt(parts[1]) || 0; totalTx += parseInt(parts[9]) || 0; }
                        }
                    }
                } catch (e) {}
                return { totalRx, totalTx, activeInterface, ip };
            } catch (e) {
                return { totalRx: 0, totalTx: 0, activeInterface: 'N/A', ip: 'N/A' };
            }
        }

        const start = performance.now();
        await new Promise(resolve => setTimeout(resolve, 10));
        const end = performance.now();
        const latency = (end - start).toFixed(2);

        const cpus = os.cpus();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const loadAvg = os.loadavg();
        const cpuPercent = Math.min(100, (loadAvg[0] * 100) / cpus.length).toFixed(1);

        let diskTotal = 0, diskUsed = 0;
        try {
            const df = execSync("df -k --output=size,used / 2>/dev/null").toString();
            const lines = df.trim().split("\n");
            if (lines.length > 1) {
                const [total, used] = lines[1].trim().split(/\s+/).map(Number);
                diskTotal = total * 1024;
                diskUsed = used * 1024;
            }
        } catch (e) {}

        const networkStats = getNetworkStats();

        const stats = {
            ping: latency,
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            nodeVersion: process.version,
            uptimeBot: formatTime(process.uptime()),
            uptimeServer: formatTime(os.uptime()),
            cpuModel: cpus[0].model.trim(),
            cpuSpeed: cpus[0].speed,
            cpuCores: cpus.length,
            cpuLoad: cpuPercent,
            ramTotal: totalMem,
            ramUsed: totalMem - freeMem,
            diskTotal: diskTotal,
            diskUsed: diskUsed,
            networkRx: networkStats.totalRx,
            networkTx: networkStats.totalTx,
            networkInterface: networkStats.activeInterface,
            networkIP: networkStats.ip
        };

        const imageBuffer = await renderDashboard(stats);

        await DinzBotz.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `*SERVER - INFORMATION 🔴*\n\n` +
                `- Latency: ${latency}ms\n` +
                `- CPU: ${stats.cpuLoad}%\n` +
                `- RAM: ${formatSize(stats.ramUsed)} / ${formatSize(stats.ramTotal)}\n` +
                `- Disk: ${formatSize(stats.diskUsed)} / ${formatSize(stats.diskTotal)}\n` +
                `- Network: ↓${formatSize(stats.networkRx)} ↑${formatSize(stats.networkTx)}`
        }, {
            quoted: m
        });

    } catch (e) {
        console.error(e);
        m.reply(`Error: ${e.message}`);
    }
}
break;
case 'ttaudio':
    case 'tiktokmusic':
case 'tiktokaudio':
case 'dlaudiotiktok': {
  if (!args[0]) return reply(`Contoh: ${prefix + command} https://vt.tiktok.com/ZS5yReYqE/`)

   DinzBotz.sendMessage(m.chat, {
    react: {
      text: "🎵",
      key: m.key
    }
  })

  try {
    const apiUrl = `https://api.nekolabs.web.id/downloader/tiktok?url=${encodeURIComponent(args[0])}`
    const response = await fetch(apiUrl)
    const json = await response.json()

    if (!json.success || !json.result) {
       DinzBotz.sendMessage(m.chat, {
        react: {
          text: "❌",
          key: m.key
        }
      })
      return reply('Gagal mengambil audio TikTok.')
    }

    const data = json.result

    await DinzBotz.sendMessage(m.chat, {
      audio: {
        url: data.musicUrl
      },
      mimetype: 'audio/mpeg',
      fileName: `${data.music_info.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: data.music_info.title,
          body: `Artist: ${data.music_info.author}`,
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: data.cover,
          sourceUrl: args[0]
        }
      }
    }, {
      quoted: m
    })

    DinzBotz.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key
      }
    })

  } catch (error) {
    console.error(error)
    reply('Terjadi kesalahan saat mengunduh.')
  }
}
break
case 'tt':
case 'tiktok': {
    let momok = "`𝗧 𝗜 𝗞 𝗧 𝗢 𝗞 - 𝗗 𝗢 𝗪 𝗡 𝗟 𝗢 𝗔 𝗗`"
    if (!q) return reply("Mana link tiktok nya?")
    if (!q.includes("tiktok.com")) return reply("Link tidak valid, pastikan link tiktok!")
    const { tiktokDl } = require('../lib/scrape/scraper1');
    await tiktokDl(q).then(async (result) => {
        await DinzBotz.sendMessage(m.chat, { react: { text: '🕖', key: m.key } })

        if (!result.status) return m.reply("Error!")

        if (result.durations == 0 && result.duration == "0 Seconds") {
            let araara = new Array()
            let urutan = 0

            for (let a of result.data) {
                let imgsc = await prepareWAMessageMedia({ image: { url: `${a.url}` } }, { upload: DinzBotz.waUploadToServer })
                await araara.push({
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                        title: `Foto Slide Ke *${urutan += 1}*`,
                        hasMediaAttachment: true,
                        ...imgsc
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: [{
                            "name": "cta_url",
                            "buttonParamsJson": `{\"display_text\":\"Link Tautan Foto\",\"url\":\"${a.url}\",\"merchant_url\":\"https://www.google.com\"}`
                        }]
                    })
                })
            }

            const msgii = await generateWAMessageFromContent(m.chat, {
                viewOnceMessageV2Extension: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.fromObject({
                                text: "*TIKTOK - DOWNLOADER*"
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: araara
                            })
                        })
                    }
                }
            }, { userJid: m.sender, quoted: m })

            await DinzBotz.relayMessage(m.chat, msgii.message, {
                messageId: msgii.key.id
            })

        } else {
            let urlVid = await result.data.find(e => e.type == "nowatermark_hd" || e.type == "nowatermark")

            await DinzBotz.sendMessage(m.chat, {
                video: { url: urlVid.url },
                caption: momok,
                footer: `\n${global.botname}`,
                buttons: [
                    {
                        buttonId: `.ttaudio ${text}`,
                        buttonText: {
                            displayText: "sᴏᴜɴᴅ 🔊"
                        }
                    },
                ],
                viewOnce: true,
            }, {
                quoted: m
            });
        }

    }).catch(e => console.log(e))

    await DinzBotz.sendMessage(m.chat, { react: { text: '🐬', key: m.key } })
}
break
case 'twitterdl': {
    if (!q) return m.reply('https://x.com/Indomielovers/status/1917826490068279736')
    m.reply('Tunggu sebentar, sedang memproses...')

    try {
        const axios = require('axios')
        const cheerio = require('cheerio')

        const res = await axios.post('https://twmate.com/', new URLSearchParams({
            page: q,
            ftype: 'all',
            ajax: '1'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://twmate.com/',
            }
        })

        const $ = cheerio.load(res.data)
        const videoLinks = []

        $('.btn-dl').each((index, element) => {
            const quality = $(element).parent().prev().text().trim()
            const downloadUrl = $(element).attr('href')
            if (downloadUrl.includes('.mp4')) {
                videoLinks.push({ quality, downloadUrl })
            }
        })

        if (videoLinks.length === 0) return m.reply('Gagal mengambil video. Pastikan URL benar dan video publik.')

        const best = videoLinks[0]
        let caption = `*Download Twitter/X*\n\n`
        caption += `*Quality:* ${best.quality}\n`
        caption += `*Source:* ${q}\n\n`
        caption += `*Link Alternatif:*\n`

        videoLinks.forEach((v, i) => {
            caption += `${i + 1}. ${v.quality}: ${v.downloadUrl}\n`
        })

        await DinzBotz.sendMessage(m.chat, {
            video: { url: best.downloadUrl },
            caption: caption.trim()
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('Terjadi kesalahan saat memproses video.')
    }
}
break
//ownermenu
case 'addsewa':
case 'sewa': {
    if (!DinzTheCreator) return m.reply('Khusus Owner!');
    if (!m.isGroup) return m.reply('Harus di dalam grup!');
    if (!args[0]) return m.reply(`Contoh: ${prefix}sewa 30`);

    let db = readDbSewa();
    if (checkIsSewa(m.chat)) return m.reply('⚠️ Grup ini sudah dalam masa sewa aktif!');

    // Hitung Expired
    let durationDays = parseInt(args[0]);
    let now = Date.now();
    let expiredTime = now + (durationDays * 24 * 60 * 60 * 1000);

    db.push({
        id: m.chat,
        expired: expiredTime,
        date: new Date().toLocaleDateString()
    });
    writeDbSewa(db);

    // Caption Struk
    let txt = `👑 *PREMIUM ACTIVATED* 👑\n\n`;
    txt += `Berhasil menambahkan masa sewa untuk grup ini.\n`;
    txt += `─────────────────────\n`;
    txt += `⏱️ *Durasi:* ${durationDays} Hari\n`;
    txt += `📅 *Start:* ${new Date(now).toLocaleDateString()}\n`;
    txt += `📉 *Expired:* ${new Date(expiredTime).toLocaleDateString()}\n`;
    txt += `─────────────────────\n`;
    txt += `_Bot akan aktif 24 Jam melayani grup ini!_`;

    m.reply(txt, {
        contextInfo: {
            externalAdReply: {
                title: "✅ SUCCESS ADD SEWA",
                body: "Premium Features Unlocked",
                thumbnailUrl: "https://telegra.ph/file/5dfcd7952eb5a92a54366.jpg",
                mediaType: 1, renderLargerThumbnail: true
            }
        }
    });
}
break;
case 'ceksewa': {
    if (!m.isGroup) return m.reply('Khusus Grup!');
    
    let db = readDbSewa();
    let data = db.find(x => x.id === m.chat);

    if (!data) {
        return m.reply(`❌ *FREE TRIAL MODE*\n\nGrup ini belum menyewa bot secara premium.\nBot dapat keluar sewaktu-waktu.\n\n_Hubungi Owner untuk sewa!_`);
    }

    let remaining = data.expired - Date.now();
    let sisaWaktu = msToDate(remaining); // Panggil Helper Waktu Detail

    let txt = `📊 *RENTAL STATUS* 📊\n\n`;
    txt += `Informasi masa aktif bot di grup ini:\n`;
    txt += `─────────────────────\n`;
    txt += `⏳ *Sisa Waktu:* ${sisaWaktu}\n`;
    txt += `📆 *Tanggal Join:* ${data.date}\n`;
    txt += `📉 *Jatuh Tempo:* ${new Date(data.expired).toLocaleDateString()} ${new Date(data.expired).toLocaleTimeString()}\n`;
    txt += `─────────────────────\n`;
    txt += `_Jangan lupa perpanjang sebelum habis ya!_`;

    await DinzBotz.sendMessage(m.chat, { 
        text: txt,
        contextInfo: {
            externalAdReply: {
                title: "💎 PREMIUM GROUP",
                body: `Expires in: ${sisaWaktu}`,
                thumbnailUrl: "https://telegra.ph/file/5dfcd7952eb5a92a54366.jpg",
                mediaType: 1, renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}
break;
case 'joinsewa': 
case 'sewalink': {
    if (!DinzTheCreator) return m.reply('Khusus Owner!');
    // Cek input
    if (!args[0] || !args[1]) return m.reply(`⚠️ Format Salah!\n\nContoh:\n${prefix}joinsewa <link> 30d (Hari)\n${prefix}joinsewa <link> 60m (Menit)`);

    // 1. Ambil Kode Link (Pakai Regex biar akurat)
    let code = args[0].match(/chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i)?.[1];
    if (!code) return m.reply('❌ Link tidak valid!');

    // 2. Hitung Durasi (Fleksibel Hari/Menit)
    let input = args[1];
    let durasi = parseInt(input);
    let unit = input.toLowerCase().endsWith('m') ? 'Menit' : 'Hari';
    let multiplier = (unit === 'Menit') ? 60000 : 86400000;

    m.reply('⏳ _Sedang memproses join... Mohon tunggu 5 detik..._');

    try {
        // 3. EKSEKUSI JOIN
        // Kita tangkap error spesifik join di sini
        let res;
        try {
            res = await DinzBotz.groupAcceptInvite(code);
        } catch (e) {
            console.log(e);
            return m.reply('❌ Gagal Join! Bot mungkin diblokir dari grup itu atau Link sudah di-reset admin.');
        }

        // Kalau res kosong/undefined, berhenti
        if (!res) return m.reply('❌ Gagal Join (Response kosong).');

        // 4. SIMPAN DATABASE (Cepat)
        let db = readDbSewa();
        if (db.some(x => x.id === res)) {
            return m.reply(`⚠️ Bot berhasil masuk, TAPI grup ini sudah terdaftar sewa sebelumnya.`);
        }

        db.push({
            id: res,
            expired: Date.now() + (durasi * multiplier),
            date: new Date().toLocaleDateString()
        });
        writeDbSewa(db);


        await new Promise(resolve => setTimeout(resolve, 5000));

  
        if (DinzBotz.ws.isOpen) {
            let welcomeTxt = `✅ *BOT CONNECTED* ✅\n\n`;
            welcomeTxt += `Bot berhasil masuk via Link Sewa.\n`;
            welcomeTxt += `─────────────────────\n`;
            welcomeTxt += `⏱️ *Durasi:* ${durasi} ${unit}\n`;
            welcomeTxt += `📉 *Expired:* ${new Date(Date.now() + (durasi * multiplier)).toLocaleString()}\n`;
            welcomeTxt += `─────────────────────\n`;
            welcomeTxt += `_Bot akan otomatis keluar jika expired._`;

            await DinzBotz.sendMessage(res, {
                text: welcomeTxt,
                contextInfo: {
                    externalAdReply: {
                        title: "PREMIUM RENTAL JOIN",
                        body: "Active Now",
                        thumbnailUrl: "https://cdn.dinzid.biz.id/6S2g.jpg",
                        mediaType: 1, renderLargerThumbnail: true
                    }
                }
            });

            // Lapor ke Owner
            reply(`✅ *SUKSES!*\nID: ${res}\nDurasi: ${durasi} ${unit}`);
        } else {
            reply(`⚠️ Berhasil Join & Simpan Database, tapi gagal kirim pesan sambutan (Koneksi tidak stabil).`);
        }

    } catch (e) {
        console.log(e);
        m.reply(`❌ Error System: ${e}`);
    }
}
break;
  default:
 }

if (antilinkStatus) {
let gc = `https://`
if (chatmessage.includes(gc)) {
    m.reply('*sebuah link terdeteksi maaf kamu harus di kick ⛔*');
    let gclink = (`https://chat.whatsapp.com/` + await DinzBotz.groupInviteCode(m.chat))
    let isLinkThisGc = new RegExp(gclink, 'i')
    let isgclink = isLinkThisGc.test(m.text)
    if (isgclink) return m.reply(`Ohh, Link Group Ini Ternyata`)
    if (!isBotGroupAdmins) return m.reply(`Duhh bot bukan admin`)
    if (isGroupAdmins) return m.reply(`Ternyata kamu admin, maaf min`)
    if (isOwner) return m.reply(`Ternyata kamu owner, maaf king`)
    DinzBotz.sendMessage(m.chat, {
               delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.key.participant
               }
            })
    DinzBotz.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}

}

let file = require.resolve(__filename)
 fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log('===================================================');
	console.log(chalk.red(`    New ${__filename}`))
	delete require.cache[file]
	require(file)
})