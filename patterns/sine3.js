'use strict';

var color = require('tinycolor2');

let leds = null;

const red = color('red');
const white = color({
    r: 128,
    g: 72,
    b: 64
});
const black = color('black');

const period = 0.33;
const maxSpeed = 2;
const oscillatePeriod = 10000;
const periodDistance = 30;
let prevTime = new Date().getTime();

function sine() {
    const time = new Date().getTime();
    //let offset = -time / 1000 * maxSpeed % (2 * Math.PI);
    let offset = periodDistance * Math.sin(time / oscillatePeriod);
    leds = leds.map((led, index) => {
        let fade = Math.max(0, Math.sin(period * index + offset));
        let colorFade = Math.sin(time / oscillatePeriod);
        const mainColor = color.mix(red, white, colorFade * 50 + 50);
        return color.mix(black, mainColor, fade * 100);
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
