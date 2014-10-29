(function() {
  'use strict';

  var BaseCollection = require('../shared/base/collection.js')
    , utils = require('../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../shared/config.js');

  var Player = {};

  Player.Model = function(id) {
    this.id = id;
    this.radius = config.radius.player;
    this.position = {
      x: (config.area[0] * 0.5) - (this.radius * 0.5),
      y: (config.area[1] * 0.5) - (this.radius * 0.5)
    };
    this.vertices = utils.getVertices(5, this.radius);
  };

  Player.Model.prototype.send = function() {
    return {
      id: this.id,
      radius: this.radius,
      position: this.position,
      vertices: this.vertices
    };
  };

  Player.Model.prototype.set = function(data) {
    this.id = data.id;
    this.position = data.position;
  };

  Player.Collection = function(options) {
    BaseCollection.call(this, options);
  };

  inherits(Player.Collection, BaseCollection);

  Player.Collection.prototype.add = function(data) {
    this.collection[data.id] = new this.model(data.id);
  };

  module.exports = Player;

})(this);