(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits;
  
  var Wave = function(options) {
    BaseShape.call(this, options);
  };
  inherits(Wave, BaseShape);

  Wave.prototype.draw = function(context) {
    this.beginDraw(context);

    context.moveTo(this.width * -0.5, 0);
    context.lineTo(0, (this.width * 1.5) * 0.5);
    context.lineTo(this.width * 0.5, 0);
    context.lineTo(0, (this.width * 1.5) * -0.5);

    context.closePath();

    this.endDraw(context);
  };

  module.exports = Wave;

})(this);