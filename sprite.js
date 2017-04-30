
sprite = {};

sprite.SCALE = 1;

sprite.STATE = { 
	"NORMAL" : 0,
	"POWERED" : 1
};


sprite.Sprite = function(engine, pos, veloc, heading, mass, width, height, images) {
	this.engine = engine;
	this.pos = pos || math.zeros(3);
	this.veloc = veloc || math.zeros(3);
	this.thrust = math.zeros(3);
	this.heading = heading || 0;
	this.masss = mass || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.settings = 0;
	this.children = [];
	
	this.state = sprite.STATE.NORMAL;
	this.frame = 0;
	
	this.images = images;
}

sprite.Sprite.prototype = {
	get momentum() { return this.veloc.times(mass); },
	get accel() { return this.getaccel(this.pos) },
	get pwidth() { return sprite.SCALE*this.width; },
	get pheight() { return sprite.SCALE*this.height; },
	get mass() { return this.masss + math.sum(this.children, "mass"); },
	getaccel(pos) {
		var accel = math.zeros(3);
		var sprites = this.engine.sprites;
		for(var j = 0; j < sprites.length; j++)
			if(sprites[j] != this) {
				var r = sprites[j].pos.minus(pos);
				var mr = r.norm;
				
				accel.add(r.times(math.G*sprites[j].mass/(mr*mr*mr)));
			}
		return accel;
	},
	update(delta) {
		var h = delta;
		
		/* Runge-Kutta... Hopefully... */
		var v1 = this.getaccel(this.pos).times(h);
		var k1 = this.getaccel(this.pos).times(h*h/2).plus(this.veloc.times(h));
		
		var v2 = this.getaccel(this.pos.plus(k1.times(1/2))).times(h);
		var k2 = this.getaccel(this.pos.plus(k1.times(1/2))).times(h*h/2).plus(this.veloc.times(h));
		
		var v3 = this.getaccel(this.pos.plus(k2.times(1/2))).times(h);;
		var k3 = this.getaccel(this.pos.plus(k2.times(1/2))).times(h*h/2).plus(this.veloc.times(h));
		
		var v4 = this.getaccel(this.pos.plus(k3)).times(h);
		var k4 = this.getaccel(this.pos.plus(k3)).times(h*h/2).plus(this.veloc.times(h));
		
		this.veloc.add(v1.times(1/6));
		this.veloc.add(v2.times(1/3));
		this.veloc.add(v3.times(1/3));
		this.veloc.add(v4.times(1/6));
		
		this.pos.add(k1.times(1/6));
		this.pos.add(k2.times(1/3));
		this.pos.add(k3.times(1/3));
		this.pos.add(k4.times(1/6));
		
	},
	render(context, origin) {
		var rel = this.pos.minus(origin);
		var relx = rel.x*sprite.SCALE + this.engine.canvas.width/2;
		var rely = rel.y*sprite.SCALE + this.engine.canvas.height/2;
		
		if(	relx + this.pwidth/2 < 0 						||
			rely + this.pwidth/2 < 0 						|| 
			relx - this.pwidth/2 > this.engine.canvas.width || 
			rely - this.pwidth/2 > this.engine.canvas.height) 
				return;
				
		var t = this.thrust.rotate(this.heading);
		
		context.translate(relx, rely);
		context.rotate(this.heading);
		
		context.fillStyle = "white";
		context.beginPath();
		context.arc(0, 0, 5, 0, 2*Math.PI);
		context.fill();
		
		context.drawImage(this.images[this.state][this.frame], -this.pwidth/2, -this.pheight/2, this.pwidth, this.pheight);
		context.rotate(-this.heading);
		
		
		
		// context.strokeStyle = "white";
		// context.beginPath();
		// context.moveTo(0,0);
		// context.lineTo(this.veloc.x,this.veloc.y);
		// context.stroke();
		
		// context.strokeStyle = "blue";
		// context.beginPath();
		// context.moveTo(0,0);
		// context.lineTo(this.grav.x,this.grav.y);
		// context.stroke();
		
		context.strokeStyle = "red";
		context.beginPath();
		context.moveTo(0,0);
		context.lineTo(t.x,t.y);
		context.stroke();
		
		context.translate(-relx, -rely);
	}
}