(function() {
  'use strict';

  var Collection = function(options) {
    this.collection = options.collection || {};
    this.model = options.model;

    this.sendDeadEvent = new CustomEvent('deadObstacle', {
      'detail': {'id': null}
    });
  };

  Collection.prototype.get = function(id) {
    if (typeof id === 'undefined') {
      return this.collection;  
    }
    return this.collection[id];
  };

  Collection.prototype.set = function(triangles) {
    for (var id in triangles) {
      this.collection[id] = new this.model(triangles[id]);
    }
  };

  Collection.prototype.setCollision = function(id) {
    this.collection[id].didCollide = true;
  };

  Collection.prototype.getDead = function() {
    for (var id in this.collection) { 
      if (this.collection[id].isDead) {
        this.sendDeadEvent.detail.id = id;
        document.dispatchEvent(this.sendDeadEvent);
      }
    }
  };

  Collection.prototype.update = function() {
    for (var id in this.collection) { 
      this.collection[id].update(); 
    }
  };

  Collection.prototype.draw = function(context) {
    for (var i in this.collection) { 
      this.collection[i].draw(context);
    }
  };

  Collection.prototype.sendRotations = function() {
    var rotations = {};
    for (var id in this.collection) {
      rotations[id] = {
        rotation: this.collection[id].rotation
      };
    }
    return rotations;
  };

  module.exports = Collection;

})(this);
