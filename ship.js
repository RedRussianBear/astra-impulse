
ship = {};


ship.SETTINGS = {
	"DAMPEN" : 1
};

ship.Ship = function(engine, pos, veloc, heading, mass, width, height, images) {
	sprite.Sprite.call(this, engine, pos, veloc, heading, mass, width, height, images);
	this.super = Object.getPrototypeOf(ship.Ship.prototype);
	this.settings = 0;

}

ship.Ship.prototype = Object.create(sprite.Sprite.prototype);
ship.Ship.prototype.constructor = ship.Ship;

ship.Ship.prototype.update = function(delta) {
	var v = this.veloc.times(-1);

	if(this.settings & ship.SETTINGS.DAMPEN != 0) this.thrust = v.clone().rotate(-this.heading);
	
	this.super.update.call(this, delta);
}

ship.Ship.prototype.getaccel = function(pos){
	return this.super.getaccel.call(this, pos).plus(this.thrust.rotate(this.heading));
}

ship.Component = function(engine, pos, veloc, heading, mass, width, height, images, parent) {
	sprite.Sprite.call(this, engine, pos, veloc, mass, width, height, images);
	this.parent = parent || null;
	this.super = Object.getPrototypeOf(ship.Ship.prototype);
	this.relpos = pos;
	this.settings = 0;
	
	this.update = function(delta) {
		this.heading = this.parent.heading;
		var v = this.veloc.times(-1);
		
		if(this.settings & ship.SETTINGS.DAMPEN != 0) this.thrust = v.clone().rotate(-this.heading);
	}
}

ship.Component.prototype = Object.create(sprite.Sprite.prototype);
ship.Component.prototype.constructor = ship.Component;