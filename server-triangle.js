(function() {
  'use strict';

  var _ = require('lodash')
    , utils = require('./shared/utils.js')
    , config = require('./shared/config.js')
    , radiusRange = config.radius.triangle
    , area = config.area
    , amount = config.amount.triangles;

  var Triangle = function(id, position) {
    var rangeInt = utils.getRandomRangeInt();
    rangeInt = 0 ? 1 : rangeInt;
    var decayRange = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    this.id = id;
    this.position = position;
    this.rotation = 0;
    this.soundID = Math.floor(rangeInt/36);//utils.getRandomInt([0, 4]);
    this.color = utils.getRandomColor(rangeInt);
    this.radius = utils.getRandomInt(radiusRange);
    this.vertices = utils.getVertices(3, this.radius);
    this.decay = 0.02 + (0.07 * decayRange.indexOf(this.radius));
  };

  Triangle.prototype.set = function(data) {
    this.rotation = data.rotation;
  };

  var Collection = function() {
    this.triangles = {};

    this.spawn = function() {
      for (var id = 0; id < amount; id++) {
        this.triangles['t' + id] = new Triangle(id, utils.getRandomPosition(area));
      }
    };

    this.get = function(id) {
      if (typeof id === 'undefined') {
        return this.triangles;  
      }
      return this.triangles[id];
    };

    this.remove = function(deadID) {
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
  
})(this);
