(function() {
  'use strict';

  module.exports = {
    socket: {
      connect: 1,
      disconnect: 2,
      newPlayer: 3,
      sendPlayers: 4,
      updatePlayer: 5,
      deadObstacle: 6,
      updateObstacles: 7,
      collision: 8
    },

    logger: {
      connect: function(id) { console.log('Connected:', id); },
      disconnect: function(id) { console.log('Disconnected:', id); },
      newPlayer: function(id) { console.log('New Player:', id); }
    }
  };

})(this);