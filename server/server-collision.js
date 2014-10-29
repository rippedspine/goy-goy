(function() {
  'use strict';

  var Collision = function(player, obstacles) {
    for (var id in obstacles) {
      if (circleCollision(player, obstacles[id])) {
        return {
          playerID: player.id,
          obstacle: obstacles[id]
        };
      }
    }
  };

  var distance = function(v1, v2) {
    var dx = v2.x - v1.x
      , dy = v2.y - v1.y;
    return Math.sqrt(dx * dx + dy * dy); 
  };

  var circlePointCollision = function(p, c) {
    return distance(p, c.position) < c.radius;
  };

  var circleCollision = function(c1, c2) {
    return distance(c1.position, c2.position) <= c1.radius + c2.radius;
  };

  module.exports = Collision;

})(this);