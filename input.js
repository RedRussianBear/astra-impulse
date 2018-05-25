/* Input */

input = {};
input.KEYBOARD = {
    "BACKSPACE": 8,
    "TAB": 9,
    "ENTER": 13,
    "SHIFT": 16,
    "CTRL": 17,
    "ALT": 18,
    "PAUSE/BREAK": 19,
    "CAPSLOCK": 20,
    "ESCAPE": 27,
    "SPACE": 32,
    "PAGEUP": 33,
    "PAGEDOWN": 34,
    "END": 35,
    "HOME": 36,
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "INSERT": 45,
    "DELETE": 46,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "A": 65,
    "B": 66,
    "C": 67,
    "D": 68,
    "E": 69,
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76,
    "M": 77,
    "N": 78,
    "O": 79,
    "P": 80,
    "Q": 81,
    "R": 82,
    "S": 83,
    "T": 84,
    "U": 85,
    "V": 86,
    "W": 87,
    "X": 88,
    "Y": 89,
    "Z": 90,
    "LEFTWINDOWKEY": 91,
    "RIGHTWINDOWKEY": 92,
    "SELECTKEY": 93,
    "NUMPAD0": 96,
    "NUMPAD1": 97,
    "NUMPAD2": 98,
    "NUMPAD3": 99,
    "NUMPAD4": 100,
    "NUMPAD5": 101,
    "NUMPAD6": 102,
    "NUMPAD7": 103,
    "NUMPAD8": 104,
    "NUMPAD9": 105,
    "MULTIPLY": 106,
    "ADD": 107,
    "SUBTRACT": 109,
    "DECIMALPOINT": 110,
    "DIVIDE": 111,
    "F1": 112,
    "F2": 113,
    "F3": 114,
    "F4": 115,
    "F5": 116,
    "F6": 117,
    "F7": 118,
    "F8": 119,
    "F9": 120,
    "F10": 121,
    "F11": 122,
    "F12": 123,
    "NUMLOCK": 144,
    "SCROLLLOCK": 145,
    "SEMI-COLON": 186,
    "EQUALSIGN": 187,
    "COMMA": 188,
    "DASH": 189,
    "PERIOD": 190,
    "FORWARDSLASH": 191,
    "GRAVEACCENT": 192,
    "OPENBRACKET": 219,
    "BACKSLASH": 220,
    "CLOSEBRAKET": 221,
    "SINGLEQUOTE": 222
};

input.MOUSE = {
    "LEFT": 1,
    "RIGHT": 2
};

input.STATE = {
    "UP": 0,
    "DOWN": 1,
    "HELD": 2
};

input.inputHandler = function (engine) {
    this.engine = engine;
    this.keyboard = [];
    this.mouse = [];
};

input.inputHandler.prototype = {
    start() {
        var inputh = this;

        for (key in input.KEYBOARD) {
            this.keyboard[input.KEYBOARD[key]] = input.STATE.UP;
        }

        document.onkeydown = function (e) {
            inputh.keyhandle(e);
        };
        document.onkeyup = function (e) {
            inputh.keyhandle(e);
        };

        this.engine.canvas.onmousedown = function (e) {
            inputh.mousehandle(e);
        };
        this.engine.canvas.onmouseup = function (e) {
            inputh.mousehandle(e);
        };
        this.engine.canvas.onmousemove = function (e) {
            inputh.mousehandle(e);
        }
    },

    keyhandle(e) {
        switch (e.type) {
            case 'keydown':
                if (this.keyboard[e.keyCode] == input.STATE.UP) this.keyboard[e.keyCode] = input.STATE.DOWN;
                break;

            case 'keyup':
                this.keyboard[e.keyCode] = input.STATE.UP;
                break;
        }
    },

    mousehandle(e) {
        switch (e.type) {
            case 'mousedown':
                if (this.mouse[e.button] == input.STATE.DOWN) this.keyboard[e.keyCode] = input.STATE.HELD;
                else this.mouse[e.button] = input.STATE.DOWN;
                break;

            case 'mouseup':
                this.mouse[e.button] = input.STATE.UP;
                break;

            case 'mousemove':
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                break;
        }
    },

    update(delta) {
        for (key in this.keyboard)
            if (this.keyboard[key] == input.STATE.DOWN)
                this.keyboard[key] = input.STATE.HELD;
    }
};