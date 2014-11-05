(function() {
  'use strict';

  var BaseCollection = require('../../../shared/base/collection.js')
    , Vector = require('../../../shared/vector.js')
    , utils = require('../../../shared/utils.js')
    , inherits = utils.inherits

    , Client = { Obstacle: {} };

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

  module.exports = Client.Obstacle.Collection;

})(this);