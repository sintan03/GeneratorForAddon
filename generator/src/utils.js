const sharp = require("sharp");

function rgbToHsv(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;

    if (diff !== 0) {

        switch (max) {
            case r:
                h = ((g - b) / diff) % 6;
                break;

            case g:
                h = (b - r) / diff + 2;
                break;

            case b:
                h = (r - g) / diff + 4;
                break;
        }

        h *= 60;

        if (h < 0)
            h += 360;
    }

    const s = max === 0 ? 0 : diff / max;

    const v = max;

    return {
        h,
        s,
        v
    };

};

function hexToRgb(hex) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    };
}

async function loadImage(path) {
    return await sharp(path)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
};

module.exports = {
    hexToRgb,
    rgbToHsv,
    loadImage
};