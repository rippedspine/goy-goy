(function() {
  'use strict';

  var color = require('./config.js').color;

  module.exports = {
    rand: function() {
      return Math.random() - 0.5;
    },

    getRandomInt: function(range) {
      return Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
    },

    getRandomPosition: function(area) {
      return {
        x: this.getRandomInt([0, area[0]]),
        y: this.getRandomInt([0, area[1]])
      };
    },

    getRandomIntFromColorRange: function() {
      var int = this.getRandomInt(color.range);
      return int === 0 ? 1 : int;
    },

    getColor: function(hueDeg) {
      return 'hsl(' + [
        hueDeg, 
        color.saturation, 
        color.luma
      ].join(',') + ')';
    },

    getPosition: function(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    },

    getVertices: function(points, radius) {
      var vertices = [], xv, yv;
      for (var i = 0; i < points; i++) {
        if(radius !== 0) {
          var angle = i * 2 * Math.PI / points;
          xv = radius * Math.cos(angle) + this.rand() * radius * 0.4;
          yv = radius * Math.sin(angle) + this.rand() * radius * 0.4;  
        } else {
          xv = i;
          yv = yv % 2 === 0 ? 0 : 1;
        }
        
        vertices.push({x: xv, y: yv});
      }
      return vertices;
    },

    getDecay: function(min, max, range, radius) {
      return min + (max * range.indexOf(radius));
    },

    inherits: function(child, parent) {
      child.prototype = Object.create(parent.prototype);
    }
  };

})(this);