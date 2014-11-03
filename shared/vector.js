(function() {	
	'use strict';

  var Vector = function(options) {
    this.x = options.x;
    this.y = options.y;

    this.ox = options.x;
    this.oy = options.y;

    this.direction = options.direction || 0;
    this.speed = options.speed || 0;

    this.gravity = options.gravity || 0;
    this.bounciness = options.bounciness || -1;
    this.friction = options.friction || 1;
    this.mass = options.mass || 1;
    this.radius = options.radius || 0;

    this.vx = Math.cos(this.direction) * this.speed;
    this.vy = Math.sin(this.direction) * this.speed;

    this.springs = [];
    this.gravitations = [];
  };

  Vector.prototype.updatePhysics = function() {
    this.handleSprings();
    this.handleGravitations();
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
  };

  Vector.prototype.addGravitation = function(p) {
    this.removeGravitation(p);
    this.gravitations.push(p);
  };

  Vector.prototype.removeGravitation = function(p) {
    for (var i = 0; i < this.gravitations.length; i += 1) {
      if (p === this.gravitations[i]) {
        this.gravitations.splice(i, 1);
        return;
      }
    }
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
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  };

  Vector.prototype.setSpeed = function(speed) {
    var heading = this.getHeading();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  };

  Vector.prototype.getHeading = function() {
    return Math.atan2(this.vy, this.vx);
  };

  Vector.prototype.setHeading = function(heading) {
    var speed = this.getSpeed();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  };

  Vector.prototype.accelerate = function(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  };

  Vector.prototype.angleTo = function(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
  };

  Vector.prototype.distanceTo = function(p2) {
    var dx = p2.x - this.x
      , dy = p2.y - this.y;

    return Math.sqrt((dx * dx) + (dy * dy));
  };

  Vector.prototype.handleGravitations = function() {
    for (var i = 0; i < this.gravitations.length; i += 1) {
      this.gravitateTo(this.gravitations[i]);
    }
  };

  Vector.prototype.handleSprings = function() {
    for (var i = 0; i < this.springs.length; i += 1) {
      var spring = this.springs[i];
      this.springTo(spring.point, spring.k, spring.length);
    }
  };

  Vector.prototype.gravitateTo = function(p2) {
    var dx = p2.x - this.x
      , dy = p2.y - this.y
      , distSQ = dx * dx + dy * dy
      , dist = Math.sqrt(distSQ)
      , force = p2.mass / distSQ

      , ax = dx / dist * force
      , ay = dy / dist * force;

    this.vx += ax;
    this.vy += ay;
  };

  Vector.prototype.springTo = function(point, k, length) {
    var dx = point.x - this.x
      , dy = point.y - this.y
      , distance = Math.sqrt(dx * dx + dy * dy)
      , springForce = (distance - length || 0) * k

      , vx = this.vx + dx / distance * springForce
      , vy = this.vy + dy / distance * springForce;

    this.vx = isNaN(vx) ? 0 : vx;
    this.vy = isNaN(vy) ? 0 : vy;
  };

	module.exports = Vector;
	
})(this);
