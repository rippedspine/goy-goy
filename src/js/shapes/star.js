(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits;

  var Star = function(options) {
    BaseShape.call(this, options);
  };
  inherits(Star, BaseShape);

  Star.prototype.draw = function(context) {
    this.beginDraw(context);
    
    var angle = 0, radians, x, y;
    for (var i = 0; i < this.points; i++) {
      radians = angle / 180 * utils.myMath.PI;
      x = this.radius * utils.myMath.cos(radians);
      y = this.radius * utils.myMath.sin(radians);

      context.moveTo(0, 0);
      context.lineTo(x, y);

      angle += 360/this.points;
    }

    this.endDraw(context);
  };

  module.exports = Star;

})(this);