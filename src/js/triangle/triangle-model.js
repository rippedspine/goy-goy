(function() {
  'use strict';

  var Geometry = require('../geometry.js');

  var Model = function(serverData) {
    this.didCollide = false;
    this.fillTimer = 1;
    this.pulseFrequency = 0.02;
    
    this.soundID = serverData.soundID;
    this.soundDecay = serverData.soundDecay;
    this.waveform = serverData.waveform;

    Geometry.call(this, {
      radius: serverData.radius,
      color: serverData.color,
      position: serverData.position,
      rotation: serverData.rotation
    });

    this.vertices = serverData.vertices;
  };

  Model.prototype = Object.create(Geometry.prototype);

  Model.prototype.update = function() {
    this.rotate();
    this.onCollision();
  };

  Model.prototype.rotate = function() {
    this.rotation += this.pulseFrequency;
    if (this.rotation > 360) {
      this.rotation = 0;
    }
  };

  Model.prototype.onCollision = function() {
    if (this.didCollide) {
      this.isFilled = true;
      this.fillTimer -= 0.05;

      if (this.fillTimer < 0) {
        this.isFilled = false;
      }

      this.scale += this.pulseFrequency;
      this.alpha -= this.pulseFrequency;

      if (this.alpha < 0) {
        this.alpha = 0;
      }
    }    
  };

  module.exports = Model;

})(this);