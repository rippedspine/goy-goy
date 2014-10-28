(function() {
  'use strict';

  var utils = require('../shared/utils.js')
    , config = require('../shared/config.js')
    , amount = config.obstacles.amount
    , area = config.area;

  var Obstacles = function(options) {
    this.triangle = options.triangle;
    this.circle = options.circle;

    this.collection = {
      triangle: {}, 
      circle: {}
    };
  };

  Obstacles.prototype.spawn = function() {
    for (var id = 0; id < amount * 0.5; id++) {
      this.collection.triangle[id] = new this.triangle(id, utils.getRandomPosition(area));
      this.collection.circle[id] = new this.circle(id, utils.getRandomPosition(area));
    }
  };

  Obstacles.prototype.get = function(typeID, id) {
    if (typeof id === 'undefined') {
      if (typeof typeID === 'undefined') {
        return this.collection;
      }
      return this.collection[typeID];
    }
    return this.collection[typeID][id];
  };

  Obstacles.prototype.send = function(typeID) {
    var obstaclesData = {};
    if (typeof typeID === 'undefined') {
      for (var type in this.collection) {
        for (var id in this.collection[type]) {
          obstaclesData[type][id] = this.collection[type][id].send();
        }
      }
    } else {
      for (var id in this.collection[typeID]) {
        obstaclesData[typeID][id] = this.collection[typeID][id].send();
      }
    }
    return obstaclesData;
  };

  Obstacles.prototype.remove = function(type, id) {
    delete this.collection[type][id];
    this.resurrect(type, id);
  };

  Obstacles.prototype.resurrect = function(type, id) {
    this.collection[type][id] = new this.type(id, utils.getRandomPosition(area));
  };

  Obstacles.prototype.set = function(obstacles) {
    for (var type in obstacles) {
      for (id in obstacles[type]) {
        this.collection[type][id].set(data[type][id]);
      }
    }
  };

  module.exports = Obstacles;
  
})(this);
