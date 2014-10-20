var Polygon = Polygon || (function(utils) {
  'use strict';

  var Polygon = function(options) {
    this.radius = options.radius;
    this.position = options.position;
    this.color = options.color;

    this.alpha = 1;
    this.scale = 1;
    this.strokeWidth = 1;
    this.isFilled = false;
    
    this.vertices = [];
  };

  Polygon.prototype.draw = function(context) {
    var x = this.position[0]
      , y = this.position[1]
      , xv, yv;
    context.save();
    context.translate(x, y);
    context.scale(this.scale, this.scale);
    context.beginPath();
    for (var i = 0; i < this.vertices.length; i++) {
      xv = this.vertices[i][0];
      yv = this.vertices[i][1];
      i === 0 ? context.moveTo(xv, yv) : context.lineTo(xv, yv);
    }
    context.closePath();
    context.globalAlpha = this.alpha;
    context.strokeStyle = this.color;
    context.lineWidth = this.strokeWidth;
    if (this.isFilled) {
      context.fillStyle = this.color;
      context.fill();
    }
    context.stroke();
    context.restore();
  };

  return Polygon;

})(Utils);
