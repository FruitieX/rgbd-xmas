'use strict';

var socket = require('socket.io-client')('http://localhost:9009');
var _ = require('underscore');
var one = require('onecolor');

var framerate = 60;

// number of LEDs in your setup
var numLeds = 91;
var leds = Array.from(Array(numLeds)).map(function() {
    return {
        red: 0,
        green: 0,
        blue: 0
    };
});

var fade = 0.95;

function fadeOut() {
    for (var i = 0; i < numLeds; i++) {
        leds[i].red *= fade;
        leds[i].green *= fade;
        leds[i].blue *= fade;
    }
}

function fadeColor(color, amount) {
    return {
        red: color.red * amount,
        green: color.green * amount,
        blue: color.blue * amount
    }
}

/*

function xmasColor() {
    return Math.random() < 0.5 ?  {
        red: 255,
        green: 0,
        blue: 0
    } : {
        red: 128,
        green: 128,
        blue: 128
    }
}

let fadingInColor = null;
let fadingInLed = null;

function addLight(pos) {
    let fadingInColor = xmasColor();
    let fadingInLed = pos;

    leds[pos] = color;

    for (var i = 1; i < 10; i++) {
        // above led
        if (pos + i < numLeds) {
            leds[pos + i] = fadeColor(color, 1 / i);
        }
        // below led
        if (pos - i >= 0) {
            leds[pos - i] = fadeColor(color, 1 / i);
        }
    }
}

function xmasLights() {
    fadeOut();

    if (fadingInLed !== null) {
        leds[fadingInLed].red = Math.min(leds[fadingInLed].red, color.red);
        leds[fadingInLed].green = Math.min(leds[fadingInLed].red, color.green);
        leds[fadingInLed].blue = Math.min(leds[fadingInLed].red, color.blue);

        for (var i = 1; i < 10; i++) {
            // above led
            if (pos + i < numLeds) {
                leds[pos + i] = fadeColor(color, 1 / i);
            }
            // below led
            if (pos - i >= 0) {
                leds[pos - i] = fadeColor(color, 1 / i);
            }
        }
    }

    // Select new led
    if (Math.random() < 0.02) {
        // Add light with spread
        addLight(Math.floor(Math.random() * numLeds));
    }
}
*/

var dots = [{
    pos: numLeds * Math.random(),
    speed: 0.074,
    color: {
        red: 255,
        green: 0,
        blue: 0
    }
}, {
    pos: numLeds * Math.random(),
    speed: -0.163,
    color: {
        red: 64,
        green: 64,
        blue: 64
    }
}, {
    pos: numLeds * Math.random(),
    speed: 0.342,
    color: {
        red: 255,
        green: 0,
        blue: 0
    }
}, {
    pos: numLeds * Math.random(),
    speed: -0.078,
    color: {
        red: 255,
        green: 0,
        blue: 0
    }
}, {
    pos: numLeds * Math.random(),
    speed: -0.327,
    color: {
        red: 64,
        green: 64,
        blue: 64
    }
}];
/*
var dots = [{
    pos: numLeds * Math.random(),
    speed: 0.074,
    color: {
        red: 255,
        green: 0,
        blue: 0
    }
}, {
    pos: numLeds * Math.random(),
    speed: -0.163,
    color: {
        red: 64,
        green: 64,
        blue: 64
    }
}, {
    pos: numLeds * Math.random(),
    speed: 0.342,
    color: {
        red: 64,
        green: 64,
        blue: 64
    }
}, {
    pos: numLeds * Math.random(),
    speed: -0.078,
    color: {
        red: 255,
        green: 0,
        blue: 0
    }
}, {
    pos: numLeds * Math.random(),
    speed: -0.327,
    color: {
        red: 64,
        green: 64,
        blue: 64
    }
}];
*/

function xmasLights() {
    fadeOut();

    dots.forEach(dot => {
        leds[Math.floor(dot.pos)] = Object.assign({}, dot.color);
        dot.pos = (dot.pos + dot.speed) % numLeds;

        if (dot.pos < 0) {
            dot.pos = dot.pos + numLeds;
        }
    });
}

setInterval(function() {
    xmasLights();
    socket.emit('frame', {
        id: 0,
        colors: leds
    });
}, 1000 / framerate);
