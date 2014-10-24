Gaia.TriangleCollection = Gaia.TriangleCollection || (function(utils, _) {
  'use strict';

  var TriangleCollection = function() {
    this.triangles = {};
  };

  TriangleCollection.prototype.get = function(id) {
    if (typeof id === 'undefined') {
      return this.triangles;  
    }
    return this.triangles[id];
  };

  TriangleCollection.prototype.set = function(triangles) {
    for (var id in triangles) {
      this.triangles[id] = new Gaia.Triangle(triangles[id]);
    }
  };

  TriangleCollection.prototype.setCollision = function(id) {
    this.triangles[id].didCollide = true;
  };

  TriangleCollection.prototype.update = function() {
    for (var id in this.triangles) { 
      this.triangles[id].update(); 
    }
  };

  TriangleCollection.prototype.draw = function(context) {
    for (var i in this.triangles) { 
      this.triangles[i].draw(context);
    }
  };

  TriangleCollection.prototype.sendRotations = function() {
    var rotations = {};
    for (var id in this.triangles) {
      rotations[id] = {
        rotation: this.triangles[id].rotation
      };
    }
    return rotations;
  };

  return TriangleCollection;

})(Gaia.Utils, _);
