(function() {
  'use strict';

  var utils = require('../shared/utils.js')
    , helpers = require('../shared/helpers.js')
    , config = require('../shared/config.js')
    
    , area = config.area
    , triangle = config.obstacles.triangle;

  var TriangleModel = function(id, position) {
    var colorInt = utils.getRandomIntFromColorRange();

    this.id = id;

    this.position = position;
    this.rotation = 0;
    this.color = utils.getColor(colorInt);
    this.radius = utils.getRandomInt(triangle.radiusRange);
    this.vertices = helpers.getVertices(3, this.radius);

    this.sound = {
      id: Math.floor(colorInt/36),
      decay: helpers.getDecay(0.02, 0.07, this.radius),
      waveform: triangle.waveform
    };
  };

  TriangleModel.prototype.set = function(data) {
    this.rotation = data.rotation;
  };

  TriangleModel.prototype.send = function() {
    return {
      id: this.id,
      type: 'triangle',
      rotation: this.rotation,
      color: this.color,
      sound: this.sound
    };
  };

  var TriangleCollection = function(options) {
    this.collection = options.collection || {};
    this.model = options.model;
  };

  TriangleCollection.prototype.spawn = function() {
    for (var id = 0; id < triangle.amount; id++) {
      this.collection[id] = new this.model(id, utils.getRandomPosition(area));
    }
  };

  TriangleCollection.prototype.get = function(id) {
    if (typeof id === 'undefined') {
      return this.collection;  
    }
    return this.collection[id];
  };

  TriangleCollection.prototype.remove = function(id) {
    delete this.collection[id];
    this.resurrect(id);
  };

  TriangleCollection.prototype.resurrect = function(id) {
    this.collection[id] = new this.model(id, utils.getRandomPosition(area));
  };

  TriangleCollection.prototype.set = function(data) {
    for (var id in data) {
      this.collection[id].set(data[id]);
    }
  };

  module.exports = {
    Model: TriangleModel,
    Collection: TriangleCollection
  };
  
})(this);
