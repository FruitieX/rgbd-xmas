'use strict';

var color = require('tinycolor2');

// config
var numLeds = 91;       // number of LEDs in your setup

let leds = null;

function plasma(leds) {
    for (var i = 0; i < leds.length; i++) {
        let t = new Date().getTime() / 1000;

        t /= 2;

        const x = i / leds.length;
        const y = 1;

        // horizontal sinusoid
        const sine1 = Math.sin(x * 10 + t * 2);

        // rotating sinusoid
        const sine2 = Math.sin(10 * (x * Math.sin(t / 2) + y * Math.cos(t / 3)) + t);

        // circular sinusoid
        const cx = x + 0.5 * Math.sin(t / 5);
        const cy = y + 0.5 * Math.cos(t / 3);
        const sine3 = Math.sin(Math.sqrt(100 * (cx * cx + cy * cy) + 1) + t);

        let blend = sine3;
        blend *= 4 + Math.sin(t / 4) * 2;

        // constrain to [0, 1]
        blend = Math.sin(blend * Math.PI / 2) / 2 + 0.5;

        const color1 = color.mix(color('red'), color('yellow'), 50 + 50 * Math.sin(t * 1));
        const color2 = color.mix(color('green'), color('white'), 50 + 50 * Math.sin(t * 1.1255));
        leds[i] = color.mix(color1, color2, 100 * blend);
    }
}

module.exports = function(numLeds) {
    if (!leds) {
        leds = Array.from(Array(numLeds)).map(function() {
            return color();
        });
    }

    plasma(leds);

    return leds;
};
