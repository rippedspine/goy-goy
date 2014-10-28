(function() {
  'use strict';

  var utils = require('../../../shared/utils.js')
    , inherits = require('../../../shared/helpers.js').inherits
    , helpers = require('../../../shared/helpers.js')
    , SharedPlayerModel = require('../../../shared/player/shared-player-model.js')
    , Geometry = require('../geometry.js')
    , Vector = require('../../../shared/vector.js')
    , Mover = require('../../../shared/mover.js');

  var ClientPlayerModel = function() {
    SharedPlayerModel.call(this);
    
    this.didCollide = false;
    this.colorTimer = 1;

    this.pulseAngle = 0;
    this.pulseFrequency = 0.05;
  };

  inherits(ClientPlayerModel, SharedPlayerModel);

  ClientPlayerModel.prototype.setup = function(data) {
    this.set(data);
    this.shape = new Geometry({
      position: this.radius,
      color: '#fff',
      radius: this.radius
    });
    this.shape.vertices = this.vertices;

    this.topSpeed = 4;
  };

  ClientPlayerModel.prototype.update = function() {
    this.pulse();
    this.onCollision();
  };

  ClientPlayerModel.prototype.draw = function(context) {
    this.shape.draw(context);
  };

  ClientPlayerModel.prototype.onCollision = function() {
    if (this.didCollide) {
      this.colorTimer -= 0.05;
      if (this.colorTimer < 0) {
        this.didCollide = false;
        this.colorTimer = 1;
        this.shape.color = '#fff';
      }
    }
  };

  ClientPlayerModel.prototype.pulse = function() {
    this.shape.strokeWidth = 3 + Math.sin(this.pulseAngle) * 2;
    this.pulseAngle += this.pulseFrequency;
  };

  ClientPlayerModel.prototype.move = function(position) {
    this.position = position;
    this.shape.position = this.position;
  };

  module.exports = ClientPlayerModel;
  
})(this);