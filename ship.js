
ship = {};


ship.SETTINGS = {
	"DAMPEN" : 1
};

ship.Ship = function(engine, pos, veloc, mass, width, height, images) {
	sprite.Sprite.call(this, engine, pos, veloc, mass, width, height, images);
	this.super = Object.getPrototypeOf(ship.Ship.prototype);
	this.settings = 0;
	
	this.update = function(delta) {
		this.super.update.call(this, delta);
				console.log(this.settings);
		if(this.settings & ship.SETTINGS.DAMPEN != 0) this.thrust = this.veloc.times(-1);///this.veloc.norm);
	}
}

ship.Ship.prototype = Object.create(sprite.Sprite.prototype);
ship.Ship.prototype.constructor = ship.Ship;