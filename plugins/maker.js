import Cg from "../config.js";
import { AnyaGen3, func } from "../lib/index.js";
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import iOSss from "../lib/canvas/maker_iOS-screenshot.js";
import loliLicense from "../lib/canvas/maker_loli-license.js";
import generateMultiShadowText from "../lib/canvas/maker_multiStrokeText.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AnyaGen3({
  on: "category",
  category: "maker",
  category_symbol: "📝",
  commands_symbol: "❤️‍🔥",
  category_desc: "This category includes the commands used for image generation tasks."
});

AnyaGen3(
  {
    name: "mstext",
    react: "✏️",
    category: "maker",
    usage: "text",
    exp: 30,
    desc: "Generate multi stoke text effects.",
    filename: __filename
  },
  async (anyaGen3, msg, { args }) => {
    if (!args[0]) return msg.reply("Enter some texts!", { style: "monospace" });
    generateMultiShadowText(args.join(" "), "white", "orange")
    .then(image => {
      anyaGen3.sendMessage(msg.chat, { image, caption: `> ${Cg.FOOTER}` }, { quoted:msg });
    });
  }
);

AnyaGen3(
  {
    name: "lolilice",
    react: "✨",
    category: "maker",
    premium: true,
    exp: 30,
    desc: "Generate loli having license card",
    filename: __filename
  },
  async (anyaGen3, msg, { args, prefix, command, user }) => {
    const key = await msg.reply(Cg.msg.wait);    
    const now = new Date();
    const birthday = now
      .toLocaleDateString("en-GB")
      .split("/")
      .map((part, i) => (i === 2 ? part.slice(-2) : part))
      .join("/");
    const profilePic = await anyaGen3.profilePictureUrl(msg.sender, 'image').catch(() => null);
    const loliImagePath = path.resolve(__dirname, "../assets/canvas", `loli image ${Math.floor(Math.random() * 5) + 1}.jpg`);
    let is3D = false;
    if (args[0] && args.join(" ").includes("--3d")) is3D = true;
    const image = await loliLicense({
      is3D,
      avatar: profilePic,
      name: user.name || msg.pushName || msg.sender_num,
      sex: func.pickRandom(["weeb", "pedo", "never", "daily", "once"]),
      level: func.pickRandom(["hugs and kisses", "cuddle and kisses", "cuddle and hugs"]),
      limit: "unlimited",
      birthday,
      id: msg.sender_num?.slice(0, 6) || "000000",
      loli: loliImagePath
    });
    await anyaGen3.sendMessage(msg.chat, { image, caption: is3D ? `> ${Cg.FOOTER}` : `> Use '${prefix + command} --3d' for 3d frame` }, { quoted: msg });
    await msg.delete(key.key);
    return { usePremiumCredit: 1 }
  }
);

AnyaGen3(
  {
    name: "imsg",
    react: "🗨️",
    category: "maker",
    usage: "image|text",
    premium: true,
    exp: 30,
    desc: "Generate fake Apple iMessage chat screenshot using texts and image",
    filename: __filename
  },
  async (anyaGen3, msg, { args, prefix, command, user }) => {
    let caption, image, dark = true;
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    caption = msg.quoted ? msg.quoted.text ? msg.quoted.text : args[0] ? args.join(" ") : "" : args[0] ? args.join(" ") : "";
    if (caption?.includes("--light")) {
      caption = caption.replace(/--light/g, "")?.trim();
      dark = false;
    }
    if (/image/.test(mime) && !/webp/.test(mime)) {
      image = await quoted.download({});
    } else if (caption === "") {
      return msg.reply("Enter some texts or tag an image.", { style: "monospace" });
    }
    const key = await msg.reply(Cg.msg.wait);
    const hr = Math.floor(Math.random() * 12) + 1;
    const mi = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const profilePic = await anyaGen3.profilePictureUrl(msg.sender, 'image').catch(() => null);
    iOSss({
      clock: `${hr}:${mi}`,
      dark,
      image,
      caption,
      profilePic,
      name: user.name || msg.pushName || msg.sender_num,
    })
    .then(image => {
      anyaGen3.sendMessage(msg.chat, {
        image,
        caption: !dark ? `> ${Cg.FOOTER}` : `> Use '${prefix + command} --light' for white theme`
      }, { quoted:msg })
      .then(() => msg.delete(key.key));
    });
    return { usePremiumCredit: 1 };
  }
);