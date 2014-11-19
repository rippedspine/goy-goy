(function() {	
	'use strict';

  var utils = require('./utils.js');

  var Vector = function(options) {
    this.x  = options.x;
    this.y  = options.y;
    this.ox = options.x;
    this.oy = options.y;
    
    this.direction  = options.direction || 0;
    this.speed      = options.speed || 0;
    this.gravity    = options.gravity || 0;
    this.bounciness = options.bounciness || -1;
    this.friction   = options.friction || 1;
    this.mass       = options.mass || 1;
    this.radius     = options.radius || 0;

    this.vx = utils.myMath.cos(this.direction) * this.speed;
    this.vy = utils.myMath.sin(this.direction) * this.speed;

    this.springs      = [];
  };

  Vector.prototype.updatePhysics = function() {
    this.handleSprings();
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
  };

  Vector.prototype.addSpring = function(point, k, length) {
    this.removeSpring(point);
    this.springs.push({
      point: point,
      k: k,
      length: length || 0
    });
  };

  Vector.prototype.removeSpring = function(point) {
    for (var i = 0; i < this.springs.length; i += 1) {
      if (point === this.springs[i].point) {
        this.springs.splice(i, 1);
        return;
      }
    }
  };

  Vector.prototype.getSpeed = function() {
    return utils.myMath.sqrt(this.vx * this.vx + this.vy * this.vy);
  };

  Vector.prototype.setSpeed = function(speed) {
    var heading = this.getHeading();
    this.vx     = utils.myMath.cos(heading) * speed;
    this.vy     = utils.myMath.sin(heading) * speed;
  };

  Vector.prototype.getHeading = function() {
    return utils.myMath.atan2(this.vy, this.vx);
  };

  Vector.prototype.setHeading = function(heading) {
    var speed = this.getSpeed();
    this.vx   = utils.myMath.cos(heading) * speed;
    this.vy   = utils.myMath.sin(heading) * speed;
  };

  Vector.prototype.angleTo = function(p2) {
    return utils.myMath.atan2(p2.y - this.y, p2.x - this.x);
  };

  Vector.prototype.distanceTo = function(p2) {
    var dx = p2.x - this.x
      , dy = p2.y - this.y;

    return utils.myMath.sqrt((dx * dx) + (dy * dy));
  };

  Vector.prototype.handleSprings = function() {
    for (var i = 0; i < this.springs.length; i += 1) {
      var spring = this.springs[i];
      this.springTo(spring.point, spring.k, spring.length);
    }
  };

  Vector.prototype.springTo = function(point, k, length) {
    var dx = point.x - this.x
      , dy = point.y - this.y
      , distance = utils.myMath.sqrt(dx * dx + dy * dy)
      , springForce = (distance - length || 0) * k

      , vx = this.vx + dx / distance * springForce
      , vy = this.vy + dy / distance * springForce;

    this.vx = isNaN(vx) ? 0 : vx;
    this.vy = isNaN(vy) ? 0 : vy;
  };

	module.exports = Vector;
	
})(this);
