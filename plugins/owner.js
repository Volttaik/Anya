import fs from "node:fs";
import Cg from "../config.js";
import {
  AnyaGen3,
  plugins
} from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import PhoneNumber from 'awesome-phonenumber';

const __filename = fileURLToPath(import.meta.url);
const activeOptions = ["on", "enable", "active", "activate"];
const deactiveOptions = ["off", "disable", "deactive", "deactivate"];

AnyaGen3(
    {
        on: "category",
        category: "owner",
        category_symbol: "👑",
        commands_symbol: "👤",
        category_desc: "The Owner category includes commands for managing the bot's configuration and crucial operations, accessible only to authorized users."
    }
)

AnyaGen3(
  {
    name: "reboot",
    alias: ["restart"],
    react: "💻",
    rule: 1,
    category: "owner",
    desc: "Restart this bot remotely.",
    filename: __filename
  },
  async (anyaGen3, msg) => {
    await msg.reply("Restarting...", { style: "monospace" });
    process.send(["reset", Cg.OWNER_NUMBER + "@s.whatsapp.net" === msg.chat ? "" : msg.chat]);
  }
);

AnyaGen3(
  {
    name: "chatbot",
    react: "🤖",
    category: "owner",
    rule: 1,
    desc: "Enable to talk to ai bots.",
    filename: __filename
  },
  async (anyaGen3, msg, { args, db, bot }) => {
    const option = args[0]?.toLowerCase() || null;
    const model = bot.chatbot?.model || "caianya";
    const type = bot.chatbot?.type || "text";
    if (activeOptions.includes(option)) {
      if (bot.chatbot) return msg.reply(`Already On and set as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model: "caianya",
            type
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (option === "--mistralanya") {
      if (model === "mistralanya") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model: "mistralanya",
            type
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'mistralanya'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--geminianya") {
      if (model === "geminianya") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model: "geminianya",
            type
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'geminianya'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--bboxanya") {
      if (model === "bboxanya") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model: "bboxanya",
            type
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'bboxanya'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--gemini") {
      if (model === "gemini") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model: "gemini",
            type
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'gemini'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--mistral") {
      if (model === "mistral") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model: "mistral",
            type
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'mistral'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--blackbox") {
      if (model === "blackbox") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model: "blackbox",
            type
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'blackbox'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--caianya") {
      if (model === "caianya") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model: "caianya",
            type
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'caianya'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--text") {
      if (type === "text") return msg.reply(`Already set response type as : '${type}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model,
            type: "text"
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to response type : 'text'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--voicef") {
      if (type === "voicef") return msg.reply(`Already set response type as : '${type}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model,
            type: "voicef"
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to response type : 'voicef'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--voicem") {
      if (type === "voicem") return msg.reply(`Already set response type as : '${type}'`, { style: "monospace" });
      await db.create({
        data: {
          chatbot: {
            model,
            type: "voicem"
          }
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.chatbot
        ? msg.reply(`Changed settings to response type : 'voicem'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (deactiveOptions.includes(option)) {
      if (!bot.chatbot) return msg.reply("Already Off!", { style: "monospace" });
        await db.delete({
          key: "chatbot",
          dbType: "SYSTEM"
        });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> Turn on to talk to AI in private chats.

\`\`\`OFF :\`\`\`
> Turn off if you don't want a chatbot.

\`\`\`--TEXT :\`\`\`
> Only text responsess from chatbot.

\`\`\`--VOICEF :\`\`\`
> Get female voice note responses from chatbot.

\`\`\`--VOICEM :\`\`\`
> Get male voice note responses from chatbot.

\`\`\`--CAIANYA :\`\`\`
> Use Queen Anya chatbot powered by c.ai models.

\`\`\`--MISTRALANYA :\`\`\`
> Use Queen Anya chatbot powered by mistral.ai models.
> *Supports interaction with images.*

\`\`\`--GEMINIANYA :\`\`\`
> Use Queen Anya chatbot powered by gemini.ai models.
> *Supports interaction with images.*

\`\`\`--BBOXANYA :\`\`\`
> Use Queen Anya chatbot powered by blackbox.ai models.
> *Supports interaction with images.*

\`\`\`--MISTRAL :\`\`\`
> Use _Mistra Large 2.1_ Ai model as a chatbot.
> *Supports interaction with images.*

\`\`\`--GEMINI :\`\`\`
> Use _Gemini 1.5 flash_ Ai model as a chatbot.
> *Supports interaction with images.*

\`\`\`--BLACKBOX :\`\`\`
> Use _Blackbox Random_ Ai model as a chatbot.
> *Supports interaction with images.*`);
      return;
    }
  }
);

AnyaGen3(
  {
    name: "chatbotgc",
    alias: ["gcchatbot"],
    react: "🤖",
    category: "owner",
    rule: 6,
    desc: "Enable to talk to ai bots in group chats.",
    filename: __filename
  },
  async (anyaGen3, msg, { args, db, group }) => {
    const option = args[0]?.toLowerCase() || null;
    const model = group.chatbot?.model || "caianya";
    const type = group.chatbot?.type || "text";
    if (activeOptions.includes(option)) {
      if (group.chatbot) return msg.reply(`Already On and set as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model: "caianya",
            type
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (option === "--mistralanya") {
      if (model === "mistralanya") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model: "mistralanya",
            type
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'mistralanya'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--geminianya") {
      if (model === "geminianya") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model: "geminianya",
            type
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'geminianya'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--bboxanya") {
      if (model === "bboxanya") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model: "bboxanya",
            type
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'bboxanya'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--blackbox") {
      if (model === "blackbox") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model: "blackbox",
            type
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'blackbox'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--gemini") {
      if (model === "gemini") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model: "gemini",
            type
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'gemini'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--mistral") {
      if (model === "mistral") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model: "mistral",
            type
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'mistral'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--caianya") {
      if (model === "caianya") return msg.reply(`Already set chatbot model as : '${model}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model: "caianya",
            type
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to Chatbot model : 'caianya'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--text") {
      if (type === "text") return msg.reply(`Already set response type as : '${type}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model,
            type: "text"
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to response type : 'text'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--voicef") {
      if (type === "voicef") return msg.reply(`Already set response type as : '${type}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model,
            type: "voicef"
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to response type : 'voicef'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (option === "--voicem") {
      if (type === "voicem") return msg.reply(`Already set response type as : '${type}'`, { style: "monospace" });
      await db.create({
        data: {
          id: msg.chat_num,
          chatbot: {
            model,
            type: "voicem"
          }
        },
        dbType: "GROUP",
        allowUpdate: true,
        allowNew: true
      });
      group.chatbot
        ? msg.reply(`Changed settings to response type : 'voicem'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return; 
    } else if (deactiveOptions.includes(option)) {
      if (!group.chatbot) return msg.reply("Already Off!", { style: "monospace" });
        await db.delete({
          id: msg.chat_num,
          key: "chatbot",
          dbType: "GROUP"
        });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> Turn on to talk to AI in private chats.

\`\`\`OFF :\`\`\`
> Turn off if you don't want a chatbot.

\`\`\`--TEXT :\`\`\`
> Only text responsess from chatbot.

\`\`\`--VOICEF :\`\`\`
> Get female voice note responses from chatbot.

\`\`\`--VOICEM :\`\`\`
> Get male voice note responses from chatbot.

\`\`\`--CAIANYA :\`\`\`
> Use Queen Anya chatbot powered by c.ai models.

\`\`\`--MISTRALANYA :\`\`\`
> Use Queen Anya chatbot powered by mistral.ai models.
> *Supports interaction with images.*

\`\`\`--GEMINIANYA :\`\`\`
> Use Queen Anya chatbot powered by gemini.ai models.
> *Supports interaction with images.*

\`\`\`--BBOXANYA :\`\`\`
> Use Queen Anya chatbot powered by blackbox.ai models.
> *Supports interaction with images.*

\`\`\`--MISTRAL :\`\`\`
> Use _Mistra Large 2.1_ Ai model as a chatbot.
> *Supports interaction with images.*

\`\`\`--GEMINI :\`\`\`
> Use _Gemini 1.5 flash_ Ai model as a chatbot.
> *Supports interaction with images.*

\`\`\`--BLACKBOX :\`\`\`
> Use _Blackbox Random_ Ai model as a chatbot.
> *Supports interaction with images.*`);
      return;
    }
  }
);

AnyaGen3(
  {
    name: "leveling",
    react: "📈",
    category: "owner",
    rule: 1,
    desc: "Enable leveling system, ranks, exp system in the bot.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, bot, prefix, command }) => {
    const option = args[0]?.toLowerCase() || null;
    if (activeOptions.includes(option)) {
      if (bot.leveling) return msg.reply("Already Enabled!", { style: "monospace" });
      await db.create({
        data: {
          leveling: true
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      if (db.type === "LOCAL") {
        await msg.reply("⚠️ You're using Local Storage for database saving. Local storage is not reliable on cloud servers like Heroku, Koyeb, or Render. Use a database URL to prevent data loss.", { style: "italic" });
      }
      await msg.reply(Cg.msg.success);
      return;
    } else if (deactiveOptions.includes(option)) {
      if (!bot.leveling) return msg.reply("Already Deactivated!", { style: "monospace" });
      await db.delete({
        key: "leveling",
        dbType: "SYSTEM"
      });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> Enable ranking and exp system in the bot.

\`\`\`OFF :\`\`\`
> Don't use any ranking system. (default)`);
      return;
    }
  }
)

AnyaGen3(
  {
    name: "autojoingc",
    alias: ["autojoin"],
    react: "👥",
    category: "owner",
    rule: 1,
    desc: "Automatically join groups using bot number.",
    filename: __filename
  },
  async (anyaGen3, msg, { args, db, bot }) => {
    const option = args[0]?.toLowerCase() || null;
    if (activeOptions.includes(option)) {
      if (bot.autoJoinGc) return msg.reply(`Already On and set as : '${bot.autoJoinGc}'`, { style: "monospace" });
      await db.create({
        data: {
          autoJoinGc: "all"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (option === "--owner") {
      if (bot.autoJoinGc === "owner") return msg.reply(`Already set as : '${bot.autoJoinGc}'`, { style: "monospace" });
      await db.create({
        data: {
          autoJoinGc: "owner"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.autoJoinGc
        ? msg.reply(`Changed settings to AutoJoinGc : 'owner'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--admin" || option === "--admins") {
      if (bot.autoJoinGc === "admin") return msg.reply(`Already set as : '${bot.autoJoinGc}'`, { style: "monospace" });
      await db.create({
        data: {
          autoJoinGc: "admin"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.autoJoinGc
        ? msg.reply(`Changed settings to AutoJoinGc : 'admin'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--all") {
      if (bot.autoJoinGc === "all") return msg.reply(`Already set as : '${bot.autoJoinGc}'`, { style: "monospace" });
      await db.create({
        data: {
          autoJoinGc: "all"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.autoJoinGc
        ? msg.reply(`Changed settings to AutoJoinGc : 'all'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--ownergc") {
      if (bot.autoJoinGc === "ownergc") return msg.reply(`Already set as : '${bot.autoJoinGc}'`, { style: "monospace" });
      await db.create({
        data: {
          autoJoinGc: "ownergc"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.autoJoinGc
        ? msg.reply(`Changed settings to AutoJoinGc : 'ownergc'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--allgc") {
      if (bot.autoJoinGc === "allgc") return msg.reply(`Already set as : '${bot.autoJoinGc}'`, { style: "monospace" });
      await db.create({
        data: {
          autoJoinGc: "allgc"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.autoJoinGc
        ? msg.reply(`Changed settings to AutoJoinGc : 'allgc'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--ownerdm") {
      if (bot.autoJoinGc === "ownerdm") return msg.reply(`Already set as : '${bot.autoJoinGc}'`, { style: "monospace" });
      await db.create({
        data: {
          autoJoinGc: "ownerdm"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.autoJoinGc
        ? msg.reply(`Changed settings to AutoJoinGc : 'ownerdm'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--alldm") {
      if (bot.autoJoinGc === "alldm") return msg.reply(`Already set as : '${bot.autoJoinGc}'`, { style: "monospace" });
      await db.create({
        data: {
          autoJoinGc: "ownerdm"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.autoJoinGc
        ? msg.reply(`Changed settings to AutoJoinGc : 'alldm'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (deactiveOptions.includes(option)) {
      if (!bot.autoJoinGc) return msg.reply("Already Off!", { style: "monospace" });
        await db.delete({
          key: "autoJoinGc",
          dbType: "SYSTEM"
        });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> Turn on to automatically join every group using given invitation url.

\`\`\`OFF :\`\`\`
> Turn off to not join any group automatically.

\`\`\`--OWNER :\`\`\`
> Join group invites only sent by mods anywhere.

\`\`\`--ADMIN :\`\`\`
> Join group invites only sent by owner & admins of the current group.

\`\`\`--ALL :\`\`\`
> Join group invites sent by anyone anywhere.

\`\`\`--OWNERGC :\`\`\`
> Join group invites sent by mods only in group chats.

\`\`\`--ALLGC :\`\`\`
> Join group invites sent by anyone only in group chats.

\`\`\`--OWNERDM :\`\`\`
> Join group invites sent by mods only in private chats.

\`\`\`--ALLDM :\`\`\`
> Join group invites sent by anyone only in private chats.`);
      return;
    }
  }
);

AnyaGen3(
  {
    name: "mod",
    alias: ["owner"],
    react: "👤",
    category: "system",
    desc: "Get bot's owner name and number",
    filename: __filename
  },
  async (anyaGen3, msg, { user }) => {
    const number = new PhoneNumber('+' + Cg.OWNER_NUMBER);
    const regionCode = number.getRegionCode();
    const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(regionCode);
    let vcard = "";
    vcard += "BEGIN:VCARD\n";
    vcard += "VERSION:3.0\n";
    vcard += `FN;CHARSET=UTF-8:${Cg.OWNER_NAME}\n`;
    if (user.name) vcard += `NICKNAME;CHARSET=UTF-8:${user.name}\n`;
    vcard += `TEL;type=CELL;type=VOICE;waid=${Cg.OWNER_NUMBER}:${Cg.OWNER_NUMBER}\n`;
    vcard += `ADR;CHARSET=UTF-8;TYPE=HOME:;;;;;;${countryName}\n`;
    vcard += "TITLE;CHARSET=UTF-8:User\n";
    vcard += "ROLE;CHARSET=UTF-8:User\n";
    vcard += "ORG;CHARSET=UTF-8:PikaBotz\n";
    vcard += "URL;type=WORK;CHARSET=UTF-8:Https://github.com/PikaBotz\n";
    vcard += "END:VCARD";
    await anyaGen3.sendMessage(msg.chat, {
      contacts: {
        displayName: Cg.OWNER_NAME,
        contacts: [{ vcard }]
      }
    }, { quoted:msg });
  }
)

AnyaGen3(
  {
    name: "anticall",
    react: "📵",
    category: "owner",
    rule: 1,
    desc: "Reject/block callers",
    filename: __filename
  },
  async (anyaGen3, msg, { args, db, bot }) => {
    const option = args[0]?.toLowerCase() || null;
    if (activeOptions.includes(option)) {
      if (bot.anticall) return msg.reply(`Already On and set as : '${bot.anticall}'`, { style: "monospace" });
      await db.create({
        data: {
          anticall: "block"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (option === "--block") {
      if (bot.anticall === "block") return msg.reply(`Already set as : '${bot.anticall}'`, { style: "monospace" });
      await db.create({
        data: {
          anticall: "block"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.anticall
        ? msg.reply(`Changed settings to Anticall : 'block'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--reject") {
      if (bot.anticall === "reject") return msg.reply(`Already set as : '${bot.anticall}'`, { style: "monospace" });
      await db.create({
        data: {
          anticall: "reject"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.anticall
        ? msg.reply(`Changed settings to Anticall : 'reject'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--warn") {
      if (bot.anticall === "warn") return msg.reply(`Already set as : '${bot.anticall}'`, { style: "monospace" });
      await db.create({
        data: {
          anticall: "warn"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.anticall
        ? msg.reply(`Changed settings to Anticall : 'warn'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--video") {
      if (bot.anticall === "video") return msg.reply(`Already set as : '${bot.anticall}'`, { style: "monospace" });
      await db.create({
        data: {
          anticall: "video"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.anticall
        ? msg.reply(`Changed settings to Anticall : 'video'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--voice") {
      if (bot.anticall === "voice") return msg.reply(`Already set as : '${bot.anticall}'`, { style: "monospace" });
      await db.create({
        data: {
          anticall: "voice"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.anticall
        ? msg.reply(`Changed settings to Anticall : 'voice'`, { style: "monospace" })
        : msg.reply(Cg.msg.success);
      return;
    } else if (deactiveOptions.includes(option)) {
      if (!bot.anticall) return msg.reply("Already Off!", { style: "monospace" });
        await db.delete({
          key: "anticall",
          dbType: "SYSTEM"
        });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> Turn on to avoid callers to bot number.

\`\`\`OFF :\`\`\`
> Turn off to allow callers to call.

\`\`\`--REJECT :\`\`\`
> Only reject the incoming calls.

\`\`\`--BLOCK :\`\`\`
> Directly block the incoming callers. (default)

\`\`\`--WARN :\`\`\`
> Warn incoming callers ${Cg.MAX_WARNS} times before blocking.

\`\`\`--VIDEO :\`\`\`
> Allow only video callers, decline if someone is voice calling.

\`\`\`--VOICE :\`\`\`
> Allow only voice callers, decline if someone is video calling.`);
      return;
    }
  }
);

AnyaGen3(
  {
    name: "blockcmdlist",
    alias: ["listblockcmd", "listblockcommand", "blockcommandlist", "listblockcommands", "blockcommandslist", "listblockcmds", "blockcmdslist"],
    react: "🧾",
    category: "owner",
    desc: "List of public usage blocked commands.",
    filename: __filename
  },
  async (anyaGen3, msg, { bot }) => {
    const list = bot.blockCmds || [];
    const size = list.length;
    if (size > 0) {
      msg.reply(`_*There ${size > 1 ? "are" : "is only"} ${size} ${size > 1 ? "commands" : "command"} ${size > 1 ? "are" : "is"} blocked!*_\n\n${list.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\n> ${Cg.FOOTER}`);
      return;
    } else {
      msg.reply("There's no command blocked.", { style: "monospace" });
      return;
    }
  }
)

AnyaGen3(
  {
    name: "blockcmd",
    alias: ["blockcommand", "blockcommands", "blockcmds"],
    react: "✋🏻",
    category: "owner",
    rule: 1,
    desc: "No one except the owners will be able to use banned commands.",
    filename: __filename
  },
  async (anyaGen3, msg, { args, db, bot, prefix, command }) => {
    if (!args.length) {
      return msg.reply(`\`Enter some commands to block.\`\n\n_Example: ${prefix + command} ping sticker attp ..._`);
    }
    const blocked = [], alreadyBlocked = [], notExists = [], reserved = [];
    const reservedCmds = ["menu", "allmenu", "ping"];
    let update = [];
    for (const arg of args) {
      const cmdName = arg.toLowerCase();
      const cmd = plugins.find(c => c.name === cmdName || c.alias?.includes(cmdName));
      if (!cmd) {
        notExists.push(cmdName);
        continue;
      }
      if (reservedCmds.includes(cmd.name)) {
        reserved.push(cmdName);
        continue;
      }
      if (bot.blockCmds?.includes(cmd.name)) {
        alreadyBlocked.push(cmdName);
      } else {
        update.push(cmd.name);
        blocked.push(cmdName);
      }
    }
    if (update.length) {
      await db.create({
        data: { blockCmds: [...new Set([...update, ...(bot.blockCmds || [])])] },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
    }
    let response = [];
    if (blocked.length) response.push(`> _*✅ Blocked*_\n${blocked.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n")}`);
    if (alreadyBlocked.length) response.push(`> _*☑️ Already Blocked*_\n${alreadyBlocked.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n")}`);
    if (notExists.length) response.push(`> _*❌ Don't exist*_\n${notExists.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n")}`);
    if (reserved.length) response.push(`> _*📌 Reserved Commands can't be blocked*_\n${reserved.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n")}`);
    if (response.length) {
      msg.reply(response.join("\n\n"));
    }
  }
);

AnyaGen3(
  {
    name: "unblockcmd",
    alias: ["unblockcommand", "unblockcommands", "unblockcmds"],
    react: "💓",
    category: "owner",
    rule: 1,
    desc: "Unblocked the public usage blocked commands.",
    filename: __filename
  },
  async (anyaGen3, msg, { args, db, bot, prefix, command }) => {
    if (!args.length) {
      return msg.reply(`\`Enter blocked commands to unblock.\`\n\n_Example: ${prefix + command} ping sticker attp ..._\n\n> See blocked cmds using *${prefix}blockcmdlist*`);
    }
    const unblocked = [],
          alreadyUnblocked = [],
          notExists = [],
          update = [];
    for (const arg of args) {
      const cmdName = arg.toLowerCase();
      const cmd = plugins.find(c => c.name === cmdName || c.alias?.includes(cmdName));
      if (!cmd) {
        notExists.push(cmdName);
        continue;
      }
      if (!bot.blockCmds?.includes(cmd.name)) {
        alreadyUnblocked.push(cmdName);
      } else {
        update.push(cmd.name);
        unblocked.push(cmdName);
      }
    }
    if (update.length) {
      bot.blockCmds = bot.blockCmds.filter(cmd => !update.includes(cmd));
      if (bot.blockCmds.length === 0) {
        await db.delete({ key: "blockCmds", dbType: "SYSTEM" });
      } else {
        await db.create({
          data: { blockCmds: bot.blockCmds },
          dbType: "SYSTEM",
          allowUpdate: true,
          allowNew: true
        });
      }
    }
    let response = [];
    if (unblocked.length) response.push(`> _*✅ Unblocked*_\n${unblocked.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n")}`);
    if (alreadyUnblocked.length) response.push(`> _*☑️ Already Unblocked*_\n${alreadyUnblocked.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n")}`);
    if (notExists.length) response.push(`> _*❌ Don't exist*_\n${notExists.map((cmd, i) => `${i + 1}. ${cmd}`).join("\n")}`);
    if (response.length) {
      msg.reply(response.join("\n\n"));
    }
  }
);

AnyaGen3(
  {
    name: "msgread",
    alias: ["readmsg"],
    react: "📝",
    category: "owner",
    rule: 1,
    desc: "This command marks messages as seen if turned on.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args }) => {
    const bot = db.get({ dbType: "SYSTEM" });
    const option = args[0]?.toLowerCase() || null;
    if (option === "on") {
        if (bot.readMsg) return msg.reply(`Already On and set as : '${bot.readMsg}'`, { style: "monospace" });
        await db.create({
            data: {
                readMsg: "all"
            },
            dbType: "SYSTEM",
            allowUpdate: true,
            allowNew: true
        });
        msg.reply(Cg.msg.success);
        return;
    } else if (option === "--all") {
        if (bot.readMsg === "all") return msg.reply(`Already set as : '${bot.readMsg}'`, { style: "monospace" });
        await db.create({
            data: {
                readMsg: "all"
            },
            dbType: "SYSTEM",
            allowUpdate: true,
            allowNew: true
        });
        bot.readMsg === "cmd"
            ? msg.reply(`Changed settings to ReadMsg : 'all'`, { style: "monospace" })
            : msg.reply(Cg.msg.success);
        return;
    } else if (option === "--cmd") {
        if (bot.readMsg === "cmd") return msg.reply(`Already set as : '${bot.readMsg}'`, { style: "monospace" });
        await db.create({
            data: {
                readMsg: "cmd"
            },
            dbType: "SYSTEM",
            allowUpdate: true,
            allowNew: true
        });
        bot.readMsg === "all"
            ? msg.reply(`Changed settings to ReadMsg : 'cmd'`, { style: "monospace" })
            : msg.reply(Cg.msg.success);
        return;
    } else if (option === "off") {
        if (!bot.readMsg) return msg.reply("Already Off!", { style: "monospace" });
        await db.delete({
            key: "readMsg",
            dbType: "SYSTEM"
        });
        msg.reply(Cg.msg.success);
        return;
    } else {
        msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> Turn on reading messages.

\`\`\`OFF :\`\`\`
> Turn off reading messages.

\`\`\`--ALL :\`\`\`
> Read all messages. (default)

\`\`\`--CMD :\`\`\`
> Read only command messages.`);
        return;
    }
  }
)

AnyaGen3(
  {
    name: "reactcmd",
    alias: ["cmdreact"],
    react: "❤️",
    category: "owner",
    rule: 1,
    desc: "Using this command owner can change reaction on commands settings.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, bot, prefix, command }) => {
    const option = args[0]?.toLowerCase() || null;
    if (option === "on") {
      if (bot.reactCmd !== "off") return msg.reply(`Already On and set as : '${bot.reactCmd}'`, { style: "monospace" });
      await db.create({
        data: {
          reactCmd: "cmd"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (option === "--cmd") {
      if (bot.reactCmd === "cmd") return msg.reply(`Already set as : '${bot.reactCmd}'`, { style: "monospace" });
      await db.create({
        data: {
          reactCmd: "cmd"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.reactCmd !== "off"
      ? msg.reply(`Changed settings to ReactCmd : 'cmd'`, { style: "monospace" })
      : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--theme") {
      if (bot.reactCmd === "theme") return msg.reply(`Already set as : '${bot.reactCmd}'`, { style: "monospace" });
      await db.create({
        data: {
          reactCmd: "theme"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.reactCmd !== "off"
      ? msg.reply(`Changed settings to ReactCmd : 'theme'`, { style: "monospace" })
      : msg.reply(Cg.msg.success);
      return;
    } else if (option === "--set") {
      const isEmojiSet = /[\p{Emoji}]/u.test(bot.reactCmd);
      //if (isEmojiSet) return msg.reply(`Already set as : '${bot.reactCmd}'`, { style: "monospace" });
      if (!args[1]) return msg.reply(`\`\`\`Example : ${prefix + command} ${option} 🦋\`\`\`${isEmojiSet ? `\n> Current emoji : ${bot.reactCmd}` : ""}`);
      if (!/[\p{Emoji}]/u.test(args[1])) return msg.reply(`Hmm... "${args[1]}" is not looking like an emoji.`, { style: "monospace" });
      await db.create({
        data: {
          reactCmd: args[1]
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      bot.reactCmd !== "off"
      ? msg.reply(`Changed settings to ReactCmd : '${args[1]}'`, { style: "monospace" })
      : msg.reply(Cg.msg.success);
      return;
    } else if (option === "off") {
      if (bot.reactCmd === "off") return msg.reply("Already Off!", { style: "monospace" });
      await db.create({
        data: {
          reactCmd: "off"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> Turn on command reactions.

\`\`\`OFF :\`\`\`
> Turn off command reactions.

\`\`\`--CMD :\`\`\`
> React using emoji set for commands. (default)

\`\`\`--THEME :\`\`\`
> React commands using only ${Cg.THEME_EMOJI}.

\`\`\`--SET :\`\`\`
> Set emoji to react every command using that emoji.`);
        return;
    }
  }
);

AnyaGen3(
  {
    name: "prefix",
    react: "🧩",
    category: "owner",
    rule: 1,
    desc: "Using this command owner can set/change prefix symbols and settings.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, bot, prefix, command }) => {
    const option = args[0]?.toLowerCase() || null;
    const split_prefix = bot.prefix.split("+");
    if (option === "all") {
      if (split_prefix[0] === "all") return msg.reply("Already using All Prefix Mode.", { style: "monospace" });
      await db.create({
        data: {
          prefix: "all" + (split_prefix[1] ? "+" + split_prefix[1] : "")
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (/multi/.test(option)) {
      if (split_prefix[0] === "multi") return msg.reply("Already using Multi Prefix Mode.", { style: "monospace" });
      await db.create({
        data: {
          prefix: "multi" + (split_prefix[1] ? "+" + split_prefix[1] : "")
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (option === "single") {
      if (split_prefix[0] === "single") return msg.reply("Already using Single Prefix Mode.", { style: "monospace" });
      await db.create({
        data: {
          prefix: "single" + (split_prefix[1] ? "+" + split_prefix[1] : "")
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (option === "--set") {
      const isCustom = bot.prefix.includes("+");
      if (!args[1]) return msg.reply(`\`\`\`Example : ${prefix + command} ${option} #\`\`\`${isCustom ? `\n> Current prefix : "${bot.prefix.split("+")[1]}"` : ""}`);
      if (args[1].includes("@") || !/^[^\w\d\s]$/.test(args[1])) return msg.reply(`"${args[1]}" is not a valid prefix to set.`, { style: "monospace" });
      if (args[1] === Cg.BOT_PREFIX) return msg.reply("This prefix is already in use in Single Prefix Mode.", { style: "monospace" });
      await db.create({
        data: {
          prefix: `${bot.prefix.split("+")[0]}+${args[1]}`
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      let jsonData;
      const data = fs.readFileSync('./database/runtime.json', 'utf-8');
      jsonData = data ? JSON.parse(data) : {};
      jsonData.BOT_PREFIX = args[1];
      fs.writeFileSync('./database/runtime.json', JSON.stringify(jsonData, null, 2), 'utf-8');
      msg.reply(`${Cg.msg.success}\n> ℹ️ Only usable in 'single prefix mode'`);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ALL :\`\`\`
> Bot will response on every prefix, including no prefix.

\`\`\`MULTI :\`\`\`
> Bot will response on every prefix, except no prefix. (default)

\`\`\`SINGLE :\`\`\`
> Bot will response only using "${Cg.BOT_PREFIX}" prefix.

\`\`\`--SET :\`\`\`
> Change prefix, being used in single prefix mode.`);
        return;
    }
  }
)

AnyaGen3(
  {
    name: "worktype",
    react: "🌟",
    category: "owner",
    rule: 1,
    desc: "Using this command owner can set who and where can be the bot used.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, bot, prefix, command }) => {
    const option = args[0]?.toLowerCase() || null;
    if (option === "public") {
      if (/public/.test(bot.worktype)) return msg.reply("Public mode already enabled!", { style: "monospace" });
      await db.create({
        data: {
          worktype: "public"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (option === "private" || option === "self") {
      if (/private|self/.test(bot.worktype)) return msg.reply("Private mode already enabled!", { style: "monospace" });
      await db.create({
        data: {
          worktype: "private"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (option === "onlyadmin" || option === "onlyadmins") {
      if (/onlyadmin/.test(bot.worktype)) return msg.reply("OnlyAdmin mode already enabled!", { style: "monospace" });
      await db.create({
        data: {
          worktype: "onlyadmin"
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`PRIVATE :\`\`\`
> Only owner, co-owners & bot number itself can use this bot.

\`\`\`PUBLIC :\`\`\`
> Anyone can use this bot.

\`\`\`ONLYADMIN\`\`\`
> Just like private mode but group admins can also use this bot.`);
      return;
    }
  }
)

AnyaGen3(
  {
    name: "suggestcmd",
    alias: ["similarcmd", "showsimilar"],
    react: "🍒",
    category: "owner",
    rule: 1,
    desc: "When enabled this feature will show user similar commands if any user typed a wrong command name, not usable in all prefix mode.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, bot, prefix, command }) => {
    const option = args[0]?.toLowerCase() || null;
    if (activeOptions.includes(option)) {
      if (bot.showSimilar) return msg.reply("Already Enabled!", { style: "monospace" });
      await db.create({
        data: {
          showSimilar: true
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      if (bot.prefix === "all") msg.reply("ℹ️ Not gonna work in 'All Prefix' mode.", { style: "italic" });
      msg.reply(Cg.msg.success);
      return;
    } else if (deactiveOptions.includes(option)) {
      if (!bot.showSimilar) return msg.reply("Already Deactivated!", { style: "monospace" });
      await db.delete({
        key: "showSimilar",
        dbType: "SYSTEM"
      });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> If you type a wrong command name, bot will suggest you similar commands. (default)

\`\`\`OFF :\`\`\`
> Bot will not suggest any wrong command.`);
      return;
    }
  }
)

AnyaGen3(
  {
    name: "premium",
    react: "🌟",
    category: "owner",
    rule: 1,
    desc: "Limited access only of premium commands to the users.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, bot, prefix, command }) => {
    const option = args[0]?.toLowerCase() || null;
    if (activeOptions.includes(option)) {
      if (bot.premium) return msg.reply("Already Enabled!", { style: "monospace" });
      await db.create({
        data: {
          premium: true
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (deactiveOptions.includes(option)) {
      if (!bot.premium) return msg.reply("Already Deactivated!", { style: "monospace" });
      await db.delete({
        key: "premium",
        dbType: "SYSTEM"
      });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> Users can use premium commands only ${Cg.DEFAULT_PREMIUM_CREDITS} times in every ${Cg.PREMIUM_RESET_TIME} hours. (default)

\`\`\`OFF :\`\`\`
> No limit even in premium commands.`);
      return;
    }
  }
)

AnyaGen3(
  {
    name: "cooldown",
    react: "🌟",
    category: "owner",
    rule: 1,
    desc: "Cooldown rest timer after every command usage.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, args, bot, prefix, command }) => {
    const option = args[0]?.toLowerCase() || null;
    if (activeOptions.includes(option)) {
      if (bot.cooldown) return msg.reply("Already Enabled!", { style: "monospace" });
      await db.create({
        data: {
          cooldown: true
        },
        dbType: "SYSTEM",
        allowUpdate: true,
        allowNew: true
      });
      msg.reply(Cg.msg.success);
      return;
    } else if (deactiveOptions.includes(option)) {
      if (!bot.cooldown) return msg.reply("Already Deactivated!", { style: "monospace" });
      await db.delete({
        key: "cooldown",
        dbType: "SYSTEM"
      });
      msg.reply(Cg.msg.success);
      return;
    } else {
      msg.reply(`\`\`\`OPTIONS :\`\`\`

\`\`\`ON :\`\`\`
> Users have to wait to re-use any command individually.

\`\`\`OFF :\`\`\`
> No wait/cooldown for any command. (default)`);
      return;
    }
  }
)