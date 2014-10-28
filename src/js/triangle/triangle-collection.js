(function() {
  'use strict';

  var TriangleCollection = function(options) {
    this.collection = options.collection || {};
    this.model = options.model;
  };

  TriangleCollection.prototype.get = function(id) {
    if (typeof id === 'undefined') {
      return this.collection;  
    }
    return this.collection[id];
  };

  TriangleCollection.prototype.setup = function(triangles) {
    for (var id in triangles) {
      this.collection[id] = new this.model(triangles[id]);
    }
  };

  TriangleCollection.prototype.set = function(triangles) {
    for (var id in triangles) {
      this.collection[id].set(triangles[id]);
    }
  };

  TriangleCollection.prototype.setCollision = function(id) {
    this.collection[id].didCollide = true;
  };

  TriangleCollection.prototype.update = function() {
    for (var id in this.collection) { 
      this.collection[id].update(); 
    }
  };

  TriangleCollection.prototype.draw = function(context) {
    for (var i in this.collection) { 
      this.collection[i].draw(context);
    }
  };

  TriangleCollection.prototype.send = function() {
    var triangles = {};
    for (var id in this.collection) {
      triangles[id] = this.collection[id].send();
    }
    return triangles;
  };

  module.exports = TriangleCollection;

})(this);
