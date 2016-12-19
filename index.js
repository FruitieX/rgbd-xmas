'use strict';

var socket = require('socket.io-client')('http://localhost:9009');
var color = require('tinycolor2');

// config
var framerate = 60;     // frames per second
var numLeds = 90;       // number of LEDs in your setup
let patternInterval = 1000 * 60;
let fadeTime = 3000;

// patterns
let patterns = [
    require('./patterns/sine1'),
    require('./patterns/sine2'),
    require('./patterns/sine3'),
    require('./patterns/pulse'),
    require('./patterns/snowflakes'),
    require('./patterns/traveling'),
];
let old = null;
let currentTime = new Date().getTime();
let current = 0;

setInterval(() => {
    old = current;

    let random = Math.floor(Math.random() * patterns.length);
    if (random === current) {
        current = (current + 1) % patterns.length;
    } else {
        current = random;
    }

    currentTime = new Date().getTime();
}, patternInterval);

let leds = Array.from(Array(numLeds)).map(function() {
    return color();
});

setInterval(function() {
    let oldLeds = null;
    let newLeds = patterns[current](numLeds);

    if (old !== null && new Date().getTime() - currentTime < fadeTime) {
        oldLeds = patterns[old](numLeds);

        let fade = 1 - (new Date().getTime() - currentTime) / fadeTime;
        fade = Math.min(1, fade);
        fade = Math.max(0, fade);

        leds = leds.map((led, index) => color.mix(newLeds[index], oldLeds[index], fade * 100));
    } else {
        leds = newLeds;
    }

    socket.emit('frame', {
        id: 0,
        name: 'Xmas',
        colors: leds.map(led => (led.toRgb()))
    });
}, 1000 / framerate);
