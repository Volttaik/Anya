import Cg from "../config.js";
import { AnyaGen3, func, plugins, stylish_font } from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AnyaGen3(
    {
        on: "category",
        category: "system",
        category_symbol: "💻",
        commands_symbol: "⚙️",
        category_desc: "The System category includes commands for managing and monitoring the bot's core functions, available to authorized users."     
    }
)

AnyaGen3(
  {
    name: "alive",
    react: "☀️",
    category: "system",
    desc: "Bot will greet with message if it's alive.",
    filename: __filename
  },
  async (anyaGen3, msg, { db, bot }) => {
    if (bot.sleep) {
      await db.delete({
        key: "sleep",
        dbType: "SYSTEM"
      });
    }
    const message = `\`\`\`${Cg.THEME_EMOJI} ${Cg.BOT_NAME.toUpperCase().split("").join(" ")} ${Cg.THEME_EMOJI}\`\`\`\n
\`${bot.sleep ? "I'm Alive Now!" : "I'm Already Alive!"}\`
> _UPTIME : ${func.secondsToDHMS(process.uptime())}_`;
    msg.reply(message);
  }
);

AnyaGen3(
  {
    name: "menu",
    alias: ["h", "help", "panel"],
    react: Cg.THEME_EMOJI,
    category: "system",
    exp: 10,
    desc: "List of all command categories and their names.",
    filename: __filename
  },
  async (anyaGen3, msg, { args, db, bot, user, prefix }) => {
    let caption = "";
    if (args[0]) {
        const selected = args[0].toLowerCase();
        const cmd = plugins.find((c) => c.name === selected || (c.alias && c.alias.includes(selected)));
        if (cmd) {
            let caption = `\`❒ | NAME     :\` ${cmd.name}\n\n`;
            caption += `\`❒ | ALIAS    :\` ${cmd.alias?.join(", ") || "```...```"}\n\n`;
            caption += `\`❒ | USAGE    :\` ${cmd.usage || "```...```"}\n\n`;
            caption += `\`❒ | REACT    :\` ${cmd.react || "```...```"}\n\n`;
            caption += `\`❒ | EXP      :\` ${cmd.exp || "```...```"}\n\n`;
            caption += `\`❒ | CATEGORY :\` ${cmd.category || "others"}\n\n`;
            caption += `\`❒ | PRO      :\` ${cmd.pro ? "yes" : "no"}\n\n`;
            caption += `\`❒ | PREMIUM  :\` ${cmd.premium ? "yes" : "no"}\n\n`;
            caption += `\`❒ | COOLDOWN :\` ${cmd.cooldown || Cg.COOLDOWN_TIMER}sec\n\n`;
            caption += `\`❒ | DESC     :\` ${cmd.desc || "```...```"}\n\n`;
            caption += `\`❒ | PATH     :\` ${cmd.filename || "```...```"}\n\n`;
            caption += "> " + Cg.FOOTER;
            anyaGen3.sendMessage(msg.chat, {
                image: { url: "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=" + args[0] },
                caption 
            }, { quoted:msg });
            return;
        } else return msg.reply(`❌ No such '${selected}' command exists.`, { style: "monospace" });
    }
    const __cmds = {};
    plugins.forEach(p => {
        if (p.category && p.name) {
            if (!__cmds[p.category]) {
                __cmds[p.category] = [];
            }
            __cmds[p.category].push(`${prefix}${p.name.toUpperCase()}${p.premium ? " ⟮🌟⟯" : ""}${p.pro ? " ⟮⚡⟯" : ""}`);
        }
    });
    Object.keys(__cmds).forEach(category => {
        __cmds[category].sort();
    });
    const resourcesUsage = await func.resourcesUsage(false);
    caption += `༺──────▢ ${stylish_font("BOT", "font102")} ▢──────༻\n`;
    caption += `\`▢ PREFIX  :\` ${prefix}\n`;
    caption += `\`▢ PREFIX M:\` ${bot.prefix.split("+")[0]} prefix\n`;
    caption += `\`▢ BOT     :\` ${Cg.BOT_NAME}\n`;
    caption += `\`▢ USER    :\` ${user.name || msg.pushName}\n`;
    caption += `\`▢ OWNER   :\` ${Cg.OWNER_NAME}\n`;
    caption += `\`▢ WORKTYPE:\` ${bot.worktype}\n`;
    caption += `\`▢ PLUGINS :\` ${plugins.filter(p => p.name && p.category).length}\n`;
    caption += `\`▢ PRO     :\` ${Cg.PRO_MODE ? "✅" : "off"}\n`;
    caption += `\`▢ PREMIUM :\` ${bot.premium ? "✅" : "off"}\n`;
    caption += `\`▢ VERSION :\` ${Cg.VERSION}\n`;
    caption += `\`▢ RAM     :\` ${resourcesUsage.RAM.used.value + " " + resourcesUsage.RAM.used.unit}/${resourcesUsage.RAM.usable.value + " " + resourcesUsage.RAM.usable.unit}\n`;
    caption += `༺──────▢ ${stylish_font("Q.A.3", "font102")} ▢──────༻\n\n`;
    caption += "\n```⚡ = Pro mode required\n";
    caption += "🌟 = Premiums required```\n\n\n";
    caption += Object.entries(__cmds)
    .map(([category, commands]) => `> _*${category?.toUpperCase()}*_
\`\`\`╭┬──────────────────⟞
┴│
»│ ${commands.join("\n»│ ")}
┬│
╰┴──────────────────⟞\`\`\``).join("\n\n");
    caption += "\n\n_ℹ️ To get plugin's info type :_\n";
    caption += `_${prefix === "" ? Cg.BOT_PREFIX : prefix}help <command_name>_\n\n`;
    caption += "_ℹ️ To report bugs and errors, type :_\n";
    caption += `_${prefix === "" ? Cg.BOT_PREFIX : prefix}report <error_details>_`;
    const type = db.get({ dbType: "UI" })?.allmenu?.type || "text";
    if (type === "text") {
        anyaGen3.sendMessage(msg.chat, {
            text: caption 
        }, { quoted:msg });
        return;
    } else if (type === "image") {
        anyaGen3.sendMessage(msg.chat, {
            image: Cg.THUMBNAIL,
            caption
        }, { quoted:msg });
        return;
    } else if (type === "video") {
    } else if (type === "gif") {
    } else if (type === "adimage") {
    } else if (type === "adimage2") {
    } else {
        msg.reply(`Err! Unknown 'allmenu' message type defined : ${type}`, { style: "monospace" });
        return;
    }
  }
);