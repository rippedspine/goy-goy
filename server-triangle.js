var _ = require('lodash')
  , utils = require('./server-utils.js')
  , constants = require('./server-constants.js')
  , radiusRange = constants.radius.triangle
  , area = constants.area
  , amount = constants.amount.triangles;

var Triangle = function(id, position) {
  this.id = id;
  this.position = position;
  this.rotation = 0;
  this.color = utils.getRandomColor();
  this.radius = utils.getRandomInt(radiusRange);
  this.vertices = utils.getVertices(3, this.radius);
};

Triangle.prototype.set = function(data) {
  this.rotation = data.rotation;
};

var Collection = function() {
  this.triangles = {};

  this.spawn = function() {
    for (var id = 0; id < amount; id++) {
      this.triangles[id] = new Triangle(id, utils.getRandomPosition(area));
    }
  };

  this.get = function(id) {
    if (typeof id === 'undefined') {
      return this.triangles;  
    }
    return this.triangles[id];
  };

  this.removeDead = function(deadID) {
    delete this.triangles[deadID];
    this.resurrect(deadID);
  };

  this.resurrect = function(id) {
    this.triangles[id] = new Triangle(id, utils.getRandomPosition(area));
  };

  this.set = function(data) {
    for (var id in data) {
      this.triangles[id].set(data[id]);
    }
  };
};

module.exports = {
  Triangle: Triangle,
  Collection: Collection
};