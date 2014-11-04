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

    distance: function(v1, v2) {
      var dx = v2.x - v1.x
        , dy = v2.y - v1.y;
      return Math.sqrt(dx * dx + dy * dy); 
    },

    getPosition: function(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    },

    getVertices: function(points, radius) {
      var vertices = [];
      for (var i = 0; i < points; i++) {
        var angle = i * 2 * Math.PI / points
          , xv = radius * Math.cos(angle) + this.rand() * radius * 0.4
          , yv = radius * Math.sin(angle) + this.rand() * radius * 0.4;
        vertices.push({x: xv, y: yv});
      }
      return vertices;
    },

    wrapBounce: function(p, rect) {
      if (p.x + p.radius > rect.right) {
        p.x = rect.right - p.radius;
        p.vx *= p.bounciness;
      }
      if (p.x - p.radius < rect.left) {
        p.x = p.radius + rect.left;
        p.vx *= p.bounciness;
      }
      if (p.y + p.radius > rect.bottom) {
        p.y = rect.bottom - p.radius;
        p.vy *= p.bounciness;
      }
      if (p.y - p.radius < rect.top) {
        p.y = p.radius + rect.top;
        p.vy *= p.bounciness;
      }
    },

    getNoiseformVertices: function(points) {
      var vertices = [];
      for (var i = 0; i < points; i++) {
        var xv = i
          , yv = i % 2 === 0 ? 0 : 1;
        vertices.push({x: xv * 10, y: yv * 10});
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