const fs = require("fs");
const path = require("path");

const { PATHS } = require("./config/paths.js");
const { sumOreTexture } = require("./ore_sum.js");

const BASE = "overworld";
const textureDir = PATHS.textures.ores.base;

async function makeOrePng(B = BASE, option = { oreType: "diamond", name: "green", color: "#00ff00", brightMul: 2.0 }, P = textureDir) {

    const fileList = await fs.readdirSync(P);

    const files = fileList.filter(file => {
        const splt = file.split(".");
        return path.extname(file) === ".png" &&
            splt[splt.length - 2] === B
    });

    files.forEach(file => {

        sumOreTexture(file,);

    });

};

makeOrePng("overworld", { oreType: "diamond", name: "green", color: "#00ff00", brightMul: 2.0 }, textureDir);