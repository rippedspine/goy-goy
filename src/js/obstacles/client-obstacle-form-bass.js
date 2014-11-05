(function() {
  'use strict';

  var ObstacleBase = require('./client-obstacle-base-model.js')
    , Shape    = require('../shapes/_shapes.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits

    , Client = { Obstacle: {} };

  Client.Obstacle.Bassform = function(data) {
    ObstacleBase.call(this, data);
    this.shape = new Shape.Wave(data);

    this.position.setSpeed(0);

    this.angle        = 0;
    this.shape.growth = data.growth;
    this.shape.height = data.height;
    this.shape.width  = data.width;
  };

  inherits(Client.Obstacle.Bassform, ObstacleBase);

  Client.Obstacle.Bassform.prototype.update = function() {
    this.onCollision();
    this.pulse();

    this.shape.isFilled = false;
    this.shape.x        = this.position.x;
    this.shape.y        = this.position.y;
  };

  Client.Obstacle.Bassform.prototype.pulse = function() {
    this.shape.growth = 6 + utils.myMath.sin(this.angle) * 0.5;
    this.angle += this.updateHz;
  };

  module.exports = Client.Obstacle.Bassform;

})(this);