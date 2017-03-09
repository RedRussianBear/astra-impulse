
sprite = {};

sprite.SCALE = 1;

sprite.STATE = { 
	"NORMAL" : 0 
};


sprite.Sprite = function(engine, pos, veloc, mass, width, height, images) {
	this.engine = engine;
	this.pos = pos || math.zeros(3);
	this.veloc = veloc || math.zeros(3);
	this.grav = math.zeros(3);
	this.thrust = math.zeros(3);
	this.mass = mass || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.settings = 0;
	
	this.state = sprite.STATE.NORMAL;
	this.frame = 0;
	
	this.images = images;
}

sprite.Sprite.prototype = {
	get momentum() { return this.veloc.times(mass); },
	get accel() { return this.grav.plus(this.thrust); },
	get pwidth() { return sprite.SCALE*this.width; },
	get pheight() { return sprite.SCALE*this.height; },
	update(delta) {
		this.veloc.add(this.accel.times(delta));
		this.pos.add(this.veloc.times(delta));
	},
	render(context, origin) {
		var rel = this.pos;//.minus(origin);
		context.drawImage(this.images[this.state][this.frame], rel.x*sprite.SCALE, rel.y*sprite.SCALE, this.pwidth, this.pheight);
	}
}