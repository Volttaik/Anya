import fs from "node:fs";
import path from "node:path";
import Cg from '../config.js';

let plugins = [];

function AnyaGen3(details, logic) {
  const data = { ...details, function: logic };
  data.react = data.react || Cg.THEME_EMOJI;
  data.category = data.category || "others";
  data.rule = data.rule || 0;
  data.cooldown = data.cooldown || Cg.COOLDOWN_TIMER;
  plugins.push(data);
}

async function loadPlugins(directory) {
  fs.readdir(directory, async (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    const jsFiles = files.filter((file) => path.extname(file).toLowerCase() === '.js');
    for (const file of jsFiles) {
      const filePath = path.join(directory, file);
      try {
        await import(`file://${path.resolve(filePath)}`);
      } catch (error) {
        console.error(`Error loading plugin ${file}:`, error);
        process.exit(1);
      }
    }
  });
}

export { AnyaGen3, plugins, loadPlugins };
