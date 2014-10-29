(function() {
  'use strict';

  var utils = require('../../shared/utils.js');

  var Geometry = function(options) {
    this.position = options.position;
    this.color = options.color;
    this.radius = options.radius || 0;
    this.rotation = options.rotation || 0;
    this.vertices = options.vertices || false;
    this.alpha = options.alpha || 1;
    this.scale = options.scale || 1;

    this.strokeWidth = 1;
    this.isFilled = false;
  };

  Geometry.prototype.draw = function(context) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.scale(this.scale, this.scale);
    context.beginPath();

    if (this.vertices) {
      this.drawPolygon(context);
    } else {
      this.drawCircle(context);
    }

    context.closePath();
    context.globalAlpha = this.alpha;
    context.strokeStyle = this.color;
    context.lineWidth = this.strokeWidth;
    context.stroke();
    if (this.isFilled) {
      context.fillStyle = this.color;
      context.fill();
    }
    context.restore();
  };

  Geometry.prototype.drawPolygon = function(context) {
    var xv, yv;
    for (var i = 0; i < this.vertices.length; i++) {
      xv = this.vertices[i].x;
      yv = this.vertices[i].y;
      if (i === 0) {
        context.moveTo(xv, yv);
      } else {
        context.lineTo(xv, yv);
      }
    }
  };

  Geometry.prototype.drawCircle = function(context) {
    context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
  };

  module.exports = Geometry;

})(this);