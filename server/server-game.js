(function() {
  'use strict';

  var ServerGame = function(
    collisionHandler,
    players,
    triangles,
    circles,
    noiseforms,
    bassforms
    ) {

    this.player = null;
    this.players = players;

    this.triangles = triangles;
    this.circles = circles;
    this.noiseforms = noiseforms;
    this.bassforms = bassforms;

    this.collisions = {};
    this.collisionHandler = collisionHandler;
  };

  ServerGame.prototype.handleDeadObstacles = function(data) {
    return this[data.type + 's'].resurrect(data.id);
  };

  ServerGame.prototype.start = function() {
    this.triangles.spawn(10);
    this.circles.spawn(10);
    this.noiseforms.spawn(10);
    this.bassforms.spawn(10);
  };

  ServerGame.prototype.detectCollisions = function() {
    this.collisions.triangles = this.collisionHandler.detectCircle(this.player, this.triangles.get());
    this.collisions.circles = this.collisionHandler.detectCircle(this.player, this.circles.get());
    this.collisions.noiseforms = this.collisionHandler.detectCircle(this.player, this.noiseforms.get());
    this.collisions.bassforms = this.collisionHandler.detectRect(this.player, this.bassforms.get());
  };

  ServerGame.prototype.getCollision = function() {
    for (var type in this.collisions) {
      if (typeof this.collisions[type] !== 'undefined') {
        var id = this.collisions[type].obstacle.id;
        if (!this[type].get(id).shouldBeRemoved) {
          this[type].get(id).shouldBeRemoved = true;
          return this.collisions[type];
        }
      }
    }
  };

  module.exports = ServerGame;

})(this);
