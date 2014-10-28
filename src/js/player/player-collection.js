(function() {
  'use strict';

  var utils = require('../../../shared/utils.js')
    , inherits = require('../../../shared/helpers.js').inherits
    , BaseCollection = require('../../../shared/base-classes/base-collection.js');

  var ClientPlayerCollection = function(options) {
    BaseCollection.call(this, options);
    this.collisions = [];
  };

  inherits(ClientPlayerCollection, BaseCollection);

  ClientPlayerCollection.prototype.draw = function(context) {
    for (var id in this.collection) {
      this.collection[id].draw(context);
    }
  };

  ClientPlayerCollection.prototype.update = function() {
    for (var id in this.collection) {
      this.collection[id].update();
    }
  };

  ClientPlayerCollection.prototype.setCollision = function(id, color) {
    this.collection[id].didCollide = true;
    this.collection[id].shape.color = color;
  };

  ClientPlayerCollection.prototype.add = function(data) {
    var player = new this.model();
    player.setup(data);
    this.collection[data.id] = player;
  };

  ClientPlayerCollection.prototype.updatePlayer = function(data) {
    this.collection[data.id].move(data.position);
  };

  ClientPlayerCollection.prototype.set = function(players) {
    for (var id in players) {
      this.add(players[id]);
    }
  };

  module.exports = ClientPlayerCollection;

})(this);
