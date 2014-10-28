(function() {
  'use strict';

  var Geometry = require('../geometry.js');

  var TriangleModel = function(serverData) {
    this.id = serverData.id;

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

    this.sendDeadEvent = new CustomEvent('deadObstacle', {
      'detail': {'id': null}
    });
  };

  TriangleModel.prototype = Object.create(Geometry.prototype);

  TriangleModel.prototype.update = function() {
    this.rotate();
    this.onCollision();
  };

  TriangleModel.prototype.rotate = function() {
    this.rotation += this.pulseFrequency;
    if (this.rotation > 360) {
      this.rotation = 0;
    }
  };

  TriangleModel.prototype.send = function() {
    return {
      id: this.id,
      rotation: this.rotation,
      alpha: this.alpha,
      scale: this.scale
    };
  };

  TriangleModel.prototype.set = function(data) {
    this.rotation = data.rotation;
    this.alpha = data.alpha;
    this.scale = data.scale;
  };

  TriangleModel.prototype.onCollision = function() {
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
        this.imDead();
      }
    }
  };

  TriangleModel.prototype.imDead = function() {
    this.sendDeadEvent.detail.id = this.id;
    document.dispatchEvent(this.sendDeadEvent);
  };

  module.exports = TriangleModel;

})(this);