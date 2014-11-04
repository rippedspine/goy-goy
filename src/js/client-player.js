(function() {
  'use strict';

  var BaseCollection = require('../../shared/base/collection.js')
    , Geometry = require('./client-geometry.js')
    , Vector = require('../../shared/vector.js')
    , utils = require('../../shared/utils.js')
    , config = require('../../shared/config.js')
    , inherits = utils.inherits

    , Client = { Player: {} };

  // =============================================================
  // CLIENT PLAYER MODEL :: extends Vector
  // =============================================================
  Client.Player.Model = function(data) {
    this.id = data.id;
    this.shape = new Geometry(data);

    Vector.call(this, {
      x: data.x,
      y: data.y,
      direction: 45,
      friction: 0.32,
      radius: data.radius
    });

    this.didCollide = false;
    this.colorTimer = 1;
    this.shape.isFilled = true;

    this.angle = 0;
    this.updateHz = 0.05;

    this.particles = [];

    this.springPoint = {x: data.x, y: data.y};
    this.addSpring(this.springPoint, 0.1);

    this.tailSegments = this.createTail(10);
    this.addTailToPlayer(0.6);
  };

  inherits(Client.Player.Model, Vector);

  Client.Player.Model.prototype.send = function() {
    return {
      id: this.id,
      radius: this.radius,
      x: this.x, 
      y: this.y
    };
  };

  Client.Player.Model.prototype.createTail = function(numSegments) {
    var segments = [];
    for (var i = 0; i < numSegments; i++) {
      segments.push(new Vector({
        x: this.x,
        y: this.y,
        direction: this.direction,
        friction: this.friction
      }));
    }
    return segments;
  };

  Client.Player.Model.prototype.addTailToPlayer = function(k) {
    for (var j = 0; j < this.tailSegments.length; j++) {
      if (j === 0) {
        this.tailSegments[j].addSpring(this, k);
      } else {
        this.tailSegments[j].addSpring(this.tailSegments[j - 1], k);
      }
    }
  };

  Client.Player.Model.prototype.drawTail = function(context) {
    context.beginPath();
    context.moveTo(this.x, this.y);
    for (var i = 0; i < this.tailSegments.length; i++) {
      context.lineTo(this.tailSegments[i].x, this.tailSegments[i].y);
    }
    context.lineWidth = this.radius * 0.8 + Math.sin(this.angle) * 2;
    context.strokeStyle = this.shape.color;
    context.stroke();
  };

  Client.Player.Model.prototype.update = function() {
    this.pulse();
    this.onCollision();
    this.updatePhysics();
    for (var i = 0; i < this.tailSegments.length; i++) {
      this.tailSegments[i].updatePhysics();
    }
    this.shape.x = this.x;
    this.shape.y = this.y;
  };

  Client.Player.Model.prototype.draw = function(context) {
    this.shape.draw(context);
    this.drawTail(context);
  };

  Client.Player.Model.prototype.onCollision = function() {
    if (this.didCollide) {
      this.colorTimer -= 0.01;
      if (this.colorTimer < 0) {
        this.didCollide = false;
        this.colorTimer = 1;
        this.shape.color = config.player.color;
      }
    }
  };

  Client.Player.Model.prototype.pulse = function() {
    this.shape.scale = 2 + Math.sin(this.angle) * 0.5;
    this.angle += this.updateHz;
  };

  Client.Player.Model.prototype.move = function(position) {
    this.springPoint.x = position.x;
    this.springPoint.y = position.y;
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
    this.collection[data.id].move({x: data.x, y: data.y});
  };

  Client.Player.Collection.prototype.set = function(players) {
    for (var id in players) {
      this.add(players[id]);
    }
  };

  module.exports = Client.Player;

})(this);