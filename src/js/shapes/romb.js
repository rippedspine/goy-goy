(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits
    , PI = Math.PI
    , PI2 = PI * 2
    , cos = Math.cos
    , sin = Math.sin;
  
  var Wave = function(options) {
    BaseShape.call(this, options);
    this.angle = 0;
    this.updateHz = 0.05;
  };
  inherits(Wave, BaseShape);

  Wave.prototype.draw = function() {
    var sides = this.points //this.id + 3
    ,   a = PI2 / sides
    ,   context = this.context;
    
    this.beginDraw();

    context.moveTo(this.radius, 0);
    for (var i = 1; i < sides; i++) {
      context.lineTo(this.radius * cos(a * i), this.radius * sin(a * i));
    }
    context.closePath();

    var angle = 0, radians, x, y;
    for (var j = 0; j < sides; j++) {
      radians = angle / 180 * PI;
      x = this.radius * cos(radians);
      y = this.radius * sin(radians);

      context.moveTo(x, y);
      context.lineTo(x * 1.25, y * 1.25);

      angle += 360/sides;
    }
    this.endDraw();
  };

  module.exports = Wave;

})(this);