(function() {
  'use strict';

  var BaseCollection = require('../../shared/base/collection.js')
    , Geometry = require('./client-geometry.js')
    , Vector = require('../../shared/vector.js')
    , inherits = require('../../shared/utils.js').inherits

    , Client = { Player: {} };

  // =============================================================
  // CLIENT PLAYER MODEL
  // =============================================================
  Client.Player.Model = function(data) {
    this.id = data.id;

    this.position = new Vector(data.position.x, data.position.y);
    this.controller = new Vector(data.position.x, data.position.y);
    this.velocity = new Vector(0, 0);

    this.shape = new Geometry({
      position: data.position,
      color: '#fff',
      vertices: data.vertices
    });

    this.didCollide = false;
    this.colorTimer = 1;

    this.angle = 0;
    this.updateHz = 0.05;
  };

  Client.Player.Model.prototype.send = function() {
    return {
      id: this.id,
      radius: this.radius,
      position: this.position.getXY()
    };
  };

  Client.Player.Model.prototype.update = function() {
    this.pulse();
    this.onCollision();

    // this.updatePhysics();
    this.shape.position = this.position.getXY();
  };

  Client.Player.Model.prototype.updatePhysics = function() {    
    this.direction = this.controller.subtract(this.position);
    this.direction.normalize();
    this.direction.multiplyBy(0.5);

    this.acceleration = this.direction;
    this.velocity.addTo(this.acceleration);
    this.velocity.limit(10);
    this.position.addTo(this.velocity);
  };

  Client.Player.Model.prototype.draw = function(context) {
    this.shape.draw(context);
  };

  Client.Player.Model.prototype.onCollision = function() {
    if (this.didCollide) {
      this.colorTimer -= 0.01;
      if (this.colorTimer < 0) {
        this.didCollide = false;
        this.colorTimer = 1;
        this.shape.color = '#fff';
      }
    }
  };

  Client.Player.Model.prototype.pulse = function() {
    this.shape.strokeWidth = 3 + Math.sin(this.angle) * 2;
    this.angle += this.updateHz;
  };

  Client.Player.Model.prototype.move = function(position) {
    this.position.setXY(position);
    // this.controller.setXY(position);
  };

  // =============================================================
  // CLIENT PLAYER COLLECTION :: extends BASECOLLECTION
  // =============================================================
  Client.Player.Collection = function(options) {
    BaseCollection.call(this, options);
  };

  inherits(Client.Player.Collection, BaseCollection);

  Client.Player.Collection.prototype.draw = function(context) {
    for (var id in this.collection) {
      this.collection[id].draw(context);
    }
  };

  Client.Player.Collection.prototype.update = function() {
    for (var id in this.collection) {
      this.collection[id].update();
    }
  };

  Client.Player.Collection.prototype.setCollision = function(id, color) {
    this.collection[id].didCollide = true;
    this.collection[id].shape.color = color;
  };

  Client.Player.Collection.prototype.add = function(data) {
    this.collection[data.id] = new this.model(data);
  };

  Client.Player.Collection.prototype.updatePlayer = function(data) {
    this.collection[data.id].move(data.position);
  };

  Client.Player.Collection.prototype.set = function(players) {
    for (var id in players) {
      this.add(players[id]);
    }
  };

  module.exports = Client.Player;

})(this);