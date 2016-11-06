'use strict';

var color = require('tinycolor2');

let leds = null;

const red = color('red');
const white = color({
    r: 255,
    g: 192,
    b: 172
});

const period = 0.5;
const maxSpeed = 4;
const oscillatePeriod = 5000;

function sine() {
    const time = new Date().getTime();
    let offset = time / 1000 * maxSpeed % (2 * Math.PI);
    leds = leds.map((led, index) => {
        let fade = Math.sin(period * index + offset);
        fade *= Math.sin(time / oscillatePeriod);
        return color.mix(red, white, fade * 50 + 50);
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
