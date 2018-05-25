stars = {};

stars.COLORS = [
    "#9BB0FF",
    "#A2B8FF",
    "#9DB1FF",
    "#9DB1FF",
    "#9AB2FF",
    "#A4BAFF",
    "#9CB2FF",
    "#A7BCFF",
    "#A0B6FF",
    "#A0B4FF",
    "#A5B9FF",
    "#A4B8FF",
    "#AABFFF",
    "#ACBDFF",
    "#ADBFFF",
    "#B1C3FF",
    "#B5C6FF",
    "#B9C9FF",
    "#B5C7FF",
    "#BBCBFF",
    "#BFCFFF",
    "#CAD7FF",
    "#C7D4FF",
    "#C8D5FF",
    "#D5DEFF",
    "#DBE0FF",
    "#E0E5FF",
    "#ECEFFF",
    "#E0E2FF",
    "#F8F7FF",
    "#F4F1FF",
    "#F6F3FF",
    "#FFF7FC",
    "#FFF7FC",
    "#FFF8FC",
    "#FFF7F8",
    "#FFF5F2",
    "#FFF1E5",
    "#FFF4EA",
    "#FFF4EB",
    "#FFF4EB",
    "#FFEDDE",
    "#FFEFDD",
    "#FFEEDD",
    "#FFE0BC",
    "#FFE3C4",
    "#FFDEC3",
    "#FFD8B5",
    "#FFD2A1",
    "#FFC78E",
    "#FFD1AE",
    "#FFC38B",
    "#FFCC8E",
    "#FFC483",
    "#FFCE81",
    "#FFC97F",
    "#FFCC6F",
    "#FFC370",
    "#FFC66D",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#B20000"
];

stars.Star = function (engine, pos, radius, color, depth) {
    this.engine = engine;
    this.pos = pos || math.zeros(3);
    this.radius = radius || 1;
    this.color = color || "white";
    this.depth = depth || 40;
}

stars.Star.prototype = {
    render(context, origin) {
        var rel = this.pos.minus(origin.times(1 / this.depth * sprite.SCALE));

        var relx = rel.x + this.engine.canvas.width / 2;
        var rely = rel.y + this.engine.canvas.height / 2;

        if (relx + this.radius < 0 ||
            rely + this.radius < 0 ||
            relx - this.radius > this.engine.canvas.width ||
            rely - this.radius > this.engine.canvas.height)
            return;

        context.fillStyle = this.color;
        context.beginPath();
        context.arc(relx, rely, this.radius, 0, 2 * Math.PI);
        context.fill();

    }
};

