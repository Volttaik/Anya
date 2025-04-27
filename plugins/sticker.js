import Cg from "../config.js";
import {
    AnyaGen3,
    func,
    convert
} from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import gen_attp from "../lib/canvas/maker_attp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AnyaGen3({
  on: "category",
  category: "sticker",
  category_symbol: "🪼",
  commands_symbol: "🍡",
  category_desc: "This category includes the commands used for various sticker generators."
});

AnyaGen3(
  {
    name: "sticker",
    alias: [
        "s",
        "stick",
        "webp",
        "take",
        "steal"
    ],
    react: "✨",
    category: "sticker",
    exp: 30,
    desc: "Convert images/videos/GIFs into stickers.",
    filename: __filename
  },
  async (anyaGen3, msg, { args }) => {
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    let crop, circle;
    if (/image|video|sticker/.test(mime)) {
      if (quoted.seconds > 9) return msg.reply("Max video duration can be 9 seconds.", { style: "monospace" });
      const options = args?.join(" ")?.toLowerCase();
      if (options.includes("--crop")) crop = true;
      if (options.includes("--circle")) circle = true;
      if (options.includes("--crop") && /sticker/.test(mime)) msg.reply(`ℹ️ 'Crop' command is unavailable for ${mime.split("Message")[0]}s.`, { style: "italic" });
      if (options.includes("--circle") && /video|sticker/.test(mime)) msg.reply(`ℹ️ 'Circle' command is unavailable for ${mime.split("Message")[0]}s.`, { style: "italic" });
      const hasMeta = args
        ?.map(arg => arg.toLowerCase())
        .filter(arg => arg !== "--crop" && arg !== "--circle")
        .join(" ")
        .trim() || false;
      const packname = hasMeta ? hasMeta.split("|")?.[0]?.trim() : Cg.STICKER_PACK_NAME;
      const author = hasMeta ? hasMeta.includes("|") ? (hasMeta.split("|")[1]?.trim() || "") : "" : Cg.STICKER_AUTHOR_NAME;
      const media = await quoted.download({});
      if (/sticker/.test(mime)) {
        convert.addExifToSticker(media, packname, author)
          .then(sticker => {
            if (!sticker) return msg.reply(`This sticker is unsupported!`, { style: "monospace" });
            anyaGen3.sendMessage(msg.chat, { sticker }, { quoted:msg });
          });
      } else {
        convert.convertToWebp(media, { crop, circle, packname, author })
          .then(sticker => {
            if (!sticker) return msg.reply(`This ${mime.split("Message")[0]} is unsupported!`, { style: "monospace" });
            anyaGen3.sendMessage(msg.chat, { sticker }, { quoted:msg });
          });
      }
    } else {
      msg.reply(`\`➤ Send/tag an image/video/sticker to proceed.\`

\`OPTIONS :\`

\`\`\`--CROP :\`\`\`
> Get cropped 1:1 size stickers.

\`\`\`--CIRCLE :\`\`\`
> Get circle cutout stickers.

\`\`\`PACKNAME | AUTHOR:\`\`\`
> Put pack and author name, e.g.: '𝕼𝖚𝖊𝖊𝖓 𝕬𝖓𝖞𝖆 𝕾𝖙𝖎𝖈𝖐𝖊𝖗𝖘 🪀 | @𝕻𝖎𝖐𝖆𝕭𝖔𝖙𝖟 🥵'`);
      return;
    }
  }
)

