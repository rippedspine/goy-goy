(function() {
  'use strict';

  var Circle = function(options) {
    this.x = options.x;
    this.y = options.y;
    this.color = options.color;
    this.radius = options.radius;

    this.alpha = options.alpha || 1;
    this.scale = options.scale || 1;
    this.lineWidth = options.lineWidth || 1;

    this.isFilled = options.isFilled || false;
  };

  Circle.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.scale(this.scale, this.scale);
    context.globalAlpha = this.alpha;
    context.beginPath();

    context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);

    if (this.isFilled) {
      context.fillStyle = this.color;
      context.fill();
    } else {
      context.strokeStyle = this.color;
      context.lineWidth = this.lineWidth;
      context.stroke();
    }

    context.restore();
  };

  module.exports = Circle;

})(this);