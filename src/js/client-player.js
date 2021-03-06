(function() {
  'use strict';

  var BaseCollection = require('../../shared/base/collection.js')
    , Shape    = require('./shapes/__shape.js')
    , Vector   = require('../../shared/vector.js')
    , config   = require('../../shared/config.js')
    , utils    = require('../../shared/utils.js')
    , inherits = utils.inherits

    , sin = Math.sin

    , Client = { Player: {} };

  // =============================================================
  // CLIENT PLAYER MODEL
  // =============================================================
  Client.Player.Model = function(data) {
    this.id = data.id;

    this.position = new Vector({
      x         : data.x,
      y         : data.y,
      direction : 45,
      friction  : 0.4
    });

    this.head = new Shape.Circle({
      x        : data.x,
      y        : data.y,
      color    : data.color,
      radius   : data.radius,
      isFilled : true
    });

    this.tail = new Shape.Tail({
      points    : 8,
      origin    : {x: this.position.x, y: this.position.y},
      direction : this.position.direction,
      friction  : this.position.friction,
      stiffness : 0.6
    });

    this.head.setUpFade();

    this.springPoint = {x: data.x, y: data.y};
    this.position.addSpring(this.springPoint, 0.1);

    this.tail.addSpringsTo(this.position);

    this.didCollide = false;
    this.currentHue = utils.color.getValues(this.head.color)[0];

    this.angle = 0;
    this.updateHz = 0.05;

    this.willBeRemoved = false;

    this.sendRemoveEvent = new CustomEvent('removePlayer', {
      'detail': {id: this.id}
    });
  };

  Client.Player.Model.prototype.send = function() {
    return {
      id          : this.id,
      radius      : this.head.radius,
      x           : this.position.x, 
      y           : this.position.y,
      springPoint : this.springPoint
    };
  };

  Client.Player.Model.prototype.onCollision = function() {
    if (this.didCollide) {
      this.cycleColor(utils.color.getValues(this.newColor));
    }
  };

  Client.Player.Model.prototype.cycleColor = function(newColor) {
    if (this.currentHue > newColor[0]) {this.currentHue--;} else {this.currentHue++;}
    this.head.color = utils.color.get(this.currentHue, newColor[1], newColor[2]);
    if (this.currentHue === newColor[0]) {this.didCollide = false;}
  };

  Client.Player.Model.prototype.update = function() {
    this.pulse();
    this.onCollision();
    this.position.updatePhysics();
    this.tail.update();

    this.head.x = this.position.x;
    this.head.y = this.position.y;
  };

  Client.Player.Model.prototype.draw = function() {
    this.head.draw();
    this.tail.lineWidth = this.head.radius * 0.8 + sin(this.angle) * 2;
    this.tail.draw(this.head.color);

    if (this.willBeRemoved && this.head.alpha < 0.1) {
      this.head.alpha = 0;
      document.dispatchEvent(this.sendRemoveEvent);
    }
  };

  Client.Player.Model.prototype.setFadeOut = function() {
    this.tail.alpha = 0;
    this.head.willFadeOut = true;
    this.head.startFadeOutTime = Date.now();
  };

  Client.Player.Model.prototype.pulse = function() {
    this.head.scale = 2 + sin(this.angle) * 0.5;
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

  Client.Player.Collection.prototype.fadeOutPlayer = function(id) {
    this.collection[id].willBeRemoved = true;
    this.collection[id].setFadeOut();
  };

  Client.Player.Collection.prototype.remove = function(id) {
    delete this.collection[id];
  };

  Client.Player.Collection.prototype.draw = function() {
    for (var id in this.collection) {
      this.collection[id].draw();
    }
  };

  Client.Player.Collection.prototype.update = function() {
    for (var id in this.collection) {
      this.collection[id].update();
    }
  };

  Client.Player.Collection.prototype.setCollision = function(id, color) {
    this.collection[id].didCollide = true;
    this.collection[id].newColor   = color;
  };

  Client.Player.Collection.prototype.add = function(data) {
    this.collection[data.id] = new this.model(data);
  };

  Client.Player.Collection.prototype.updatePlayer = function(data) {
    this.collection[data.id].move(data.springPoint);
  };

  Client.Player.Collection.prototype.set = function(players) {
    for (var id in players) {
      this.collection[id] = new this.model(players[id]);
    }
  };

  module.exports = Client.Player;

})(this);