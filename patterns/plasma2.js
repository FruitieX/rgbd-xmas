'use strict';

var color = require('tinycolor2');

// config
var numLeds = 91;       // number of LEDs in your setup

let leds = null;

function plasma(leds) {
    for (var i = 0; i < leds.length; i++) {
        const t = new Date().getTime() / 1000;

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

        let blend = sine1 + sine2 + sine3;
        blend *= 2;

        // constrain to [0, 1]
        blend = Math.sin(blend * Math.PI / 2) / 2 + 0.5;
        //leds[i] = color.mix(color('red'), color('green'), 100 * blend);
        leds[i] = color({ h: 255 * blend, s: 1, l: 0.5 });
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
