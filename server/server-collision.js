(function() {
  'use strict';

  var utils = require('../shared/utils.js');

  var CollisionHandler = function() {};

  CollisionHandler.prototype.detectCircle = function(player, obstacles) {
    for (var id in obstacles) {
      if (this.circleCollision(player, obstacles[id])) {
        return {
          playerID: player.id,
          obstacle: obstacles[id]
        };
      }
    }
  };

  CollisionHandler.prototype.detectRect = function(player, obstacles) {
    for (var id in obstacles) {
      if (this.circleRectCollision(player, obstacles[id])) {
        return {
          playerID: player.id,
          obstacle: obstacles[id]
        };
      }
    }
  };

  CollisionHandler.prototype.circleCollision = function(c0, c1) {
    return utils.vector.distance(c0, c1) <= (c0.radius * 1.5) + c1.radius;
  };

  CollisionHandler.prototype.circleRectCollision = function(c, r) {
    return utils.vector.rangeIntersect(c.x, c.x + c.radius, r.x, r.x + r.width) &&
      utils.vector.rangeIntersect(c.y, c.y + c.radius, r.y, r.y + r.height);
  };

  module.exports = CollisionHandler;

})(this);