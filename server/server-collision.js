(function() {
  'use strict';

  var Collision = {
    circleCircle: function(player, obstacles) {
      for (var id in obstacles) {
        if (circleCollision(player, obstacles[id])) {
          return {
            playerID: player.id,
            obstacle: obstacles[id]
          };
        }
      }
    },

    circleRect: function(player, obstacles) {
      for (var id in obstacles) {
        if (circleRectCollision(player, obstacles[id])) {
          return {
            playerID: player.id,
            obstacle: obstacles[id]
          };
        }
      }
    }
  };

  var distance = function(v1, v2) {
    var dx = v2.x - v1.x
      , dy = v2.y - v1.y;
    return Math.sqrt(dx * dx + dy * dy); 
  };

  var rangeIntersect = function(min0, max0, min1, max1) {
    return Math.max(min0, max0) >= Math.min(min1, max1) && 
      Math.min(min0, max0) <= Math.max(min1, max1);
  };

  var circlePointCollision = function(p, c) {
    return distance(p, c) < c.radius;
  };

  var circleCollision = function(c1, c2) {
    return distance(c1, c2) <= c1.radius + c2.radius * 1.5;
  };

  var circleRectCollision = function(c, r) {
    return rangeIntersect(c.x, c.x + c.radius, r.x, r.x + r.width) &&
      rangeIntersect(c.y, c.y + c.radius, r.y, r.y + r.height);
  };

  module.exports = Collision;

})(this);