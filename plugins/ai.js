import Cg from "../config.js";
import { AnyaGen3, func } from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import geminiAI from "../lib/ai/geminiAI.js";

const __filename = fileURLToPath(import.meta.url);

AnyaGen3(
    {
        on: "category",
        category: "ai",
        category_symbol: "🤖",
        commands_symbol: "🕹️",
        category_desc: "The AI category includes Artificial intelligence related commands."     
    }
)

AnyaGen3(
  {
    name: "gemini",
    alias: ["ai", "bard"],
    react: "✨",
    category: "ai",
    exp: 10,
    desc: "Use Gemini 2.5 Pro AI model by Google.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, prefix }) => {
    if (!args[0]) return msg.reply("Enter some texts!", { style: "monospace" });
    const prompt = [args.join(" ")];
    const apiKey = db.get({ dbType: "APIKEYS" })?.gemini || false;
    if (!apiKey) return msg.reply(`Gemini API-key is missing!\n\nFollow : https://github.com/PikaBotz/db-extention/wiki/Gemini-API-key`, { style: "monospace" });
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
      if (/image|sticker/.test(mime)) {
        const buffer = await quoted.download({});
        prompt.push(buffer);
      }
      if (/image|sticker/.test(msg.type) && msg !== quoted) {
        const buffer = await msg.download({});
        prompt.push(buffer);
      }
    }
    const response = await geminiAI(prompt, msg.sender_num, apiKey, "gemini-2.5-pro-exp-03-25");
    if (!response.status) return msg.reply(response.error, { style: "monospace" });
    msg.reply(response.message);
    return;
  }
)

AnyaGen3(
  {
    name: "gemini2",
    alias: ["ai2", "bard2"],
    react: "✨",
    category: "ai",
    exp: 10,
    desc: "Use Gemini 2.0 Flash AI model by Google.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, prefix }) => {
    if (!args[0]) return msg.reply("Enter some texts!", { style: "monospace" });
    const prompt = [args.join(" ")];
    const apiKey = db.get({ dbType: "APIKEYS" })?.gemini || false;
    if (!apiKey) return msg.reply(`Gemini API-key is missing!\n\nFollow : https://github.com/PikaBotz/db-extention/wiki/Gemini-API-key`, { style: "monospace" });
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
      if (/image|sticker/.test(mime)) {
        const buffer = await quoted.download({});
        prompt.push(buffer);
      }
      if (/image|sticker/.test(msg.type) && msg !== quoted) {
        const buffer = await msg.download({});
        prompt.push(buffer);
      }
    }
    const response = await geminiAI(prompt, msg.sender_num, apiKey, "gemini-2.0-flash");
    if (!response.status) return msg.reply(response.error, { style: "monospace" });
    msg.reply(response.message);
    return;
  }
)

AnyaGen3(
  {
    name: "gemini3",
    alias: ["ai3", "bard3"],
    react: "✨",
    category: "ai",
    exp: 10,
    desc: "Use Gemini 2.0 Flash-Lite AI model by Google.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, prefix }) => {
    if (!args[0]) return msg.reply("Enter some texts!", { style: "monospace" });
    const prompt = [args.join(" ")];
    const apiKey = db.get({ dbType: "APIKEYS" })?.gemini || false;
    if (!apiKey) return msg.reply(`Gemini API-key is missing!\n\nFollow : https://github.com/PikaBotz/db-extention/wiki/Gemini-API-key`, { style: "monospace" });
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
      if (/image|sticker/.test(mime)) {
        const buffer = await quoted.download({});
        prompt.push(buffer);
      }
      if (/image|sticker/.test(msg.type) && msg !== quoted) {
        const buffer = await msg.download({});
        prompt.push(buffer);
      }
    }
    const response = await geminiAI(prompt, msg.sender_num, apiKey, "gemini-2.0-flash-lite");
    if (!response.status) return msg.reply(response.error, { style: "monospace" });
    msg.reply(response.message);
    return;
  }
)

AnyaGen3(
  {
    name: "gemini4",
    alias: ["ai4", "bard4"],
    react: "✨",
    category: "ai",
    exp: 10,
    desc: "Use Gemini 1.5 Flash AI model by Google.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, prefix }) => {
    if (!args[0]) return msg.reply("Enter some texts!", { style: "monospace" });
    const prompt = [args.join(" ")];
    const apiKey = db.get({ dbType: "APIKEYS" })?.gemini || false;
    if (!apiKey) return msg.reply(`Gemini API-key is missing!\n\nFollow : https://github.com/PikaBotz/db-extention/wiki/Gemini-API-key`, { style: "monospace" });
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
      if (/image|sticker/.test(mime)) {
        const buffer = await quoted.download({});
        prompt.push(buffer);
      }
      if (/image|sticker/.test(msg.type) && msg !== quoted) {
        const buffer = await msg.download({});
        prompt.push(buffer);
      }
    }
    const response = await geminiAI(prompt, msg.sender_num, apiKey, "gemini-1.5-flash");
    if (!response.status) return msg.reply(response.error, { style: "monospace" });
    msg.reply(response.message);
    return;
  }
)

AnyaGen3(
  {
    name: "gemini5",
    alias: ["ai5", "bard5"],
    react: "✨",
    category: "ai",
    exp: 10,
    desc: "Use Gemini 1.5 Flash-8B AI model by Google.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, prefix }) => {
    if (!args[0]) return msg.reply("Enter some texts!", { style: "monospace" });
    const prompt = [args.join(" ")];
    const apiKey = db.get({ dbType: "APIKEYS" })?.gemini || false;
    if (!apiKey) return msg.reply(`Gemini API-key is missing!\n\nFollow : https://github.com/PikaBotz/db-extention/wiki/Gemini-API-key`, { style: "monospace" });
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
      if (/image|sticker/.test(mime)) {
        const buffer = await quoted.download({});
        prompt.push(buffer);
      }
      if (/image|sticker/.test(msg.type) && msg !== quoted) {
        const buffer = await msg.download({});
        prompt.push(buffer);
      }
    }
    const response = await geminiAI(prompt, msg.sender_num, apiKey, "gemini-1.5-flash-8b");
    if (!response.status) return msg.reply(response.error, { style: "monospace" });
    msg.reply(response.message);
    return;
  }
)

AnyaGen3(
  {
    name: "gemini6",
    alias: ["ai6", "bard6"],
    react: "✨",
    category: "ai",
    exp: 10,
    desc: "Use Gemini 1.5 Pro AI model by Google.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, prefix }) => {
    if (!args[0]) return msg.reply("Enter some texts!", { style: "monospace" });
    const prompt = [args.join(" ")];
    const apiKey = db.get({ dbType: "APIKEYS" })?.gemini || false;
    if (!apiKey) return msg.reply(`Gemini API-key is missing!\n\nFollow : https://github.com/PikaBotz/db-extention/wiki/Gemini-API-key`, { style: "monospace" });
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    if (/image|sticker/.test(mime) || /image|sticker/.test(msg.type)) {
      if (/image|sticker/.test(mime)) {
        const buffer = await quoted.download({});
        prompt.push(buffer);
      }
      if (/image|sticker/.test(msg.type) && msg !== quoted) {
        const buffer = await msg.download({});
        prompt.push(buffer);
      }
    }
    const response = await geminiAI(prompt, msg.sender_num, apiKey, "gemini-1.5-pro");
    if (!response.status) return msg.reply(response.error, { style: "monospace" });
    msg.reply(response.message);
    return;
  }
)