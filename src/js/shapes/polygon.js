(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils = require('../../../shared/utils.js')
    , inherits = utils.inherits;

  var Polygon = function(options) {
    BaseShape.call(this, options);
  };
  inherits(Polygon, BaseShape);

  Polygon.prototype.draw = function(context) {
    this.beginDraw(context);

    for (var i = 0; i < this.vertices.length; i++) {
      if (i === 0) {
        context.moveTo(this.vertices[i].x, this.vertices[i].y);
      } else {
        context.lineTo(this.vertices[i].x, this.vertices[i].y);
      }
    }
    context.closePath();
    
    this.endDraw(context);
  };

  module.exports = Polygon;

})(this);