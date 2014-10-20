var _ = require('lodash')
  , utils = require('./server-utils.js')
  , constants = require('./server-constants.js')
  , radiusRange = constants.radius.triangle
  , area = constants.area
  , amount = constants.amount.triangles;

var Triangle = function(position) {
  this.position = position;
  this.color = utils.getRandomColor();
  this.radius = utils.getRandomInt(radiusRange);
  this.vertices = utils.getVertices(3, this.radius);
};

var Collection = function() {
  this.triangles = {};

  this.spawn = function() {
    for (var id = 0; id < amount; id++) {
      this.triangles[id] = new Triangle(utils.getRandomPosition(area));
    }
  };

  this.getAll = function() {
    return this.triangles;  
  };

  this.removeDead = function(id) {
    delete this.triangles[id];
    this.resurrect(id);
  };

  this.resurrect = function(id) {
    this.triangles[id] = new Triangle(utils.getRandomPosition(area));
  };
};

module.exports = {
  Triangle: Triangle,
  Collection: Collection
};