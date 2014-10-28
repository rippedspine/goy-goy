(function() {
  'use strict';

  var utils = require('../shared/utils.js');

  var Game = function(playerCollection, triangleCollection) {
    this.players = playerCollection;
    this.triangles = triangleCollection;
    this.player = null;
  };

  Game.prototype.detectCollision = function(player, obstacles) {
    for (var id in obstacles) {
      if (utils.circleCollision(player, obstacles[id])) {
        return {
          playerID: player.id,
          obstacle: obstacles[id].send()
        };
      }
    }
  };

  module.exports = Game;

})(this);