planets = {};

planets.Planet = function (engine, pos, veloc, heading, mass, radius, atmradius, color, atmcolor) {
    sprite.Sprite.call(this, engine, pos, veloc, heading, mass, 2 * radius, 2 * radius, 0);
    this.super = Object.getPrototypeOf(planets.Planet.prototype);

    this.radius = radius;
    this.atmradius = atmradius;
    this.color = color;
    this.atmcolor = atmcolor;
};

planets.Planet.prototype = Object.create(sprite.Sprite.prototype);
planets.Planet.prototype.constructor = planets.Planet;

planets.Planet.prototype.render = function (context, origin) {
    var rel = this.pos.minus(origin);
    var relx = rel.x * sprite.SCALE + this.engine.canvas.width / 2;
    var rely = rel.y * sprite.SCALE + this.engine.canvas.height / 2;

    if (relx + this.pwidth / 2 < 0 ||
        rely + this.pwidth / 2 < 0 ||
        relx - this.pwidth / 2 > this.engine.canvas.width ||
        rely - this.pwidth / 2 > this.engine.canvas.height) return;

    context.translate(relx, rely);
    context.rotate(this.heading);

    context.fillStyle = "rgb(" + this.color + ")";
    context.beginPath();
    context.arc(0, 0, this.radius * sprite.SCALE, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = "rgb(" + this.atmcolor + ", 0.75)";
    context.beginPath();
    context.arc(0, 0, this.radius * sprite.SCALE, 0, 2 * Math.PI);
    context.fill();

    var grad = context.createRadialGradient(0, 0, this.radius * sprite.SCALE, 0, 0, this.atmradius * sprite.SCALE);
    grad.addColorStop(0, "rgba(" + this.atmcolor + ", 0.75)");
    grad.addColorStop(1, "rgba(" + this.atmcolor + ", 0)");

    context.fillStyle = grad;
    context.beginPath();
    context.arc(0, 0, this.atmradius * sprite.SCALE, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = "rgb(" + this.color + ")";
    context.beginPath();
    context.arc(0, 0, this.radius * sprite.SCALE, 0, 2 * Math.PI);
    context.fill();

    context.rotate(-this.heading);

    context.translate(-relx, -rely);
};
