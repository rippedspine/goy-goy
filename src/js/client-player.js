(function() {
  'use strict';

  var BaseCollection = require('../../shared/base/collection.js')
    , Geometry = require('./client-geometry.js')
    , Vector = require('../../shared/vector.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits

    , Client = { Player: {} };

  // =============================================================
  // CLIENT PLAYER MODEL :: extends Vector
  // =============================================================
  Client.Player.Model = function(data) {
    this.id = data.id;

    this.shape = new Geometry({
      position: data.position,
      color: '#fff',
      vertices: data.vertices
    });

    this.didCollide = false;
    this.colorTimer = 1;

    this.angle = 0;
    this.updateHz = 0.05;

    var x = data.position.x
      , y = data.position.y;

    Vector.call(this, {
      x: x,
      y: y,
      direction: utils.rand() * Math.PI * 2,
      friction: 0.32
    });

    this.springPoint = {x: x, y: y};
    this.addSpring(this.springPoint, 0.1);
  };

  inherits(Client.Player.Model, Vector);

  Client.Player.Model.prototype.send = function() {
    return {
      id: this.id,
      radius: this.radius,
      position: {
        x: this.x,
        y: this.y
      }
    };
  };

  Client.Player.Model.prototype.update = function() {
    this.pulse();
    this.onCollision();
    this.updatePhysics();
    this.shape.position.x = this.x;
    this.shape.position.y = this.y;
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
    this.springPoint.x = position.x;
    this.springPoint.y = position.y;
    // this.position.setXY(position);
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