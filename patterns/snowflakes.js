'use strict';

var color = require('tinycolor2');

// config
let fadeTime = 200;
let spawnProbability = 0.2;

let leds = null;
// arrays for all leds and dots
let dots = [];

function isFading(index) {
    return dots.find(dot => dot.pos === index);
}

function snowflakes(leds) {
    leds.forEach((led, index) => {
        if (isFading(index)) {
            led._r = 255;
            led._g = Math.max(1, Math.min(255, led._g + 10));
            led._b = Math.max(1, Math.min(255, led._b + 10));
        } else {
            led._r = 255;
            led._g *= 0.9;
            led._b *= 0.9;
        }
    });
}

module.exports = function(numLeds) {
    if (!leds) {
        leds = Array.from(Array(numLeds)).map(function() {
            return color();
        });
    }

    if (Math.random() < spawnProbability) {
        let pos = Math.floor(Math.random() * leds.length);
        if (!isFading(pos)) {
            dots.push({
                pos: pos,
                time: new Date().getTime()
            });
        }
    }

    dots = dots.filter(led => new Date().getTime() - led.time < fadeTime);
    snowflakes(leds);

    return leds;
};
