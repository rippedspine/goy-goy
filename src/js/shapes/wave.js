(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils = require('../../../shared/utils.js')
    , inherits = utils.inherits;
  
  var Wave = function(options) {
    BaseShape.call(this, options);
  };
  inherits(Wave, BaseShape);

  Wave.prototype.draw = function(context) {
    this.beginDraw(context);

    context.moveTo(0, 0);
    for (var x = 0; x < this.width; x++) {
      var y = this.height * utils.myMath.sin(x / this.spread);
      context.lineTo(x, y);
    }
    
    this.endDraw(context);
  };

  module.exports = Wave;

})(this);