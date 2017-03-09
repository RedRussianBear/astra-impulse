/* Main engine */

engine = {};

engine.STATE = {
	"START" : 0
};

engine.Engine = function(canvasid) {
	this.canvas = document.getElementById(canvasid);
	this.context = this.canvas.getContext("2d");
	
	this.sprites = [];
	this.actions = {};
	
	this.update = function(delta) {
		for(key in this.actions)
			if(this.input.keyboard[key] == input.STATE.DOWN) this.actions[key].call(this);
		for(var i = 0; i < this.sprites.length; i++)
			this.sprites[i].update(delta);
		this.input.update(delta);
	}
	
	this.render = function() {
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
		for(var i = 0; i < this.sprites.length; i++)
			this.sprites[i].render(this.context, this.origin);
	}
	
	this.start = function() {
		this.input = new input.inputHandler(this);
		this.input.start();
		
		window.animFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame 			||
			window.mozRequestAnimationFrame    			||
			window.oRequestAnimationFrame      			||
			window.msRequestAnimationFrame     			||
			null;

		if (window.animFrame !== null) {
			this.renderhook(this);
		} else {
			var ONE_FRAME_TIME = 1000.0 / 60.0 ;
			setInterval(this.render, ONE_FRAME_TIME );
		}
		
		this.updatehook(this, window.performance.now());
		
		this.actions[input.KEYBOARD.W] = function() { this.player.thrust.add(math.nj); };
		this.actions[input.KEYBOARD.A] = function() { this.player.thrust.add(math.ni); };
		this.actions[input.KEYBOARD.S] = function() { this.player.thrust.add(math.j); };
		this.actions[input.KEYBOARD.D] = function() { this.player.thrust.add(math.i); };
		this.actions[input.KEYBOARD.X] = function() { this.player.thrust = math.zeros(3); };
		this.actions[input.KEYBOARD.Z] = function() { this.player.settings ^= ship.SETTINGS.DAMPEN; };
		
			g = {};
			g[sprite.STATE.NORMAL] = [];
			g[sprite.STATE.NORMAL][0] = document.getElementById("shiba");
		
		this.player = new ship.Ship(this, 0, 0, 20, 50, 50, g);
		this.sprites.push(this.player);
		
		this.origin = this.player.pos;
	}
	
	this.updatehook = function(e, lastime) {
		var now = window.performance.now();
		var delta = (now - lastime)/1000;
		e.update(delta);
		window.setTimeout(function() {
			e.updatehook(e, now);
		}, 1000/120);
	}
	
	this.renderhook = function(e) {
			e.render();
			window.animFrame(function() {
				e.renderhook(e);
			});
	}
}