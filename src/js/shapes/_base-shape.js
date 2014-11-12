(function() {
  'use strict';

  var Renderable = require('./renderable.js')
    , easing = require('../easing.js')
    , easeIn = easing.easeIn
    , easeOut = easing.easeOut

    , min = Math.min;

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

    this.updateHz   = options.updateHz || 0.05;
    this.alpha      = options.alpha || 1;
    this.scale      = options.scale || 1;
    
    this.rotation      = options.rotation || 0;
    this.lineWidth     = options.lineWidth || 1;
    this.isFilled      = options.isFilled || false;
    this.shadowBlur    = options.shadowBlur || 40;
    this.shadowOffsetX = options.shadowOffsetX || 0;
    this.shadowOffsetY = options.shadowOffsetY || 0;

    this.blendMode = options.blendMode || false;

    this.context = Renderable.context;
  };

  BaseShape.prototype.setUpFade = function(options) {
    if (arguments.length === 0) {options = {};}
    this.startTime   = new Date();
    this.willFadeIn  = options.willFadeIn || true;

    this.startAlpha = options.startAlpha || 0.5;
    this.startScale = options.startScale || 0.5;
    this.endScale   = options.endScale || 1;

    this.alpha = this.startAlpha;
    this.scale = this.startScale;
  };

  BaseShape.prototype.beginDraw = function() {
    var context = this.context;
    context.save();
    context.translate(this.x, this.y);
    context.scale(this.scale, this.scale);
    context.rotate(this.rotation);
    context.globalAlpha   = this.alpha;
    context.shadowColor   = this.color;
    context.shadowBlur    = this.shadowBlur;
    context.shadowOffsetX = this.shadowOffsetX;
    context.shadowOffsetY = this.shadowOffsetY;
    if (this.blendMode) {
      context.globalCompositeOperation = this.blendMode;
    }
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

    if (this.willFadeIn) {this.fadeIn();}
    if (this.willFadeOut) {this.fadeOut();}

    context.restore();
  };

  BaseShape.prototype.fadeIn = function() {
    var time = new Date() - this.startTime
      , duration = 400;
    if (time < duration) {
      this.alpha = easeIn(time, 0.5, 1, duration);
      this.scale = min(easeIn(time, 0.5, 1, duration), 1);
    }
  };

  BaseShape.prototype.fadeOut = function() {
    var time = new Date() - this.startFadeOutTime
      , duration = 1000;
    if (time < duration) {
      this.alpha = easeOut(time, 1, 1, duration);
      this.scale = easeOut(time, 1, 1.5, duration);
    }
  };

  module.exports = BaseShape;

})(this);