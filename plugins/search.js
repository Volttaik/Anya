import Cg from "../config.js";
import {
    AnyaGen3,
    func
} from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AnyaGen3({
  on: "category",
  category: "search",
  category_symbol: "🔎",
  commands_symbol: "🌐",
  category_desc: "This category includes the commands used for images/videos/data search on the internet."
});

AnyaGen3(
  {
    name: "4kwallpapers",
    alias: ["4kwallpaper", "4kwall"],
    react: "🌟",
    usage: "text",
    category: "search",
    exp: 30,
    cooldown: 10,
    premium: true,
    desc: "Search high quality anime wallpapers from 4kwallpapers.com.",
    filename: __filename
  },
  async (anyaGen3, msg, { args }) => {
    if (args[0]) {
      const flags = args.join(" ").toLowerCase();
      const query = args
        ?.filter(arg => !/^--(links|link|doc|c)(=.*)?$/i.test(arg.toLowerCase()))
        .join(" ")
        .trim() || false;
      if (!query) return msg.reply("Enter some queries also!", { style: "monospace" });
      const res = await fetch(`${Cg.PIKABOTZ_API_URL}/search/4kwallanime/v2/?apikey=${Cg.PIKABOTZ_API_KEY}&query=${query}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { data } = await res.json();
      if (!data.status) return msg.reply("4kWallpapers API is not available at this moment, please try again later.", { style: "monospace" });
      if (data.code === 200 && data.totalFound === 0) return msg.reply("No Results Found!", { style: "monospace" });
      let min = 1, max;
      max = flags.match(/--c=(\d+)/);
      max = max ? Math.max(min, Math.min(10, Number(max[1]))) : 3;     
      if (flags.includes("--link")) {
        let caption = "";
        for (let i of data.wallpapers) {
          if (min > max) break;
          caption += `\`${min}. ${i.title}\`\n`;
          caption += `> ${i.highestResLink.resolution}\n`;
          caption += `> ${i.highestResLink.url}\n\n`;
          //    i.downloadLinks.forEach(link => {
          //      caption += `\`\`\`QUALITY : ${link.resolution}\n`;
          //      caption += `Url     : ${link.url}\`\`\`\n\n`;
          //    });
          min++;
        }
        msg.reply(caption + `> ${Cg.FOOTER}`);
        return { usePremiumCredit: 1 };
      }
      const isDoc = flags.includes("--doc"),
        shouldDelay = max > 3;
      for (let i of data.wallpapers) {
        if (min > max) break;
        await anyaGen3.sendMessage(msg.chat, {
          ...(isDoc 
              ? {
                  document: { url: i.highestResLink.url },
                  fileName: `4kWallpapers_${func.getRandom(10)}.png`,
                  mimetype: "image/png",
                } 
              : { image: { url: i.highestResLink.url } }),
          caption: `Title : ${i.title}`
        }, { quoted: msg });
        if (shouldDelay) func.delay(1000);
        min++;
      }
      return { usePremiumCredit: 1 };
    } else {
      msg.reply(`\`➤ Enter some queries to search images.\`

\`OPTIONS :\`

\`\`\`--LINK :\`\`\`
> Get only urls of the images.

\`\`\`--Doc :\`\`\`
> Get all images in document formats.

\`\`\`--C=NUMBER :\`\`\`
> Define manually how much images you want, e.g.: --C=10. min is 1, max is 10.`);
      return;
    }
  }
);