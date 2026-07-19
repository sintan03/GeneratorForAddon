const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

const { PATHS } = require("./config/paths.js");
const { loadImage } = require("./utils.js");
const { makeOreOverlayer } = require("./ore_color.js");

const INPUT_0 = "stone.overworld.png";
const INPUT_1 = "diamond_ore.png";
const INPUT_2 = "red_ore.png";
const OUTPUT_0 = "red_ore.png";

async function sumOreTexture(I0 = INPUT_0, I1 = INPUT_1, I2 = INPUT_2, O0 = OUTPUT_0, color = "#00ff00", brightMul = 2.0) {

    const inputPath_0 = path.join(PATHS.textures.ores.base, I0);
    const inputPath_1 = path.join(PATHS.textures.ores.shadow, I0.split(".")[0] === `stone` ? I2 : `${I0.split(".")[0]}_${I2}`);
    const inputPath_2 = path.join(PATHS.textures.ores.colored, I2);
    const outputPath_0 = path.join(PATHS.textures.ores.output, I0.split(".")[0] === `stone` ? O0 : `${I0.split(".")[0]}_${O0}`);

    await makeOreOverlayer(I1, I2, color, brightMul);

    const { data, info } = await loadImage(inputPath_0, false);

    const shadow = await loadImage(inputPath_1);

    const colored = await loadImage(inputPath_2, false);

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
    }).png().toFile(outputPath_0);

};

// sumOreTexture();

module.exports = {
    sumOreTexture
};