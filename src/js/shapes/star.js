(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits

    , cos = utils.myMath.cos
    , sin = utils.myMath.sin
    , PI = utils.myMath.PI;

  var Star = function(options) {
    BaseShape.call(this, options);
  };
  inherits(Star, BaseShape);

  Star.prototype.draw = function() {
    var context = this.context;
    this.beginDraw();
    
    var r = this.radius
      , points = this.points
      , angle = 0, radians, x, y;

    for (var i = 0; i < points; i++) {
      radians = angle / 180 * PI;
      x = r * cos(radians);
      y = r * sin(radians);

      context.moveTo(0, 0);
      context.lineTo(x, y);

      angle += 360/points;
    }
    this.isFilled = false;
    this.endDraw();
  };

  module.exports = Star;

})(this);