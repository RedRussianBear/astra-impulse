/* 
	Math utility functions for use in AstraImpulse
	Author: Mikhail Khrenov, 2017
*/

math = {};
math.G = 0.00000000006754;

/* Vector class, features all standard 2,3, and n-space operations over R */
math.Vector = function () {
    /* Elements of the vector */
    this.$ = [0, 0, 0];
    for (var i = 0; i < arguments.length; i++)
        this.$[i] = arguments[i];
};

/* Vector getters */
math.Vector.prototype = {
    get norm() {
        return Math.sqrt(this.dot(this));
    },
    get theta() {
        return (Math.asin(this.$[1] / this.norm) > 0 ?
            Math.acos(this.$[0] / this.norm) :
            -1 * Math.acos(this.$[0] / this.norm));
    },
    get elements() {
        return this.$;
    },
    get x() {
        return this.$[0];
    },
    get y() {
        return this.$[1];
    },
    add(_v) {
        var l = Math.min(this.$.length, _v.$.length);
        for (var i = 0; i < l; i++)
            this.$[i] += _v.$[i];
        return this;
    },

    scale(_a) {
        for (var i = 0; i < this.$.length; i++)
            this.$[i] *= _a;
        return this;
    },

    clone() {
        var v = new math.Vector();
        for (var i = 0; i < v.$.length; i++)
            v.$[i] = this.$[i];
        return v;
    },

    plus(_v) {
        var v = this.clone();
        var l = Math.min(v.$.length, _v.$.length);
        for (var i = 0; i < l; i++)
            v.$[i] += _v.$[i];
        return v;
    },

    minus(_v) {
        var v = this.clone();
        var l = Math.min(v.$.length, _v.$.length);
        for (var i = 0; i < l; i++)
            v.$[i] -= _v.$[i];
        return v;
    },

    times(_a) {
        var v = this.clone();
        for (var i = 0; i < v.$.length; i++)
            v.$[i] *= _a;
        return v;
    },

    /* n-space dot product */
    dot(_v) {
        var l = Math.min(this.$.length, _v.$.length);
        var ac = 0;
        for (var i = 0; i < l; i++)
            ac += this.$[i] * _v.$[i];
        return ac;
    },

    /* Cross product as defined for 3-space */
    cross(v) {
        return new math.Vector(this.$[1] * v.$[2] - this.$[2] * v.$[1],
            this.$[2] * v.$[0] - this.$[0] * v.$[2],
            this.$[0] * v.$[1] - this.$[1] * v.$[0]);
    },

    /* Determine angle between this vector and other as defined for 2-space */
    angle(v) {
        return Math.acos(this.dot(v) / (this.norm * v.norm));
    },

    rotate(a) {
        return new math.Vector(this.$[0] * Math.cos(a) - this.$[1] * Math.sin(a), this.$[0] * Math.sin(a) + this.$[1] * Math.cos(a));
    }
};

math.ones = function (l) {
    var elems = [];
    elems.length = l;
    for (var i = 0; i < l; i++)
        elems[i] = 1;

    var v = new math.Vector();
    v.$ = elems;
    return v;
};

math.zeros = function (l) {
    var elems = [];
    elems.length = l;
    for (var i = 0; i < l; i++)
        elems[i] = 0;

    var v = new math.Vector();
    v.$ = elems;
    return v;
};

math.i = new math.Vector(1, 0, 0);
math.j = new math.Vector(0, 1, 0);
math.k = new math.Vector(0, 0, 1);
math.ni = new math.Vector(-1, 0, 0);
math.nj = new math.Vector(0, -1, 0);
math.nk = new math.Vector(0, 0, -1);

math.sum = function (array, element) {
    var sum = 0;
    for (var i = 0; i < array.length; i++)
        sum += array[i][element];
    return sum;
};
