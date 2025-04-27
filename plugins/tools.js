import fs from "node:fs";
import path from "node:path";
import Cg from "../config.js";
import { AnyaGen3 } from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import bgRemove from "../lib/image-processing/remove-background.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AnyaGen3({
  on: "category",
  category: "tools",
  category_symbol: "📐",
  commands_symbol: "⚗️",
  category_desc: "This category includes the commands used for utilities works."
});

AnyaGen3(
  {
    name: "rembg",
    alias: ["removebg", "bgremove", "bgrem"],
    react: "🪃",
    category: "tools",
    usage: "image",
    premium: true,
    exp: 40,
    desc: "Remove/Replace/Add image's background.",
    filename: __filename
  },
  async (anyaGen3, msg, { args }) => {
    let trim, doc, background, image;
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    const flags = msg.quoted && msg.quoted.text ? msg.quoted.text : args.length > 0 ? args.join(" ") : null;      
    if (flags) {
        const bgMatch = flags.match(/--bg=([^\s]+)/);
        if (flags.toLowerCase().includes("--trim")) trim = true;
        if (flags.toLowerCase().includes("--doc")) doc = true;
        if (bgMatch) background = bgMatch[1];
    }
    if (
        msg.quoted &&
        /image/.test(msg.quoted.type) &&
        /image/.test(msg.type) &&
        !/webp/.test(msg.quoted.type) &&
        !/webp/.test(msg.type)
    ) background = await msg.quoted.download({});
    if (/image/.test(mime) && !/webp/.test(mime)) {
      const key = await msg.reply(Cg.msg.wait + "\n> ⚠️ Heavy model, bot may delay commands.");
      if (Buffer.isBuffer(background)) image = await msg.download({ save: true });
      else image = await quoted.download({ save: true });
      bgRemove({ image, trim, background })
        .then(response => {
          let caption = `> ${Cg.BOT_NAME}`;
          if (response.message === "invalid.color") caption = "> ⚠️ Invalid background format provided";
          if (doc) anyaGen3.sendMessage(
            msg.chat, 
            {
                fileName: `NO_BG_${Date.now()}.png`,
                document: response.buffer,
                mimetype: "image/png",
                caption
            }, 
            { quoted: msg }
          ).then(() => msg.delete(key.key));
          else anyaGen3.sendMessage(
            msg.chat, 
            { image: response.buffer, caption }, 
            { quoted: msg }
          ).then(() => msg.delete(key.key));
          fs.promises.unlink(image);
        });
        return { usePremiumCredit: 1 };
    } else {
      msg.reply(`\`➤ Send/tag an image to proceed.\`

\`OPTIONS :\`

\`\`\`--doc :\`\`\`
> Download the result as document.

\`\`\`--trim :\`\`\`
> Trim the extra transparent area.

\`\`\`--bg=COLOR_NAME :\`\`\`
> Provide a colour name or hex colour code for the background.
> Or, send an image while tagging another image to replace the background.`);
    }
  }
);