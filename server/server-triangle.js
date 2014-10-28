(function() {
  'use strict';

  var utils = require('../shared/utils.js')
    , helpers = require('../shared/helpers.js')
    , config = require('../shared/config.js')
    , triangleRadiusRange = config.radius.triangle
    , area = config.area
    , amount = config.amount.triangles;

  var TriangleModel = function(id, position) {
    var colorRangeInt = utils.getRandomRangeInt();
    colorRangeInt = 0 ? 1 : colorRangeInt;
    var soundDecayRange = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    this.id = id;

    this.position = position;
    this.rotation = 0;
    this.color = utils.getRandomColor(colorRangeInt);
    this.radius = utils.getRandomInt(triangleRadiusRange);
    this.vertices = helpers.getVertices(3, this.radius);

    // sound
    this.soundID = Math.floor(colorRangeInt/36);
    this.soundDecay = 0.02 + (0.07 * soundDecayRange.indexOf(this.radius));
    this.waveform = 'noise';
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
      sound: {
        id: this.soundID,
        waveform: this.waveform,
        decay: this.soundDecay
      }
    };
  };

  var TriangleCollection = function(options) {
    this.collection = options.collection || {};
    this.model = options.model;
  };

  TriangleCollection.prototype.spawn = function() {
    for (var id = 0; id < amount; id++) {
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
