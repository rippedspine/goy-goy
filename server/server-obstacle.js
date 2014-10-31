(function() {
  'use strict';

  var BaseCollection = require('../shared/base/collection.js')
    , utils = require('../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../shared/config.js')
    , uuid = require('node-uuid')
    
    , triangle = config.triangle
    , circle = config.circle
    , zigzag = config.zigzag
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

    this.position = utils.getRandomPosition(config.area);
    this.colorSoundID = utils.getRandomIntFromColorRange();
    this.color = utils.getColor(this.colorSoundID);

    this.shouldBeRemoved = false;
  };

  Server.Obstacle.Model.prototype.createSound = function(waveform) {
    return {
      id: Math.floor(this.colorSoundID/36),
      decay: utils.getDecay(0.02, 0.07, sound.decayRange, this.radius),
      waveform: waveform
    };
  };

  // =============================================================
  // SERVER OBSTACLE TRIANGLE :: extends SERVER OBSTACLE MODEL
  // =============================================================
  Server.Obstacle.Triangle = function(id) {
    Server.Obstacle.Model.call(this, id);

    this.type = 'triangle';
    this.radius = utils.getRandomInt(triangle.radiusRange);
    this.vertices = utils.getVertices(3, this.radius);
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
      position: this.position,
      sound: this.sound,
      color: this.color,
      vertices: this.vertices
    };
  };

  // =============================================================
  // SERVER OBSTACLE ZIGZAG :: extends SERVER OBSTACLE MODEL
  // =============================================================
  Server.Obstacle.Zigzag = function(id) {
    Server.Obstacle.Model.call(this, id);

    this.type = 'zigzag';
    this.vertices = utils.getVertices(3, 0);
    this.sound = this.createSound(zigzag.waveform);
  };

  inherits(Server.Obstacle.Zigzag, Server.Obstacle.Model);

  Server.Obstacle.Zigzag.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.position = data.position;
    this.rotation = data.rotation;
    this.scale = data.scale;
  };

  Server.Obstacle.Zigzag.prototype.send = function() {
    return {
      id: this.id,
      position: this.position,
      sound: this.sound,
      color: this.color,
      vertices: this.vertices
    };
  };

  // =============================================================
  // SERVER OBSTACLE CIRCLE :: extends SERVER OBSTACLE MODEL
  // =============================================================
  Server.Obstacle.Circle = function(id) {
    Server.Obstacle.Model.call(this, id);

    this.type = 'circle';
    this.radius = utils.getRandomInt(circle.radiusRange);
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