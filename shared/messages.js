(function() {
  'use strict';

  module.exports = {
    socket: {
      connect: 1,
      disconnect: 2,
      newPlayer: 3,
      sendPlayers: 4,
      getPlayers: 4,
      updatePlayer: 5,
      collision: 6,
      deadObstacle: 7,
      updateTriangles: 8,
      updateCircles: 9,
      updateNoiseforms: 10,
      updateBassforms: 11
    },

    logger: {
      connect: function(id) { console.log('Connected:', id); },
      disconnect: function(id) { console.log('Disconnected:', id); },
      newPlayer: function(id) { console.log('New Player:', id); }
    }
  };

})(this);