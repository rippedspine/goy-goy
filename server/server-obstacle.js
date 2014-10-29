(function() {
  'use strict';

  var BaseCollection = require('../shared/base/collection.js')
    , utils = require('../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../shared/config.js')
    
    , triangle = config.triangle
    , circle = config.circle
    , sound = config.sound

    , Server = { Obstacle: {} };

  // ==============================
  // SERVER OBSTACLE TRIANGLE
  // ==============================

  Server.Obstacle.Triangle = function(id) {
    this.id = id;
    this.alpha = 1;
    this.scale = 1;
    this.rotation = 0;

    var colorSoundID = utils.getRandomIntFromColorRange();

    this.position = utils.getRandomPosition(config.area);
    this.radius = utils.getRandomInt(triangle.radiusRange);
    this.color = utils.getColor(colorSoundID);
    this.vertices = utils.getVertices(3, this.radius);

    this.sound = {
      id: Math.floor(colorSoundID/36),
      decay: utils.getDecay(0.02, 0.07, sound.decayRange, this.radius),
      waveform: config.waveform
    };
  };

  Server.Obstacle.Triangle.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.position = data.position;
    this.rotation = data.rotation;
    this.scale = data.scale;
  };

  // ==============================
  // SERVER OBSTACLE CIRCLE
  // ==============================

  Server.Obstacle.Circle = function(id) {
    this.id = id;
    this.alpha = 1;
    this.scale = 1;

    var colorSoundID = utils.getRandomIntFromColorRange();
    
    this.position = utils.getRandomPosition(config.area);
    this.radius = utils.getRandomInt(circle.radiusRange);
    this.color = utils.getColor(colorSoundID);

    this.sound = {
      id: Math.floor(colorSoundID/36),
      decay: utils.getDecay(0.02, 0.07, sound.decayRange, this.radius),
      waveform: config.waveform
    };
  };

  Server.Obstacle.Circle.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.position = data.position;
    this.scale = data.scale;
  };

  // ==============================
  // SERVER OBSTACLE COLLECTION
  // ==============================

  Server.Obstacle.Collection = function(options) {
    BaseCollection.call(this, options);
  };

  inherits(Server.Obstacle.Collection, BaseCollection);

  Server.Obstacle.Collection.prototype.spawn = function(amount) {
    for (var id = 0; id < amount; id++) {
      this.collection[id] = new this.model(id);
    }
  };

  Server.Obstacle.Collection.prototype.resurrect = function(id) {
    this.collection[id] = new this.model(id);
  };

  Server.Obstacle.Collection.prototype.set = function(data) {
    for (var id in data) {
      this.collection[id].set(data[id]);
    }
  };

  module.exports = Server.Obstacle;

})(this);