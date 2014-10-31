(function() {
  'use strict';

  var BaseCollection = require('../../shared/base/collection.js')
    , Geometry = require('./client-geometry.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits
    , msgs = require('../../shared/messages.js')

    , Client = { Obstacle: {} };

  // =============================================================
  // CLIENT OBSTACLE BASEMODEL :: extends GEOMETRY
  // =============================================================
  Client.Obstacle.BaseModel = function(data) {
    Geometry.call(this, data);

    this.type = data.type;
    this.id = data.id;
    this.isAlive = true;
    this.didCollide = false;
    this.fillTimer = 1;
    this.updateHz = 0.02;

    this.sendDeadEvent = new CustomEvent('dead', {
      'detail': {id: null, type: null}
    });
  };

  inherits(Client.Obstacle.BaseModel, Geometry);

  Client.Obstacle.BaseModel.prototype.onCollision = function() {
    if (this.didCollide) {
      this.isFilled = true;
      this.fillTimer -= 0.05;
      this.scale += this.updateHz;
      this.alpha -= this.updateHz;

      if (this.fillTimer < 0) {this.isFilled = false;}
      if (this.alpha < 0) {        
        this.sendDeadEvent.detail.id = this.id;
        this.sendDeadEvent.detail.type = this.type;
        document.dispatchEvent(this.sendDeadEvent);

        this.alpha = 0;
        this.didCollide = false;
      }
    }
  };

  // =============================================================
  // CLIENT OBSTACLE TRIANGLE :: extends CLIENT OBSTACLE BASEMODEL
  // =============================================================
  Client.Obstacle.Triangle = function(data) {
    Client.Obstacle.BaseModel.call(this, data);
  };

  inherits(Client.Obstacle.Triangle, Client.Obstacle.BaseModel);

  Client.Obstacle.Triangle.prototype.update = function() {
    this.rotate();
    this.onCollision();
  };

  Client.Obstacle.Triangle.prototype.rotate = function() {
    this.rotation += this.updateHz;
    if (this.rotation > 360) {this.rotation = 0;}
  };

  Client.Obstacle.Triangle.prototype.set = function(data) {
    this.rotation = data.rotation;
    this.alpha = data.alpha;
    this.scale = data.scale;
  };

  Client.Obstacle.Triangle.prototype.send = function() {
    return {
      type: this.type,
      alpha: this.alpha,
      scale: this.scale,
      rotation: this.rotation
    };
  };

  // =============================================================
  // CLIENT OBSTACLE ZIGZAG :: extends CLIENT OBSTACLE BASEMODEL
  // =============================================================
  Client.Obstacle.Zigzag = function(data) {
    Client.Obstacle.BaseModel.call(this, data);
  };

  inherits(Client.Obstacle.Zigzag, Client.Obstacle.BaseModel);

  Client.Obstacle.Zigzag.prototype.update = function() {
    this.rotate();
    this.onCollision();
  };

  Client.Obstacle.Zigzag.prototype.rotate = function() {
    this.rotation += this.updateHz;
    if (this.rotation > 360) {this.rotation = 0;}
  };

  Client.Obstacle.Zigzag.prototype.set = function(data) {
    this.rotation = data.rotation;
    this.alpha = data.alpha;
    this.scale = data.scale;
    this.vertices = data.vertices;
  };

  Client.Obstacle.Zigzag.prototype.send = function() {
    return {
      type: this.type,
      alpha: this.alpha,
      scale: this.scale,
      rotation: this.rotation,
      vertices: this.vertices
    };
  };

  // =============================================================
  // CLIENT OBSTACLE CIRCLE :: extends CLIENT OBSTACLE BASEMODEL
  // =============================================================
  Client.Obstacle.Circle = function(data) {
    Client.Obstacle.BaseModel.call(this, data);
    // this.angle = 0;
    // this.updateHz = 0.1;
  };

  inherits(Client.Obstacle.Circle, Client.Obstacle.BaseModel);

  Client.Obstacle.Circle.prototype.update = function() {
    this.onCollision();
    this.wiggle();
  };

  Client.Obstacle.Circle.prototype.wiggle = function() {
    this.angle += this.updateHz;
    // this.position.x = -120 + Math.sin(this.angle) * 20;
    // this.position.y = -100 + Math.cos(this.angle) * 20;
  };

  Client.Obstacle.Circle.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.scale = data.scale;
  };

  Client.Obstacle.Circle.prototype.send = function() {
    return {
      type: this.type,
      alpha: this.alpha,
      scale: this.scale
    };
  };

  // =============================================================
  // CLIENT OBSTACLE COLLECTION :: extends BASECOLLECTION
  // =============================================================
  Client.Obstacle.Collection = function(options) {
    BaseCollection.call(this, options);
  };

  inherits(Client.Obstacle.Collection, BaseCollection);

  Client.Obstacle.Collection.prototype.spawn = function(data) {
    for (var id in data) {
      this.collection[id] = new this.model(data[id]);
    }
  };

  Client.Obstacle.Collection.prototype.set = function(data) {
    for (var id in data) {
      this.collection[id].set(data[id]);
    }
  };

  Client.Obstacle.Collection.prototype.resurrect = function(data) {
    this.collection[data.id] = new this.model(data);
    return this.collection[data.id];
  };

  Client.Obstacle.Collection.prototype.setCollision = function(id, socket) {
    this.collection[id].didCollide = true;
  };

  Client.Obstacle.Collection.prototype.update = function() {
    for (var id in this.collection) { 
      this.collection[id].update(); 
    }
  };

  Client.Obstacle.Collection.prototype.draw = function(context) {
    for (var id in this.collection) { 
      this.collection[id].draw(context); 
    }
  };

  module.exports = Client.Obstacle;

})(this);