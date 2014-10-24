var Geometry = Geometry || (function(utils) {
  'use strict';

  var Geometry = function(options) {
    this.radius = options.radius || 0;
    this.position = options.position || [0, 0];
    this.color = options.color || '#000';
    this.rotation = options.rotation || 0;
    this.type = options.type || 'polygon';

    this.alpha = 1;
    this.scale = 1;
    this.strokeWidth = 1;
    this.isFilled = false;
    
    this.vertices = [];
  };

  Geometry.prototype.draw = function(context) {
    this.context = context;

    var x = this.position[0]
      , y = this.position[1];

    this.context.save();
    this.context.translate(x, y);
    this.context.rotate(this.rotation);
    this.context.scale(this.scale, this.scale);
    this.context.beginPath();

    this.type === 'polygon' ? this.drawPolygon() : this.drawCircle();

    this.context.closePath();
    this.context.globalAlpha = this.alpha;
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.strokeWidth;
    this.context.stroke();
    if (this.isFilled) {
      this.context.fillStyle = this.color;
      this.context.fill();
    }
    this.context.restore();
  };

  Geometry.prototype.drawPolygon = function() {
    var xv, yv;
    for (var i = 0; i < this.vertices.length; i++) {
      xv = this.vertices[i][0];
      yv = this.vertices[i][1];
      i === 0 ? this.context.moveTo(xv, yv) : this.context.lineTo(xv, yv);
    }
  };

  Geometry.prototype.drawCircle = function() {
    this.context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
  };

  return Geometry;

})(Utils);
