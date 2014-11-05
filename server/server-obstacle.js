(function() {
  'use strict';

  var BaseCollection = require('../shared/base/collection.js')
    , utils = require('../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../shared/config.js')
    , color = config.color
    
    , triangle = config.triangle
    , circle = config.circle
    , noiseform = config.noiseform
    , bassform = config.bassform
    , sound = config.sound

    , Server = { Obstacle: {} };

  // =============================================================
  // SERVER OBSTACLE MODEL
  // =============================================================
  Server.Obstacle.Model = function(id) {
    this.id = id;
    this.alpha = 1;
    this.scale = 1;
    this.rotation = 0;

    this.x = utils.position.getRandomInArea(config.area.size, 100).x;
    this.y = utils.position.getRandomInArea(config.area.size, 100).y;
    this.colorSoundID = utils.random.getInt(color.range[0] + 1, color.range[1]);
    this.color = utils.color.get(this.colorSoundID, color.saturation, color.luma);
    this.direction = config.angleArray[utils.random.getInt(0, 3)];

    this.shouldBeRemoved = false;
  };

  Server.Obstacle.Model.prototype.createSound = function(waveform) {
    return {
      id: Math.floor(this.colorSoundID/36),
      decay: utils.sound.getDecay(0.02, 0.07, sound.decayRange, this.radius),
      waveform: waveform
    };
  };

  // =============================================================
  // SERVER OBSTACLE TRIANGLE :: extends SERVER OBSTACLE MODEL
  // =============================================================
  Server.Obstacle.Triangle = function(id) {
    Server.Obstacle.Model.call(this, id);

    this.type = 'triangle';
    this.radius = utils.random.getInt(triangle.radiusRange) * config.sizeFactor;
    this.vertices = utils.vertices.getIrregularPolygon(3, this.radius);
    this.sound = this.createSound(triangle.waveform);
  };

  inherits(Server.Obstacle.Triangle, Server.Obstacle.Model);

  Server.Obstacle.Triangle.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.position = data.position;
    this.rotation = data.rotation;
    this.scale = data.scale;
  };

  Server.Obstacle.Triangle.prototype.send = function() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      sound: this.sound,
      color: this.color,
      vertices: this.vertices
    };
  };

  // =============================================================
  // SERVER OBSTACLE NOISEFORM :: extends SERVER OBSTACLE MODEL
  // =============================================================
  Server.Obstacle.Noiseform = function(id) {
    Server.Obstacle.Model.call(this, id);
    this.type = 'noiseform';
    this.degree = utils.random.getInt(triangle.radiusRange) - 4;
    this.radius = (this.degree + 4) * config.sizeFactor;
    this.sound = this.createSound(noiseform.waveform);
  };

  inherits(Server.Obstacle.Noiseform, Server.Obstacle.Model);

  Server.Obstacle.Noiseform.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.x = data.x;
    this.y = data.y;
    this.rotation = data.rotation;
    this.scale = data.scale;
  };

  Server.Obstacle.Noiseform.prototype.send = function() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      sound: this.sound,
      color: this.color,
      degree: this.degree
    };
  };

  // =============================================================
  // SERVER OBSTACLE BASSFORM :: extends SERVER OBSTACLE MODEL
  // =============================================================
  Server.Obstacle.Bassform = function(id) {
    Server.Obstacle.Model.call(this, id);

    this.type = 'bassform';
    this.growth = 5.05;
    this.width = 95;
    this.height = 10;
    this.sound = this.createSound(bassform.waveform);
  };

  inherits(Server.Obstacle.Bassform, Server.Obstacle.Model);

  Server.Obstacle.Bassform.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.position = data.position;
    this.scale = data.scale;
    this.pulse = data.pulse;
  };

  Server.Obstacle.Bassform.prototype.send = function() {
    return {
      id: this.id,
      position: this.position,
      sound: this.sound,
      color: this.color
    };
  };

  // =============================================================
  // SERVER OBSTACLE CIRCLE :: extends SERVER OBSTACLE MODEL
  // =============================================================
  Server.Obstacle.Circle = function(id) {
    Server.Obstacle.Model.call(this, id);

    this.type = 'circle';
    this.radius = utils.random.getInt(circle.radiusRange) * config.sizeFactor;
    this.sound = this.createSound(circle.waveform);
  };

  inherits(Server.Obstacle.Circle, Server.Obstacle.Model);

  Server.Obstacle.Circle.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.position = data.position;
    this.scale = data.scale;
  };

  Server.Obstacle.Circle.prototype.send = function() {
    return {
      id: this.id,
      position: this.position,
      sound: this.sound,
      color: this.color
    };
  };

  // =============================================================
  // SERVER OBSTACLE COLLECTION :: extends BASECOLLECTION
  // =============================================================
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
    return this.collection[id];
  };

  Server.Obstacle.Collection.prototype.set = function(data) {
    for (var id in data) {
      this.collection[id].set(data[id]);
    }
  };

  Server.Obstacle.Collection.prototype.send = function(id) {
    return this.collection[id].send();
  };

  module.exports = Server.Obstacle;

})(this);