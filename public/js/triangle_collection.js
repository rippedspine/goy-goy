var TriangleCollection = TriangleCollection || (function(utils, _) {
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
    for (var id in this.triangles) {
      if (utils.circleCollision(player, this.triangles[id])) {
        this.triangles[id].isActive = true;
        player.color = this.triangles[id].color;
        player.collided = true;
        return id;
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
    var dead = [];
    for (var id in this.triangles) {
      if (this.triangles[id].isDead) { dead.push(id); }
    }
    return dead.length > 0 ? dead : false;
  };

  TriangleCollection.prototype.sendData = function() {
    var data = {};
    for (var id in this.triangles) {
      data[id] = {
        id: id,
        position: this.triangles[id].position,
        rotation: this.triangles[id].rotation
      };
    }
    return data;
  };

  TriangleCollection.prototype.count = function() {
    return _.size(this.triangles);
  };

  return TriangleCollection;

})(Utils, _);
