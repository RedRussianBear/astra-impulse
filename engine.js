/* Main engine */

engine = {};

engine.TIMEWARP = 1;

engine.STATE = {
	"LOADING" : 0,
	"START" : 1
};

engine.STARS = true;

engine.Engine = function(canvasid) {
	this.canvas = document.getElementById(canvasid);
	this.context = this.canvas.getContext("2d");
	this.resources = new resource.resourceManager(this);
	//this.context.imageSmoothingEnabled = false;
	
	this.sprites = [];
	this.stars = [];
	this.hactions = {};
	this.sactions = {};
	
	this.time = 0;
	this.frames = 0;
}

engine.Engine.prototype = {
	update(delta) {		
		for(key in this.hactions)
			if(this.input.keyboard[key] == input.STATE.HELD || this.input.keyboard[key] == input.STATE.DOWN) 
				this.hactions[key].call(this);
		
		for(key in this.sactions)
			if(this.input.keyboard[key] == input.STATE.DOWN) 
				this.sactions[key].call(this);
		
		for(var i = 0; i < this.sprites.length; i++)
			this.sprites[i].update(delta*engine.TIMEWARP);
	
		this.input.update(delta);
	},
	
	render(delta) {
		this.context.fillStyle = "black";
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height);

		switch(this.state) {
			case engine.STATE.LOADING:
				this.context.fillStyle = "white";
				this.context.fillText(this.resources.loaded + "/" + this.resources.count, 50, 50);
				break;
			
			case engine.STATE.START:
				/*this.context.drawImage(this.background, this.background.width/2 - this.canvas.width/2 + this.origin.x/20,
														this.background.height/2 - this.canvas.width/2 + this.origin.y/20,
														this.canvas.width, this.canvas.height, 0, 0,
														this.canvas.width, this.canvas.height);*/
				if(engine.STARS)
					for(var i = 0; i < this.stars.length; i++)
						this.stars[i].render(this.context, this.origin);
				for(var i = 0; i < this.sprites.length; i++)
					this.sprites[i].render(this.context, this.origin);
				break;
		}
		
		this.frames++;
		this.time += delta;
		this.context.fillStyle = "white";
		this.context.fillText(Math.floor(this.frames/this.time) + " fps\nTime warp: " + engine.TIMEWARP + " Zoom level: " + sprite.SCALE + " Speed: " + (this.player ? this.player.veloc.norm : 0), 50, 50);
		
	},
	
	start() {
		this.input = new input.inputHandler(this);
		this.input.start();
		
		for(var i = 0; i < 10000; i++)
			this.stars.push(new stars.Star(this, new math.Vector(	-12500 + 25000*Math.random(),
																	-12500 + 25000*Math.random()),
																	1 + 2*Math.random(), 
																	stars.COLORS[Math.floor(stars.COLORS.length*Math.random())], 
																	50 + 4500*Math.random()));
		
		this.stars.sort(function(star1, star2){
			return star1.depth < star2.depth;
		});
		
		window.animFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame 			||
			window.mozRequestAnimationFrame    			||
			window.oRequestAnimationFrame      			||
			window.msRequestAnimationFrame     			||
			null;

		if (window.animFrame !== null) {
			this.renderhook(this, window.performance.now());
		} else {
			var ONE_FRAME_TIME = 1000.0 / 60.0 ;
			setInterval(this.render, ONE_FRAME_TIME );
		}
		
		this.updatehook(this, window.performance.now());
		
		this.hactions[input.KEYBOARD.W] = function() { this.player.thrust.add(math.nj); };
		this.hactions[input.KEYBOARD.A] = function() { this.player.thrust.add(math.ni); };
		this.hactions[input.KEYBOARD.S] = function() { this.player.thrust.add(math.j); };
		this.hactions[input.KEYBOARD.D] = function() { this.player.thrust.add(math.i); };
		this.hactions[input.KEYBOARD.Q] = function() { this.player.heading -= .01; this.player.heading %= 2*Math.PI; };
		this.hactions[input.KEYBOARD.E] = function() { this.player.heading += .01; this.player.heading %= 2*Math.PI; };
		this.sactions[input.KEYBOARD.X] = function() { this.player.thrust = math.zeros(3); };
		this.sactions[input.KEYBOARD.Z] = function() { this.player.settings ^= ship.SETTINGS.DAMPEN; };
		this.sactions[input.KEYBOARD.Y] = function() {
			//this.sprites.push(new ship.Ship(this, new math.Vector(600, 0), 0, Math.pi/2, 3000000000000000, 50, 50, {0 : [this.resources.images["earth"]]}));

			this.sprites.push(new planets.Planet(this, new math.Vector(7000000, 0), 0, Math.pi/2, 6000000000000000000000000, 1399999, 1499999, "20, 100, 20", "0, 0, 245"));
		};
		this.sactions[input.KEYBOARD.U] = function() {
			this.player.veloc = new math.Vector(Math.sqrt(this.player.accel.norm*this.player.pos.minus(this.sprites[1].pos).norm)).rotate(this.player.accel.theta + Math.PI/2);
		};
		this.sactions[input.KEYBOARD.DASH] = function() {
			sprite.SCALE /= 2;
		};
		this.sactions[input.KEYBOARD.EQUALSIGN] = function() {
			sprite.SCALE *= 2;
		};
		this.sactions[input.KEYBOARD["9"]] = function() {
			engine.TIMEWARP /= 2;
		};
		this.sactions[input.KEYBOARD["0"]] = function() {
			engine.TIMEWARP *= 2;
		};
		
		this.resources.start();
		this.resources.push("ship", "ship.png");
		this.resources.push("background", "background.png");
		this.resources.push("earth", "ship.png");
		this.resources.load();
		
		
	},
	
	updatehook(e, lastime) {
		var now = window.performance.now();
		var delta = (now - lastime)/1000;
		e.update(delta);
		window.setTimeout(function() {
			e.updatehook(e, now);
		}, 1000/120);
	},
	
	renderhook(e, lastime) {
		var now = window.performance.now();
		var delta = (now - lastime)/1000;
		
		e.render(delta);
		window.animFrame(function() {
			e.renderhook(e, now);
		});
	},
	
	onresourceload() {
		this.background = this.resources.images["background"];
		
		var g = {};
		g[sprite.STATE.NORMAL] = [];
		g[sprite.STATE.NORMAL][0] = this.resources.images["ship"];
		
		this.player = new ship.Ship(this, 0, 0, Math.PI/3, 20, 64, 96, g);
		this.sprites.push(this.player);
		
		this.origin = this.player.pos;
		
		this.state = engine.STATE.START;
		
	}
}