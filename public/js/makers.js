var Makers = Makers || (function() {
  'use strict';

  return {
    CollisionDetector: function(type) {
      return function(players) {
        for (var id in players) {
          type.detectCollision(players[id]);
        }
      };
    }
  };

})();