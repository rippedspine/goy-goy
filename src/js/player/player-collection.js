(function() {
  'use strict';

  var utils = require('../../../shared/utils.js');

  var Collection = function(options) {
    this.collection = options.collection || {};
    this.collisions = [];
    this.model = options.model;
    this.audioplayer = options.audioplayer;
  };

  Collection.prototype.draw = function(context) {
    for (var id in this.collection) {
      this.collection[id].draw(context);
    }
  };

  Collection.prototype.update = function() {
    for (var id in this.collection) {
      this.collection[id].update();
    }
  };

  Collection.prototype.setCollision = function(id, color) {
    this.collection[id].didCollide = true;
    this.collection[id].color = color;
  };

  Collection.prototype.add = function(data) {
    return this.collection[data.id] = new this.model(data);
  };

  Collection.prototype.remove = function(id) {
    delete this.collection[id];
  };

  Collection.prototype.updatePlayer = function(data) {
    this.collection[data.id].move(data.position);
  };

  Collection.prototype.get = function(id) {
    if (typeof id === 'undefined') {
      return this.collection;
    }
    return this.collection[id];
  };

  Collection.prototype.set = function(players) {
    for (var id in players) {
      this.collection[id] = this.model(players[id]);
    }
  };

  module.exports = Collection;

})(this);
