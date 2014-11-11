(function() {
  'use strict';

  var BaseShape = require('./_base-shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits;

  var Polygon = function(options) {
    BaseShape.call(this, options);
    this.blendMode = options.blendMode;
    this.rotation = options.rotation;
  };
  inherits(Polygon, BaseShape);

  Polygon.prototype.draw = function() {
    var context = this.context;
    this.beginDraw();

    for (var i = 0; i < this.vertices.length; i++) {
      var v = this.vertices[i];
      if (i === 0) {
        context.moveTo(v.x, v.y);
      } else {
        context.lineTo(v.x, v.y);
      }
    }
    context.closePath();

    if(this.blendMode) {
      context.globalCompositeOperation = this.blendMode;
    }
    
    this.endDraw();
  };

  module.exports = Polygon;

})(this);