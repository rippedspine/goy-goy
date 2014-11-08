(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits;

  var Circle = function(options) {
    BaseShape.call(this, options);
  };
  inherits(Circle, BaseShape);

  Circle.prototype.draw = function() {
    this.beginDraw();
    BaseShape.context.arc(0, 0, this.radius, 0, 2 * utils.myMath.PI, false);
    this.endDraw();
  };

  module.exports = Circle;

})(this);