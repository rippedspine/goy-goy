(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits

    , sin = utils.myMath.sin;
  
  var Wave = function(options) {
    BaseShape.call(this, options);
  };
  inherits(Wave, BaseShape);

  Wave.prototype.draw = function() {
    var context = this.context
      , h = this.height
      , w = this.width
      , s = this.spread
      , x, y;

    this.beginDraw();

    context.moveTo(0, 0);
    for (x = 0; x < w; x++) {
      y = h * sin(x / s);
      context.lineTo(x, y);
    }
    
    this.endDraw();
  };

  module.exports = Wave;

})(this);