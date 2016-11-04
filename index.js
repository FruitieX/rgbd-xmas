'use strict';

var socket = require('socket.io-client')('http://localhost:9009');
var color = require('tinycolor2');

// config
var framerate = 60;     // frames per second
var numLeds = 91;       // number of LEDs in your setup
var fade = 0.5;         // how much to darken every led per frame
var maxSpeed = 0.15;    // max speed of dots
var minSpeed = 0.025;   // min speed of dots
let colors = [          // dot color (randomly selected from list)
    color('red'), color('#975')
];

// arrays for all leds and traveling dots
var leds = Array.from(Array(numLeds)).map(function() {
    return color();
});
var dots = [];

function fadeOut() {
    for (var i = 0; i < numLeds; i++) {
        leds[i].darken(fade);
    }
}

function fadeColor(color, amount) {
    return {
        r: color.r * amount,
        g: color.g * amount,
        b: color.b * amount
    }
}

function xmasLights() {
    fadeOut();

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
    let moveRight = Math.random() < 0.5;
    let speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
        speed *= moveRight ? 1 : -1;

    dots.push({
        pos: moveRight ? 0 : numLeds -1,
        speed: speed,
        color: colors[Math.floor(Math.random() * colors.length)]
    });
}

setInterval(function() {
    if (Math.random() < 0.01) {
        spawnLight();
    }

    xmasLights();
    socket.emit('frame', {
        id: 0,
        colors: leds.map(led => (led.toRgb()))
    });
}, 1000 / framerate);
