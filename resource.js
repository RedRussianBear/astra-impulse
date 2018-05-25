resource = {};

resource.resourceManager = function (engine) {
    this.engine = engine;
    this.images = {};
    this.count = 0;
    this.loaded = 0;
};

resource.resourceManager.prototype = {
    start() {
        this.images = {};
        this.count = 0;
        this.loaded = 0;
    },
    push(name, src) {
        if (typeof this.images[name] == 'undefined') this.count++;
        this.images[name] = src;
    },
    load() {
        for (name in this.images) {
            var r = this;
            var src = this.images[name];
            this.images[name] = new Image();
            this.images[name].onload = function () {
                r.loaded++;
                if (r.loaded == r.count) r.engine.onresourceload();
            };
            this.images[name].src = src;
        }
    }
};