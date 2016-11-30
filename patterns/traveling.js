'use strict';

var color = require('tinycolor2');

// config
var numLeds = 91;       // number of LEDs in your setup
var fade = 0.5;         // how much to darken every led per frame
var maxSpeed = 0.15;    // max speed of dots
var minSpeed = 0.025;   // min speed of dots
let colors = [          // dot color (randomly selected from list)
    color('red'), color('white')
];
let maxDots = 15;       // maximum amount of dots at once

let leds = null;
// traveling dots
var dots = [];

function fadeOut(leds) {
    for (var i = 0; i < leds.length; i++) {
        leds[i].darken(fade);
    }
}

function traveling(leds) {
    fadeOut(leds);

    dots.forEach((dot, index) => {
        let ledPos = Math.floor(dot.pos);
        leds[ledPos] = color.mix(dot.color, leds[ledPos], 90);

        let dir = dot.speed > 0 ? 1 : -1;
        if (dot.pos + dir >= 0 && dot.pos + dir < numLeds) {
            let fade = 1 - Math.abs((dir > 0 ? Math.ceil(dot.pos) : Math.floor(dot.pos)) - dot.pos);
            leds[ledPos + dir] = color.mix(dot.color, leds[ledPos + dir], 20 * (5 - fade));
        }

        dot.pos = dot.pos + dot.speed;
    });

    // remove out of bounds dots
    dots = dots.filter((dot) => {
        return dot.pos >= 0 && dot.pos <= numLeds - 1;
    });
}

function spawnLight() {
    if (dots.length >= maxDots) {
        return;
    }

    let moveRight = Math.random() < 0.5;
    let speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
        speed *= moveRight ? 1 : -1;

    dots.push({
        pos: moveRight ? 0 : numLeds -1,
        speed: speed,
        color: colors[Math.floor(Math.random() * colors.length)]
    });
}

module.exports = function(numLeds) {
    if (!leds) {
        leds = Array.from(Array(numLeds)).map(function() {
            return color();
        });
    }

    if (Math.random() < 0.01) {
        spawnLight();
    }

    traveling(leds);

    return leds;
};

// spawn a light right away
spawnLight();
