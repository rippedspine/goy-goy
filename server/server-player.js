(function() {
  'use strict';

  var BaseCollection = require('../shared/base/collection.js')
    , utils = require('../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../shared/config.js');

  var Server = { Player: {} };

  // ==============================
  // SERVER PLAYER MODEL
  // ==============================

  Server.Player.Model = function(id) {
    this.id = id;
    this.radius = config.radius.player;
    this.position = {
      x: (config.area[0] * 0.5) - (this.radius * 0.5),
      y: (config.area[1] * 0.5) - (this.radius * 0.5)
    };
    this.vertices = utils.getVertices(5, this.radius);
  };

  Server.Player.Model.prototype.send = function() {
    return {
      id: this.id,
      radius: this.radius,
      position: this.position,
      vertices: this.vertices
    };
  };

  Server.Player.Model.prototype.set = function(data) {
    this.id = data.id;
    this.position = data.position;
  };

  // ==============================
  // SERVER PLAYER COLLECTION
  // ==============================

  Server.Player.Collection = function(options) {
    BaseCollection.call(this, options);
  };

  inherits(Server.Player.Collection, BaseCollection);

  Server.Player.Collection.prototype.add = function(data) {
    this.collection[data.id] = new this.model(data.id);
  };

  Server.Player.Collection.prototype.set = function(data) {
    this.collection[data.id].set(data);
  };

  module.exports = Server.Player;

})(this);