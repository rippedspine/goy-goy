(function() {
  'use strict';

  var Vector = require('../../../shared/vector.js')
    , Renderable = require('./renderable.js');

  var Tail = function(options) {
    this.numPoints = options.points;
    this.origin    = options.origin;
    this.direction = options.direction;
    this.friction  = options.friction;
    this.k         = options.stiffness;
    this.alpha     = options.alpha || 1;
    this.context   = Renderable.context;
    this.lineWidth = 1;
    this.points    = [];

    this.create();
  };

  Tail.prototype.create = function() {
    var ox = this.origin.x
      , oy = this.origin.y
      , direction = this.direction
      , friction = this.friction;

    for (var i = 0; i < this.numPoints; i++) {
      this.points.push(new Vector({
        x         : ox,
        y         : oy,
        direction : direction,
        friction  : friction
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

  Tail.prototype.draw = function(color) {
    var context = this.context
      , points = this.points
      , p;

    context.save();
    context.globalAlpha = this.alpha;
    context.beginPath();

    for (var i = 0; i < points.length; i++) {
      p = points[i];
      context.lineTo(p.x, p.y);
    }
    context.lineWidth   = this.lineWidth;
    context.lineCap     = 'round';
    context.strokeStyle = color;
    context.shadowColor = color;
    context.shadowBlur  = 20;
    context.stroke();
    context.restore();
  };

  Tail.prototype.update = function() {
    var points = this.points
      , p;
    for (var i = 0; i < points.length; i++) {
      p = points[i];
      p.updatePhysics();
    }
  };

  module.exports = Tail;

})(this);