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

    context.moveTo(-this.radius + grow + 6, 0);
    context.lineTo(-this.radius * 1.5 + grow + 6, 0);
    context.moveTo(0, this.radius);
    context.lineTo(0, this.radius * 1.5);
    context.moveTo(this.radius - grow - 6, 0);
    context.lineTo(this.radius * 1.5 - grow - 6, 0);
    context.moveTo(0, -this.radius);
    context.lineTo(0, -this.radius * 1.5);    

    this.isFilled = false;
    this.endDraw();
  };

  module.exports = Wave;

})(this);