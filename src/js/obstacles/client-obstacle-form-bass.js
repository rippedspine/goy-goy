(function() {
  'use strict';

  var ObstacleBase = require('./client-obstacle-base-model.js')
    , Shape    = require('../shapes/__shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits

    , Client = { Obstacle: {} };

  Client.Obstacle.Bassform = function(data) {
    ObstacleBase.call(this, data);
    this.shape = new Shape.Romb(data);
    this.angle = 0;
  };

  inherits(Client.Obstacle.Bassform, ObstacleBase);

  Client.Obstacle.Bassform.prototype.update = function() {
    this.onCollision();
    this.rotate();

    this.shape.x = this.position.x;
    this.shape.y = this.position.y;
  };

  module.exports = Client.Obstacle.Bassform;

})(this);