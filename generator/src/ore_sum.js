const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

const { PATHS } = require("./config/paths.js");
const { loadImage } = require("./utils.js");

const INPUT_0 = "stone.overworld.png";
const INPUT_1 = "diamond_ore.png";
const INPUT_2 = "red_ore.png";
const OUTPUT_0 = "red_ore.png";

async function sumOreTexture(I0 = INPUT_0, I1 = INPUT_1, I2 = INPUT_2, O0 = OUTPUT_0, option = {}) {

    const inputPath_0 = path.join(PATHS.textures.ores.base, I0);
    const inputPath_1 = path.join(PATHS.textures.ores.shadow, I1);
    const inputPath_2 = path.join(PATHS.textures.ores.colored, I2);
    const outputPath_0 = path.join(PATHS.textures.ores.output, O0);

    const { data, info } = await loadImage(I0);

    const shadow = await loadImage(I1);

    const colored = await loadImage(I2);

    if (
        info.width !== shadow.info.width ||
        info.height !== shadow.info.height ||
        info.width !== colored.info.width ||
        info.height !== colored.info.height
    ) {
        throw new Error("画像サイズが一致しません");
    }

    for (let i = 0; i < data.length; i += 4) {

        const alpha = data[i + 3];
        if (alpha === 0) continue;

        if (shadow.data[i + 3] !== 0) {

            data[i] = shadow.data[i];
            data[i + 1] = shadow.data[i + 1];
            data[i + 2] = shadow.data[i + 2];
            data[i + 3] = shadow.data[i + 3];

        };

        if (colored.data[i + 3] !== 0) {

            data[i] = colored.data[i];
            data[i + 1] = colored.data[i + 1];
            data[i + 2] = colored.data[i + 2];
            data[i + 3] = colored.data[i + 3];

        };

    };

    fs.mkdirSync(PATHS.textures.ores.output, { recursive: true });

    await sharp(data, {
        raw: {
            width: info.width,
            height: info.height,
            channels: 4
        }
    }).png().toFile(O0);

};

// sumOreTexture();

module.exports = {
    sumOreTexture
};