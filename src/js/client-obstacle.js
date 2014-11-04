(function() {
  'use strict';

  var BaseCollection = require('../../shared/base/collection.js')
    , Geometry = require('./client-geometry.js')
    , Vector = require('../../shared/vector.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits
    , msgs = require('../../shared/messages.js')

    , Client = { Obstacle: {} };

  // =============================================================
  // CLIENT OBSTACLE BASEMODEL :: extends GEOMETRY
  // =============================================================
  Client.Obstacle.BaseModel = function(data) {
    this.type = data.type;
    this.id = data.id;
    this.isAlive = true;
    this.didCollide = false;
    this.fillTimer = 1;
    this.updateHz = 0.02;

    this.shape = new Geometry(data);
    this.position = new Vector({
      x: data.x,
      y: data.y,
      direction: data.direction,
      speed: 1,
      friction: 0
    });

    this.boundary = {
      top: data.y - data.radius * 0.5,
      left: data.x - data.radius * 0.5,
      bottom: data.y + data.radius * 0.5,
      right: data.x + data.radius * 0.5
    };

    this.sendDeadEvent = new CustomEvent('dead', {
      'detail': {id: null, type: null}
    });
  };

  Client.Obstacle.BaseModel.prototype.onCollision = function() {
    if (this.didCollide) {
      this.shape.isFilled = true;
      this.fillTimer -= 0.05;
      this.shape.scale += this.updateHz;
      this.shape.alpha -= this.updateHz;

      if (this.fillTimer < 0) {this.shape.isFilled = false;}
      if (this.shape.alpha < 0) {        
        this.sendDeadEvent.detail.id = this.id;
        this.sendDeadEvent.detail.type = this.type;
        document.dispatchEvent(this.sendDeadEvent);

        this.shape.alpha = 0;
        this.didCollide = false;
      }
    }
  };

  Client.Obstacle.BaseModel.prototype.rotate = function() {
    this.shape.rotation += this.updateHz;
    if (this.shape.rotation > 360) {this.shape.rotation = 0;}
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
    utils.wrapBounce(this.position, this.boundary);
    this.position.updatePhysics();
    this.shape.x = this.position.x;
    this.shape.y = this.position.y;
  };

  // =============================================================
  // CLIENT OBSTACLE NOISEFORM :: extends CLIENT OBSTACLE BASEMODEL
  // =============================================================
  Client.Obstacle.Noiseform = function(data) {
    Client.Obstacle.BaseModel.call(this, data);
  };

  inherits(Client.Obstacle.Noiseform, Client.Obstacle.BaseModel);

  Client.Obstacle.Noiseform.prototype.update = function() {
    this.onCollision();
    this.rotate();
    utils.wrapBounce(this.position, this.boundary);
    this.position.updatePhysics();
    this.shape.x = this.position.x;
    this.shape.y = this.position.y;
  };

  // =============================================================
  // CLIENT OBSTACLE BASSFORM :: extends CLIENT OBSTACLE BASEMODEL
  // =============================================================
  Client.Obstacle.Bassform = function(data) {
    Client.Obstacle.BaseModel.call(this, data);
    this.position = new Vector({
      x: data.x,
      y: data.y
    });
  };

  inherits(Client.Obstacle.Bassform, Client.Obstacle.BaseModel);

  Client.Obstacle.Bassform.prototype.update = function() {
    this.onCollision();
    this.position.updatePhysics();
    this.shape.x = this.position.x;
    this.shape.y = this.position.y;
  };

  // =============================================================
  // CLIENT OBSTACLE CIRCLE :: extends CLIENT OBSTACLE BASEMODEL
  // =============================================================
  Client.Obstacle.Circle = function(data) {
    Client.Obstacle.BaseModel.call(this, data);
  };

  inherits(Client.Obstacle.Circle, Client.Obstacle.BaseModel);

  Client.Obstacle.Circle.prototype.update = function() {
    this.onCollision();
    utils.wrapBounce(this.position, this.boundary);
    this.position.updatePhysics();
    this.shape.x = this.position.x;
    this.shape.y = this.position.y;
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

  Client.Obstacle.Collection.prototype.resurrect = function(data) {
    this.collection[data.id] = new this.model(data);
    return this.collection[data.id];
  };

  Client.Obstacle.Collection.prototype.setCollision = function(id) {
    this.collection[id].didCollide = true;
  };

  Client.Obstacle.Collection.prototype.update = function() {
    for (var id in this.collection) { 
      this.collection[id].update(); 
    }
  };

  Client.Obstacle.Collection.prototype.draw = function(context) {
    for (var id in this.collection) { 
      this.collection[id].shape.draw(context); 
    }
  };

  module.exports = Client.Obstacle;

})(this);