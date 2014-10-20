var Helpers = Helpers || (function() {
  'use strict';

  return {
    getPosition: function(canvas, event) {
      var rect = canvas.getBoundingClientRect()
        , x = event.clientX - rect.left
        , y = event.clientY - rect.top;

      return [x, y];
    },

    makeCollisionDetector: function(type) {
      return function(players) {
        for (var id in players) {
          type.detectCollision(players[id]);
        }
      };
    }
  };

})();