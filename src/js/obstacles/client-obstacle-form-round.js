(function() {
  'use strict';

  var ObstacleBase = require('./client-obstacle-base-model.js')
    , Shape    = require('../shapes/__shape.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits

    , Client = { Obstacle: {} };

  Client.Obstacle.Round = function(data) {
    ObstacleBase.call(this, data);
    this.shape = new Shape.Circle(data);
    this.shape.setUpFade();
  };

  inherits(Client.Obstacle.Round, ObstacleBase);

  Client.Obstacle.Round.prototype.update = function() {
    this.onCollision();
    utils.vector.wrapBounce(this.position, this.boundary);
    this.position.updatePhysics();

    this.shape.x = this.position.x;
    this.shape.y = this.position.y;
  };

  module.exports = Client.Obstacle.Round;

})(this);