(function() {
  'use strict';

  var Vector = require('../../shared/vector.js');

  var Tail = function(options) {
    this.numPoints = options.points;
    this.origin = options.origin;
    this.direction = options.direction;
    this.friction = options.friction;
    this.k = options.stiffness;
    this.lineWidth = 1;
    this.points = [];
    this.create();
  };

  Tail.prototype.create = function() {
    for (var i = 0; i < this.numPoints; i++) {
      this.points.push(new Vector({
        x: this.origin.x,
        y: this.origin.y,
        direction: this.direction,
        friction: this.friction
      }));
    }
  };

  Tail.prototype.addSpringsTo = function(object) {
    for (var i = 0; i < this.points.length; i++) {
      if (i === 0) {
        this.points[i].addSpring(object, this.k);
      } else {
        this.points[i].addSpring(this.points[i - 1], this.k);
      }
    }
  };

  Tail.prototype.draw = function(context, color) {
    context.beginPath();
    for (var i = 0; i < this.points.length; i++) {
      context.lineTo(this.points[i].x, this.points[i].y);
    }
    context.lineWidth = this.lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.stroke();
  };

  Tail.prototype.update = function() {
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].updatePhysics();
    }
  };

  module.exports = Tail;

})(this);