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
      return [
        this.getRandomInt([0, area[0]]),
        this.getRandomInt([0, area[1]])
      ];
    },
    getRandomRangeInt: function() {
      return this.getRandomInt(color.range);
    },
    getRandomColor: function(rangeint) {
      return 'hsl(' + [
        rangeint, 
        color.saturation, 
        color.luma
      ].join(',') + ')';
    },
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
          , xv = radius * Math.cos(angle) + this.rand() * radius * 0.4
          , yv = radius * Math.sin(angle) + this.rand() * radius * 0.4;
        vertices.push([xv, yv]);
      }
      return vertices;
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

})(this);