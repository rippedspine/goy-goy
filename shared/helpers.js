(function() {
  'use strict';

  var utils = require('./utils.js');

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

    inherits: function(child, parent) {
      child.prototype = Object.create(parent.prototype);
    } 
  };

})(this);