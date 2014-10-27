(function() {
  'use strict';

  var utils = require('../../../shared/utils.js')
    , Geometry = require('../geometry.js');

  var Model = function(data) {
    this.id = data.id;
    this.didCollide = false;
    this.colorTimer = 1;

    Geometry.call(this, {
      position: data.position,
      color: '#fff',
      radius: data.radius
    });
    
    this.vertices = data.vertices;

    this.pulseAngle = 0;
    this.pulseFrequency = 0.05;
  };

  Model.prototype = Object.create(Geometry.prototype);

  Model.prototype.update = function() {
    this.pulse();
    this.onCollision();
  };

  Model.prototype.onCollision = function() {
    if (this.didCollide) {
      this.colorTimer -= 0.05;
      if (this.colorTimer < 0) {
        this.didCollide = false;
        this.colorTimer = 1;
        this.color = '#fff';
      }
    }
  };

  Model.prototype.pulse = function() {
    this.strokeWidth = 3 + Math.sin(this.pulseAngle) * 2;
    this.pulseAngle += this.pulseFrequency;
  };

  Model.prototype.move = function(position) {
    this.position = position;
  };

  Model.prototype.send = function() {
    return {
      id: this.id,
      position: this.position,
      vertices: this.vertices,
    };
  };

  module.exports = Model;
})(this);