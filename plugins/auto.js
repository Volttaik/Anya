import Cg from "../config.js";
import { AnyaGen3, func, stylish_font } from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import uploadToImgbb from "../lib/uploader/imgbb.js";
import blackboxAI from "../lib/ai/blackboxAI.js";
import mistralAI from "../lib/ai/mistralAI.js";
import geminiAI from "../lib/ai/geminiAI.js";
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AnyaGen3({ on: ["text", "image", "sticker"] }, async (anyaGen3, msg, { db, bot, group, botJid }) => {
  let response, chatbot, type;
  if (msg.isPrivate) {
    if (!bot.chatbot) return;
    ({ model: chatbot, type = "text" } = bot.chatbot);
  } else if (msg.isGroup) {
    if (!group.chatbot || (!msg.mentions.includes(botJid) && msg.quoted?.sender !== botJid)) return;
    ({ model: chatbot, type = "text" } = group.chatbot);
    if (msg.body?.includes("@" + botJid.split("@")[0])) {
      msg.body = msg.body.replace("@" + botJid.split("@")[0], "");
      if (!msg.body || msg.body.trim() === "") msg.body = "Listen!";
    }
  } else return;
  const sendVn = async (text, female) => {
    const res = await fetch(`${Cg.PIKABOTZ_API_URL}/tools/multilingual_tts/get_tts?apikey=${Cg.PIKABOTZ_API_KEY}&language=english&speaker=${female ? "Ana" : "Guy"}&query=${encodeURIComponent(text)}`)
      .then(res => res.json());
    if (!res.status) return msg.reply(res.message || "TTS failed");
    await anyaGen3.sendMessage(msg.chat, { audio: { url: res.audio.dl_url }, mimetype: "audio/mp4", ptt: true }, { quoted: msg });
  };
  switch (chatbot) {
    case "mistralanya": {
      const prompt = [];
      if (msg.body) prompt.push(msg.body);
      const quoted = msg.quoted ? msg.quoted : msg;
      const mime = (quoted && quoted.type) ? quoted.type : msg.type;
      if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
        if (/image|sticker/.test(mime)) {
          const bufferQuoted = await quoted.download({});
          const uploadQuoted = await uploadToImgbb(bufferQuoted);
          prompt.push(uploadQuoted.url);
        }
        if (/image|sticker/.test(msg.type) && msg !== quoted) {
          const bufferMsg = await msg.download({});
          const uploadQuoted = await uploadToImgbb(bufferMsg, "604800");
          prompt.push(uploadQuoted.url);
        }
      }
      const result = await mistralAI(prompt, msg.sender_num, "mistral_anya");
      if (!result.status) return msg.reply(`\`\`\`${result.error}\`\`\`` || Cg.msg.error);
      response = result.message;
      break;
    }
    case "caianya":
      response = await fetch(`${Cg.PIKABOTZ_API_URL}/ai/cai_anya/?prompt=${encodeURIComponent(msg.body)}&chatid=${msg.sender_num}`)
        .then(res => res.json())
        .then(data => data.status ? data.message : msg.reply(data.message) || null);
      if (!response) return;
      break;
    case "geminianya": {
      const apiKey = db.get({ dbType: "APIKEYS" })?.gemini || false;
      const prompt = [];
      if (msg.body) prompt.push(msg.body);
      const quoted = msg.quoted ? msg.quoted : msg;
      const mime = (quoted && quoted.type) ? quoted.type : msg.type;
      if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
        if (/image|sticker/.test(mime)) {
          const bufferQuoted = await quoted.download({});
          prompt.push(bufferQuoted);
        }
        if (/image|sticker/.test(msg.type) && msg !== quoted) {
          const bufferMsg = await msg.download({});
          prompt.push(bufferMsg);
        }
      }
      const result = await geminiAI(prompt, msg.sender_num, apiKey, "gemini-2.0-flash", true);
      if (!result.status) return msg.reply(`\`\`\`${result.error}\`\`\`` || Cg.msg.error);
      response = result.message;
      break;
    }
    case "gemini": {
      const apiKey = db.get({ dbType: "APIKEYS" })?.gemini || false;
      const prompt = [];
      if (msg.body) prompt.push(msg.body);
      const quoted = msg.quoted ? msg.quoted : msg;
      const mime = (quoted && quoted.type) ? quoted.type : msg.type;
      if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
        if (/image|sticker/.test(mime)) {
          const bufferQuoted = await quoted.download({});
          prompt.push(bufferQuoted);
        }
        if (/image|sticker/.test(msg.type) && msg !== quoted) {
          const bufferMsg = await msg.download({});
          prompt.push(bufferMsg);
        }
      }
      const result = await geminiAI(prompt, msg.sender_num, apiKey, "gemini-2.0-flash");
      if (!result.status) return msg.reply(`\`\`\`${result.error}\`\`\`` || Cg.msg.error);
      response = result.message;
      break;
    }
    case "mistral": {
      const prompt = [];
      if (msg.body) prompt.push(msg.body);
      const quoted = msg.quoted ? msg.quoted : msg;
      const mime = (quoted && quoted.type) ? quoted.type : msg.type;
      if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
        if (/image|sticker/.test(mime)) {
          const bufferQuoted = await quoted.download({});
          const uploadQuoted = await uploadToImgbb(bufferQuoted);
          prompt.push(uploadQuoted.url);
        }
        if (/image|sticker/.test(msg.type) && msg !== quoted) {
          const bufferMsg = await msg.download({});
          const uploadQuoted = await uploadToImgbb(bufferMsg, "604800");
          prompt.push(uploadQuoted.url);
        }
      }
      const result = await mistralAI(prompt, msg.sender_num, "pixtral-12b-latest");
      if (!result.status) return msg.reply(`\`\`\`${result.error}\`\`\`` || Cg.msg.error);
      response = result.message;
      break;
    }
    case "bboxanya": {
      const prompt = [];
      if (msg.body) prompt.push(msg.body);
      const quoted = msg.quoted ? msg.quoted : msg;
      const mime = (quoted && quoted.type) ? quoted.type : msg.type;
      if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
        if (/image|sticker/.test(mime)) {
          const bufferQuoted = await quoted.download({});
          prompt.push(bufferQuoted);
        }
        if (/image|sticker/.test(msg.type) && msg !== quoted) {
          const bufferMsg = await msg.download({});
          prompt.push(bufferMsg);
        }
      }
      const result = await blackboxAI(prompt, { userId: msg.sender_num, anyaPersona: true });
      if (!result.status) return msg.reply(`\`\`\`${result.error}\`\`\`` || Cg.msg.error);
      response = result.message;
      break;
    }
    case "blackbox": {
      const prompt = [];
      if (msg.body) prompt.push(msg.body);
      const quoted = msg.quoted ? msg.quoted : msg;
      const mime = (quoted && quoted.type) ? quoted.type : msg.type;
      if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
        if (/image|sticker/.test(mime)) {
          const bufferQuoted = await quoted.download({});
          prompt.push(bufferQuoted);
        }
        if (/image|sticker/.test(msg.type) && msg !== quoted) {
          const bufferMsg = await msg.download({});
          prompt.push(bufferMsg);
        }
      }
      const result = await blackboxAI(prompt, { userId: msg.sender_num });
      if (!result.status) return msg.reply(`\`\`\`${result.error}\`\`\`` || Cg.msg.error);
      response = result.message;
      break;
    }
    case "chatgpt":
    case "brainshop":
      return console.error(`Unsupported chatbot: ${chatbot}`);
    default:
      return console.error("Unknown chatbot settings", chatbot);
  }
  if (type === "text") msg.reply(response);
  else if (/voice/.test(type)) await sendVn(response, type === "voicef");
});