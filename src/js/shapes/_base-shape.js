(function() {
  'use strict';

  var Renderable = require('./renderable.js');

  var BaseShape = function(options) {
    this.x         = options.x;
    this.y         = options.y;

    this.color     = options.color;
    
    this.radius    = options.radius || 0;
    this.points    = options.points || 0;
    this.vertices  = options.vertices || 0;
    this.width     = options.width || 0;
    this.height    = options.height || 0;
    this.spread    = options.spread || 0;
    
    this.rotation   = options.rotation || 0;
    this.alpha      = options.alpha || 1;
    this.scale      = options.scale || 1;
    this.lineWidth  = options.lineWidth || 1;
    this.isFilled   = options.isFilled || false;
    this.shadowBlur = options.shadowBlur || 40;
    this.shadowOffsetX = options.shadowOffsetX || 0;
    this.shadowOffsetY = options.shadowOffsetY || 0;

    this.context = Renderable.context;
  };

  BaseShape.context = null;

  BaseShape.prototype.beginDraw = function() {
    var context = this.context;
    context.save();
    context.translate(this.x, this.y);
    context.scale(this.scale, this.scale);
    context.rotate(this.rotation);
    context.globalAlpha = this.alpha;
    context.shadowColor = this.color;
    context.shadowBlur  = this.shadowBlur;
    context.shadowOffsetX = this.shadowOffsetX;
    context.shadowOffsetY = this.shadowOffsetY;
    context.beginPath();
  };

  BaseShape.prototype.endDraw = function() {
    var context = this.context;
    if (this.isFilled) {
      context.fillStyle = this.color;
      context.fill();
    } else {
      context.strokeStyle = this.color;
      context.lineWidth = this.lineWidth * context.zoom;
      context.stroke();
    }
    context.restore();
  };

  module.exports = BaseShape;

})(this);