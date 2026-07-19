const sharp = require("sharp");
const path = require("path");

const { PATHS } = require("./config/paths.js");
const { hexToRgb, rgbToHsv, loadImage } = require("./utils.js");

const INPUT = "diamond_ore.png";
const OUTPUT = "red_ore.png";
const COLOR = "#ff0000";
const VALUE_MUL = 1.8;

async function makeOreOverlayer(I = INPUT, O = OUTPUT, C = COLOR, V = VALUE_MUL) {

    const inputPath = path.join(PATHS.textures.ores.overlay, I);
    const outputPath = path.join(PATHS.textures.ores.colored, O);

    const target = hexToRgb(C);

    const { data, info } = await loadImage(inputPath, false);

    for (let i = 0; i < data.length; i += 4) {

        const alpha = data[i + 3];
        if (alpha === 0) continue;

        const hsv = rgbToHsv(data[i], data[i + 1], data[i + 2]);
        const saturation = hsv.s;
        const value = hsv.v;

        const r = Math.max(0, Math.min(target.r * value * V, 255));
        const g = Math.max(0, Math.min(target.g * value * V, 255));
        const b = Math.max(0, Math.min(target.b * value * V, 255));

        data[i] = r + Math.floor((255 - r) * (1 - saturation));
        data[i + 1] = g + Math.floor((255 - g) * (1 - saturation));
        data[i + 2] = b + Math.floor((255 - b) * (1 - saturation));

    }

    await sharp(data, {
        raw: {
            width: info.width,
            height: info.height,
            channels: 4
        }
    }).png().toFile(outputPath);

};

// makeOreOverlayer();

module.exports = {
    makeOreOverlayer
};