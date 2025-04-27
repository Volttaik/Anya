import Cg from "../config.js";
import { AnyaGen3 } from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import disneyLogo from "../lib/canvas/logo_disney.js";
import disneyLogo2 from "../lib/canvas/logo_disney2.js";

const __filename = fileURLToPath(import.meta.url);

AnyaGen3({
  on: "category",
  category: "design",
  category_symbol: "🌠",
  commands_symbol: "✴️",
  category_desc: "This category includes the commands used for generating various logos."
});

AnyaGen3(
  {
    name: "disneylogo",
    react: "🌠",
    category: "design",
    usage: "text",
    exp: 30,
    desc: "Generate Walt Disney's Logo Using Texts",
    filename: __filename
  },
  async (anyaGen3, msg, { args }) => {
    const text = msg.quoted ? msg.quoted.text ? msg.quoted.text : args[0] ? args.join(" ") : null : args[0] ? args.join(" ") : null;
    if (!text) return msg.reply("Nope! Text is required!", { style: "monospace" });
    disneyLogo({ text })
    .then(image => {
      anyaGen3.sendMessage(msg.chat, {
        image,
        caption: `> ${Cg.BOT_NAME}`
      }, { quoted:msg });
    });
  }
);

AnyaGen3(
  {
    name: "disneylogo2",
    react: "🌠",
    category: "design",
    usage: "text1|text2",
    exp: 30,
    desc: "Generate Disney+ hotstar Logo Using two texts",
    filename: __filename
  },
  async (anyaGen3, msg, { args }) => {
    const text = msg.quoted ? msg.quoted.text ? msg.quoted.text : args[0] ? args.join(" ") : null : args[0] ? args.join(" ") : null;
    if (!text || !text.includes("|")) return msg.reply("Enter two words seprated by \"|\"\nLike : text1|text2", { style: "monospace" });
    const [text1, text2] = text.split("|");
    if (!text1 || !text2) return msg.reply(`${text1 ? "Text2" : "Text1"} is not entered!`, { style: "monospace" });
    disneyLogo2({ text1, text2 })
    .then(image => {
      anyaGen3.sendMessage(msg.chat, {
        image,
        caption: `> ${Cg.BOT_NAME}`
      }, { quoted:msg });
    });
  }
);