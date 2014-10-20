// ==================================
// TRIANGLE
// ==================================
var Triangle = Triangle || (function() {
  'use strict';

  var Triangle = function(data) {
    this.isActive = false;
    this.isDead = false;

    var options = {
      radius: data.radius,
      color: data.color,
      position: data.position
    };

    Polygon.call(this, options);

    this.vertices = data.vertices;
  };

  Triangle.prototype = Object.create(Polygon.prototype);

  Triangle.prototype.update = function() {
    if (this.isActive) {
      this.isFilled = true;
      this.alpha -= 0.02;
      this.scale += 0.02;

      if (this.alpha < 0) {
        this.alpha = 0;
        this.isDead = true;
      }
    }
  };

  return Triangle;

})();

// ==================================
// TRIANGLE COLLECTION
// ==================================
var TriangleCollection = TriangleCollection || (function(utils) {
  'use strict';

  var TriangleCollection = function() {
    this.triangles = {};
  };

  TriangleCollection.prototype.set = function(triangles) {
    for (var id in triangles) {
      this.triangles[id] = new Triangle(triangles[id]);
    }
  };

  TriangleCollection.prototype.detectCollision = function(player) {
    for (var i in this.triangles) {
      if (utils.circleCollision(player, this.triangles[i])) {
        this.triangles[i].isActive = true;
      }
    }
  };

  TriangleCollection.prototype.draw = function(context) {
    for (var i in this.triangles) { 
      this.triangles[i].draw(context); 
    }
  };

  TriangleCollection.prototype.removeDead = function(id) {
    if (!this.triangles[id].isAlive) {
      delete this.triangles[id];
      this.spawnOne(id);
    }
  };

  TriangleCollection.prototype.update = function() {
    for (var id in this.triangles) { 
      this.triangles[id].update(); 
    }
  };

  TriangleCollection.prototype.getDead = function() {
    for (var id in this.triangles) {
      if (this.triangles[id].isDead) { return id; }
    }
  };

  return TriangleCollection;

})(Utils);
