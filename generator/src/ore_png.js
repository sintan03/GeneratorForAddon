const fs = require("fs");
const path = require("path");

const { PATHS } = require("./config/paths.js");
const { sumOreTexture } = require("./ore_sum.js");

const BASE = "overworld";
const textureDir = PATHS.textures.ores.base;

async function makeOrePng(B = BASE, option = { name: "green", oreType: "diamond", color: "#00ff00", brightMul: 2.0 }) {

    const fileList = await fs.readdirSync(textureDir);

    const files = fileList.filter(file => {
        const splt = file.split(".");
        return path.extname(file) === ".png" &&
            splt[splt.length - 2] === B
    });

    files.forEach(async file => {

        const input_1 = option.oreType + `_ore.png`;
        const input_2 = option.name + `_ore.png`;
        const output_0 = input_2;

        await sumOreTexture(file, input_1, input_2, output_0, option.color, option.brightMul);

    });

};

makeOrePng("overworld", { name: "starite", oreType: "diamond", color: "#ffdd00", brightMul: 1.5});