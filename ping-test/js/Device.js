var Device = function(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.hasPinged = false;
    this.soundDist = 0;
};

Device.prototype.ping = function() {
    this.hasPinged = true;
};

Device.prototype.dist = function(that) {
    return Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y));
};
