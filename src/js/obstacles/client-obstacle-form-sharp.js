(function() {
  'use strict';

  var ObstacleBase = require('./client-obstacle-base-model.js')
    , Shape    = require('../shapes/_shapes.js')
    , utils    = require('../../../shared/utils.js')
    , inherits = utils.inherits

    , Client = { Obstacle: {} };
  
  Client.Obstacle.Sharp = function(data) {
    ObstacleBase.call(this, data);
    this.shape = new Shape.Polygon(data);
  };

  inherits(Client.Obstacle.Sharp, ObstacleBase);

  Client.Obstacle.Sharp.prototype.update = function() {
    this.rotate();
    this.onCollision();
    utils.vector.wrapBounce(this.position, this.boundary);
    this.position.updatePhysics();
    this.shape.x = this.position.x;
    this.shape.y = this.position.y;
  };

  module.exports = Client.Obstacle.Sharp;

})(this);