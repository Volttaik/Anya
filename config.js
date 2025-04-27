import fs from "node:fs";
import path from "node:path";
const json = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const filePath = path.resolve("./database/runtime.json");
let db = {};
function loadConfig() { try { const rawData = fs.readFileSync(filePath, "utf-8"); db = JSON.parse(rawData || "{}"); } catch (err) { console.error("Error reading runtime.json:", err); db = {}; } }
loadConfig();
fs.watchFile(filePath, () => { console.log("runtime.json updated! Reloading config..."); loadConfig(); });

export default {
  BOT_NAME: process.env.BOT_NAME || "Queen Anya",
  get FOOTER() { return (process.env.FOOTER || "") || this.BOT_NAME; },
  get BOT_PREFIX() { return db.BOT_PREFIX || process.env.BOT_PREFIX || "/"; },
  OWNER_NAME: process.env.OWNER_NAME || "Pika~Kun",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "916900904828",
  get STICKER_PACK_NAME() { return (process.env.STICKER_PACK_NAME || "𝕼𝖚𝖊𝖊𝖓 𝕬𝖓𝖞𝖆 𝕭𝖔𝖙 🪀") || this.BOT_NAME; },
  get STICKER_AUTHOR_NAME() { return (process.env.STICKER_AUTHOR_NAME || "𝕻𝖎𝖐𝖆𝕭𝖔𝖙𝖟 𝕴𝖓𝖈. 🥵") || this.OWNER_NAME; },
  COOLDOWN_TIMER: Number(process.env.COOLDOWN_TIMER) || 5,
  THEME_EMOJI: process.env.THEME_EMOJI || "🦋",
  SESSION_ID: process.env.SESSION_ID || "",
  DATABASE_URL: process.env.DATABASE_URL || "",
  PORT: Number(process.env.PORT) || 8080,
  VERSION: json.version || "3.0.0",
  REPORT_TO_DEV: process.env.REPORT_TO_DEV || true,
  MAX_WARNS: Number(process.env.MAX_WARNS) || 3,
  PREMIUM_RESET_TIME: Number(process.env.PREMIUM_RESET_TIME) || 12, // hours
  DEFAULT_PREMIUM_CREDITS: Number(process.env.DEFAULT_PREMIUM_CREDITS) || 10,
  LOGO: db.LOGO || fs.readFileSync("./assets/LOGO.jpg"),
  THUMBNAIL: db.THUMBNAIL || fs.readFileSync("./assets/THUMBNAIL.jpg"),
  PRO_MODE: process.env.PRO_MODE || false,
  PIKABOTZ_API_URL: process.env.PIKABOTZ_API_URL || "https://pikabotzapi.vercel.app",
  PIKABOTZ_API_KEY: process.env.PIKABOTZ_API_KEY || "anya-md",
  msg: {
    wait: "```Wait Processing Your Request.```",
    success: "```Task Completed Successfully!```",
    error: "```Oh! An unexpected error occurred!```",
    banned: "```You're Banned From Using This Bot.```",
    gcBanned: "```This Group Is Banned From Using This Bot!```",
    bannedCmd_user: "```Sorry, this command is banned for you.```",
    bannedCmd_group: "```Nope! This command is banned in this group chat!```",
    bannedPremium_user: "```You're banned from using premium commands!```",
    blockedCmd: "```This command is blocked for all users.```",
    isMod: "```You're not an owner to use this command!```",
    isAdmin: "```This command is only for admins!```",
    isBotAdmin: "```Bot should be an admin to use this command!```",
    group: "```Group is required! To use this command.```",
    private: "```This command is only usable for private chats!```",
    channel: "Not a channel",
    expired_premium: "```You have no premium credits to use this command.```",
    pro_mode_disabled: "```Can't use this command, because pro mode is not enabled in this bot!```"
  }
};