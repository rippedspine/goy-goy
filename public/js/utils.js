var Utils = Utils || (function() {
  'use strict';

  return {
    rand: function() {
      return Math.random() - 0.5;
    },
    distance: function(v1, v2) {
      var dx = v2[0] - v1[0]
        , dy = v2[1] - v1[1];
      return Math.sqrt(dx * dx + dy * dy);
    },
    distanceXY: function(v1, v2) {
      var dx = v2[0] - v1[0]
        , dy = v2[1] - v1[1];
      return Math.sqrt(dx * dx + dy * dy);
    },
    circleCollision: function(c1, c2) {
      return this.distance(c1.position, c2.position) <= c1.radius + c2.radius;
    },
    circlePointCollision: function(point, circle) {
      return this.distanceXY(point, circle.position) < circle.radius;
    }
  };

})();
