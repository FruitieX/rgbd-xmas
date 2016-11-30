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

const speed = 0.25;

function sine() {
    leds = leds.map((led, index) => {
        const time = new Date().getTime() / 1000;
        let fade = Math.sin(time * speed);

        let mainColor = fade >= 0 ? red : white;
        return color.mix(black, mainColor, Math.abs(fade) * 100);
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
