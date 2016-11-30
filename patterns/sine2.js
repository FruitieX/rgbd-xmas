'use strict';

var color = require('tinycolor2');

let leds = null;

const red = color('red');
const white = color({
    r: 200,
    g: 200,
    b: 200
});
const black = color('black');

const period = 0.33;
const maxSpeed = 1.5;
const oscillatePeriod = 5000;

function sine() {
    const time = new Date().getTime();
    let offset = -time / 1000 * maxSpeed % (2 * Math.PI);
    leds = leds.map((led, index) => {
        let fade = Math.sin(period * index + offset);
        let colorFade = Math.sin(time / oscillatePeriod);
        const mainColor = color.mix(red, white, colorFade * 50 + 50);
        return color.mix(mainColor, black, fade * 50 + 50);
    });
}

module.exports = function(numLeds) {
    if (!leds) {
        leds = Array.from(Array(numLeds)).map(function() {
            return color();
        });
    }

    sine();

    return leds;
};
