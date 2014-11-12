(function() {
  'use strict';

  var config = require('../../shared/config.js')
    , utils = require('../../shared/utils.js')
    , Renderable = require('./shapes/renderable.js')
    , StarField = require('./shapes/starfield.js')
    , BlobGroup = require('./shapes/blobgroup.js')
    , getColorValues = utils.color.getValues;

  var Stage = function() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    Renderable.context = this.context;

    this.width  = this.canvas.width  = config.area.size[0];
    this.height = this.canvas.height = config.area.size[1];

    this.starField = new StarField({
      numStars: 200,
      width: this.width,
      height: this.height,
      context: Renderable.context
    });

    this.blobGroup = new BlobGroup({
      area: [this.width, this.height],
      numBlobs: 5
    });

    this.setSize();
    window.addEventListener('resize', this.setSize.bind(this));
    document.body.appendChild(this.canvas);
  };

  Stage.prototype.render = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.starField.draw();
    this.blobGroup.draw();
  };

  Stage.prototype.setCollision = function(color) {
    this.blobGroup.startColorCycleTime = new Date();
    this.blobGroup.currentHue = getColorValues(this.blobGroup.color)[0];
    this.blobGroup.collisionHue = getColorValues(color)[0];
  };

  Stage.prototype.setSize = function() {
    var ww = window.innerWidth
      , wh = window.innerHeight
      , nh = ww * config.area.ratioFactor.h;
      
    this.canvas.style.width  = ww + 'px';
    this.canvas.style.height = nh + 'px';
    this.canvas.style.top    = wh * 0.5 - nh * 0.5 + 'px';

    Renderable.context.zoom = this.canvas.zoom = config.area.size[0] / ww;
  };

  module.exports = Stage;

})(this);