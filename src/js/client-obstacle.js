(function() {
  'use strict';

  var BaseCollection = require('../../shared/base/collection.js')
    , Geometry = require('./geometry.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits

    , Client = {Obstacle: {}};

  // ==============================
  // CLIENT OBSTACLE TRIANGLE
  // ==============================

  Client.Obstacle.Triangle = function(data) {
    Geometry.call(this, data);

    this.id = data.id;
    this.isAlive = true;
    this.didCollide = false;
    this.fillTimer = 1;
    this.updateHz = 0.02;
  };

  inherits(Client.Obstacle.Triangle, Geometry);

  Client.Obstacle.Triangle.prototype.update = function() {
    this.rotate();
    this.onCollision();
  };

  Client.Obstacle.Triangle.prototype.rotate = function() {
    this.rotation += this.updateHz;
    if (this.rotation > 360) {
      this.rotation = 0;
    }
  };

  Client.Obstacle.Triangle.prototype.onCollision = function() {
    if (this.didCollide) {
      this.isFilled = true;
      this.fillTimer -= 0.05;
      this.scale += this.updateHz;
      this.alpha -= this.updateHz;

      if (this.fillTimer < 0) {this.isFilled = false;}
      if (this.alpha < 0) {this.isAlive = false;}
    }
  };

  Client.Obstacle.Triangle.prototype.set = function(data) {
    this.rotation = data.rotation;
    this.alpha = data.alpha;
    this.scale = data.scale;
  };

  Client.Obstacle.Triangle.prototype.send = function() {
    return {
      alpha: this.alpha,
      scale: this.scale,
      rotation: this.rotation
    };
  };

  // ==============================
  // CLIENT OBSTACLE CIRCLE
  // ==============================

  Client.Obstacle.Circle = function(data) {
    Geometry.call(this, data);

    this.id = data.id;
    this.isAlive = true;
    this.didCollide = false;
    this.fillTimer = 1;
    this.updateHz = 0.02;
  };

  inherits(Client.Obstacle.Circle, Geometry);

  Client.Obstacle.Circle.prototype.update = function() {
    this.onCollision();
  };

  Client.Obstacle.Circle.prototype.onCollision = function() {
    if (this.didCollide) {
      this.isFilled = true;
      this.fillTimer -= 0.05;
      this.scale += this.updateHz;
      this.alpha -= this.updateHz;

      if (this.fillTimer < 0) {this.isFilled = false;}
      if (this.alpha < 0) {this.isAlive = false;}
    }
  };

  Client.Obstacle.Triangle.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.scale = data.scale;
  };

  Client.Obstacle.Triangle.prototype.send = function() {
    return {
      alpha: this.alpha,
      scale: this.scale
    };
  };

  // ==============================
  // CLIENT OBSTACLE COLLECTION
  // ==============================

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