AnyaGen3(
  {
    name: "attp",
    alias: ["attps"],
    react: "🌈",
    category: "sticker",
    exp: 30,
    desc: "Convert texts into colourfull text stickers.",
    filename: __filename
  },
  async (anyaGen3, msg, { args }) => {
    if (args[0]) {
      let speed, font, fontColor, background;
      const flags = args.join(" ").toLowerCase();
      speed = flags.match(/--s=(\d+)/);
      speed = speed ? Math.max(10, Math.min(500, Number(speed[1]))) : 100;
      font = flags.match(/--f=([^\s]+)/);
      font = font ? font[1] : "font1";
      fontColor = flags.match(/--fc=([^\s]+)/);
      if (fontColor) fontColor = fontColor[1];
      background = flags.match(/--bg=([^\s]+)/);
      background = background ? background[1] : "transparent";
      const text = args
        ?.filter(arg => !/^--(s|f|fc|bg)(=.*)?$/i.test(arg.toLowerCase()))
        .join(" ")
        .trim() || false;
      if (!text) return msg.reply("Enter some texts also!", { style: "monospace" });
      gen_attp({
        text,
        speed,
        background,
        font,
        fontColor,
        output: "webp"
      })
      .then(({ buffer, type }) => {
        if (!buffer || (type !== "image/webp" && type !== "image/png")) {
            return msg.reply("Unexpectedly 'ATTP' creation failed!", { style: "monospace" });
        }
        if (type === "image/png") {
            return convert.convertToWebp(buffer, { packname: Cg.STICKER_PACK_NAME, author: Cg.STICKER_AUTHOR_NAME })
            .then(sticker => {
                if (!sticker) return msg.reply("This png is unsupported!", { style: "monospace" });
                anyaGen3.sendMessage(msg.chat, { sticker }, { quoted: msg });
            });
        } 
        return convert.addExifToSticker(buffer, Cg.STICKER_PACK_NAME, Cg.STICKER_AUTHOR_NAME)
        .then(sticker => {
            if (!sticker) return msg.reply("This sticker is unsupported!", { style: "monospace" });
            anyaGen3.sendMessage(msg.chat, { sticker }, { quoted: msg });
        });
      });
    } else {
      msg.reply(`\`➤ Enter some texts to proceed.\`

\`OPTIONS :\`

\`\`\`--S=100 :\`\`\`
> Control sticker speed in ms, min is 10, max is 500.

\`\`\`--F=font1 ... font7\`\`\`
> Choose a font from font1 to font7.

\`\`\`--FC=COLOR_NAME :\`\`\`
> Provide a colour name or hex colour code for the font displayed.

\`\`\`--bg=COLOR_NAME :\`\`\`
> Provide a colour name or hex colour code for the background.`);
      return;
    }
  }
)

AnyaGen3(
  {
    name: "ttp",
    alias: ["ttps"],
    react: "✨",
    category: "sticker",
    exp: 30,
    desc: "Convert texts into single colour text stickers.",
    filename: __filename
  },
  async (anyaGen3, msg, { args }) => {
    if (args[0]) {
      const colors = [
        "red", "blue", "green", "yellow", "orange",
        "pink", "black", "white", "cyan", "magenta",
        "lime", "violet", "gold"
      ];
      let font, fontColor, background;
      const flags = args.join(" ").toLowerCase();
      font = flags.match(/--f=([^\s]+)/);
      font = font ? font[1] : "font1";
      fontColor = flags.match(/--fc=([^\s]+)/);
      fontColor = fontColor ? fontColor[1] : func.pickRandom(colors);
      background = flags.match(/--bg=([^\s]+)/);
      background = background ? background[1] : "transparent";
      const text = args
        ?.filter(arg => !/^--(f|fc|bg)(=.*)?$/i.test(arg.toLowerCase()))
        .join(" ")
        .trim() || false;
      if (!text) return msg.reply("Enter some texts also!", { style: "monospace" });
      gen_attp({
        text,
        background,
        font,
        fontColor
      })
      .then(({ buffer, type }) => {
        if (!buffer || type !== "image/png") {
            return msg.reply("Unexpectedly 'TTP' creation failed!", { style: "monospace" });
        }
        convert.convertToWebp(buffer, { packname: Cg.STICKER_PACK_NAME, author: Cg.STICKER_AUTHOR_NAME })
        .then(sticker => {
            if (!sticker) return msg.reply("This png is unsupported!", { style: "monospace" });
            anyaGen3.sendMessage(msg.chat, { sticker }, { quoted: msg });
        });        
      });
    } else {
      msg.reply(`\`➤ Enter some texts to proceed.\`

\`OPTIONS :\`

\`\`\`--F=font1 ... font7\`\`\`
> Choose a font from font1 to font7.

\`\`\`--FC=COLOR_NAME :\`\`\`
> Provide a colour name or hex colour code for the font displayed.

\`\`\`--bg=COLOR_NAME :\`\`\`
> Provide a colour name or hex colour code for the background.`);
      return;
    }
  }
)