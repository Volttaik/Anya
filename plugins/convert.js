import fs from "node:fs";
import Cg from "../config.js";
import {
  AnyaGen3
} from "../lib/index.js";
import { pipeline } from '@xenova/transformers';
import wavefile from 'wavefile';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);

AnyaGen3(
    {
        on: "category",
        category: "convert",
        category_symbol: "🔀",
        commands_symbol: "🧭",
        category_desc: "This category includes various particular format to different formats converter seamlessly."
    }
)

AnyaGen3(
  {
    name: "tts",
    react: "🗣️",
    category: "convert",
    pro: true,
    exp: 40,
    desc: "Convert text to AI powered natural female voice.",
    filename: __filename
  },
  async (anyaGen3, msg, { args }) => {
    const quoted = msg.quoted ? msg.quoted : msg;
    const mime = (quoted && quoted.type) ? quoted.type : msg.type;
    const text = msg.quoted ? msg.quoted.text ? msg.quoted.text : args[0] ? args.join(" ") : null : args[0] ? args.join(" ") : null;
    if (!text) return msg.reply("Texts required for speech conversion!", { style: "monospace" });
    const key = await msg.reply(Cg.msg.wait);
    const synthesizer = await pipeline('text-to-speech', 'Xenova/speecht5_tts', { quantized: false });
    const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
    const result = await synthesizer(text, { speaker_embeddings });
    let wav = new wavefile.WaveFile();
    wav.fromScratch(1, result.sampling_rate, '32f', result.audio);
    await anyaGen3.sendMessage(msg.chat, {
      audio: wav.toBuffer(),
      mimetype: 'audio/wav',
      ptt: false
    }, { quoted:msg })
    .then(() => msg.delete(key.key));
  }
);
    