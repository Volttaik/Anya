import Cg from "../config.js";
import { exec } from "child_process";
import {
  AnyaGen3,
  func
} from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import genUptime from "../lib/canvas/system_uptime.js";

const __filename = fileURLToPath(import.meta.url);

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
    name: "ping",
    alias: ["speed"],
    react: "📍",
    category: "system",
    desc: "Get realtime processing speed of the bot.",
    filename: __filename
  },
  async (anyaGen3, msg) => {
    const key = await msg.reply("•••", { style: "monospace" });
    const start = process.hrtime();
    exec('neofetch --stdout', async (error, stdout) => {
        const diff = process.hrtime(start);
        const latency = (diff[0] * 1000 + diff[1] / 1e6).toFixed(1);
        msg.edit({
            text: `${Cg.THEME_EMOJI}Pong ${latency}ms`,
            style: "monospace",
            key: key.key
        });
    });
  }
)

AnyaGen3(
  {
    name: "uptime",
    alias: ["runtime"],
    react: "⏳",
    category: "system",
    desc: "Get realtime uptime of the bot.",
    filename: __filename
  },
  async (anyaGen3, msg) => {
    const uptime = process.uptime();
    const d = Math.floor(uptime / 86400);
   	const h = Math.floor((uptime % 86400) / 3600);
	const m = Math.floor((uptime % 3600) / 60);
	const s = Math.floor(uptime % 60);
	const bg = await anyaGen3.profilePictureUrl(msg.sender, 'image').catch(() => null);
	genUptime({ d, h, m, s, bg, emoji: Cg.THEME_EMOJI })
	.then(image => {
	    anyaGen3.sendMessage(msg.chat, {
	        image,
	        caption: `\`\`\`« ${func.secondsToDHMS(process.uptime())} »\`\`\``
	    }, { quoted:msg });
	});
  }
)
