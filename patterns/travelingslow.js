'use strict';

var color = require('tinycolor2');

// config
var numLeds = 91;       // number of LEDs in your setup

let leds = null;

function plasma(leds) {
    for (var i = 0; i < leds.length; i++) {
        /*
        const div1 = (5 + Math.sin(new Date().getTime() / 10337));
        const div2 = (2 + Math.sin(new Date().getTime() / 5257));
        let blend = Math.sin((i + 30) / div1) + Math.sin((i + 16) / div2);
        */

        const t = new Date().getTime() / 1000;

        const sine1 = Math.sin(i * 10 + t * 2);
        const sine2 = (10 * (i * Math.sin(t / 2) + t * Math.cos(t / 3)) + t);
        let blend = sine1;

        // constrain to [0, 1]
        blend = Math.sin(blend * Math.PI / 2) / 2 + 0.5;
        leds[i] = color.mix(color('red'), color('green'), 100 * blend);
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
