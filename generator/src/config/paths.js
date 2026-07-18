const path = require("path");

const ROOT = path.join(__dirname, "../../");

const PATHS = {

    textures: {

        ores: {

            base: path.join(ROOT, "textures", "ore_base"),
            shadow: path.join(ROOT, "textures", "ore_shadow"),
            overlay: path.join(ROOT, "textures", "ore_overlayer"),
            colored: path.join(ROOT, "textures", "cash", "ore_colored"),
            output: path.join(ROOT, "_output", "RP", "textures", "blocks", "ore")

        }

    }

};

module.exports = {
    PATHS
};