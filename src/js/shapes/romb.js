(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits;
  
  var Wave = function(options) {
    BaseShape.call(this, options);
    this.angle = 0;
    this.updateHz = 0.05;
  };
  inherits(Wave, BaseShape);

  Wave.prototype.draw = function() {
    var context = this.context;
    this.beginDraw();

    var grow = 2 + utils.myMath.sin(this.angle) * 4;
    this.angle += this.updateHz;

    context.moveTo((-this.radius * 0.8) + grow, 0);
    context.lineTo(0, this.radius + (grow * 0.5));
    context.lineTo((this.radius * 0.8) - grow, 0);
    context.lineTo(0, -this.radius - (grow * 0.5));

    context.closePath();

    this.endDraw();
  };

  module.exports = Wave;

})(this);