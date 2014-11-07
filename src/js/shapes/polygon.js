(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits;

  var Polygon = function(options) {
    BaseShape.call(this, options);
  };
  inherits(Polygon, BaseShape);

  Polygon.prototype.draw = function(context) {
    this.beginDraw(context);

    for (var i = 0; i < this.vertices.length; i++) {
      var vertice = this.vertices[i];
      if (i === 0) {
        context.moveTo(vertice.x, vertice.y);
      } else {
        context.lineTo(vertice.x, vertice.y);
      }
    }
    context.closePath();
    
    this.endDraw(context);
  };

  module.exports = Polygon;

})(this);