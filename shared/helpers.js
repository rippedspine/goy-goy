(function() {
  'use strict';

  var utils = require('./utils.js')
    , config = require('./config.js');

  module.exports = {
    
    getPosition: function(canvas, event) {
      var rect = canvas.getBoundingClientRect()
        , x = event.clientX - rect.left
        , y = event.clientY - rect.top;

      return [x, y];
    },

    getVertices: function(points, radius) {
      var vertices = [];
      for (var i = 0; i < points; i++) {
        var angle = i * 2 * Math.PI / points
          , xv = radius * Math.cos(angle) + utils.rand() * radius * 0.4
          , yv = radius * Math.sin(angle) + utils.rand() * radius * 0.4;
        vertices.push([xv, yv]);
      }
      return vertices;
    },

    getDecay: function(min, max, radius) {
      return min + (max * config.sound.decayRange.indexOf(radius));
    },

    inherits: function(child, parent) {
      child.prototype = Object.create(parent.prototype);
    },

    detectCollision: function(player, obstacles) {
      for (var id in obstacles) {
        if (utils.circleCollision(player, obstacles[id])) {
          return {
            playerID: player.id,
            obstacle: obstacles[id].send()
          };
        }
      }
    }
  };

})(this);