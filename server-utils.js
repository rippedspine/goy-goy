var constants = require('./server-constants.js')
  , color = constants.color;

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
  getRandomColor: function() {
    return 'hsl(' + [
      this.getRandomInt(color.range), 
      color.saturation, 
      color.luma
    ].join(',') + ')';
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
  }
};