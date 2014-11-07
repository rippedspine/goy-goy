(function() {
  'use strict';

  var Client = { Obstacle: {} };

  Client.Obstacle.Collection = function(obstacles) {
    this.obstacles = {};
    for (var type in obstacles) {
      this.obstacles[type] = obstacles[type];
    }
  };

  Client.Obstacle.Collection.prototype.spawn = function(obstacles) {
    for (var type in obstacles) {
      for (var id in obstacles[type]) {
        var obstacleType = this.obstacles[type];
        obstacleType[id] = new obstacleType.model(obstacles[type][id]);
      }
    }
  };

  Client.Obstacle.Collection.prototype.resurrect = function(data) {
    var obstacleType = this.obstacles[data.type + 's'];
    obstacleType[data.id] = new obstacleType.model(data);
    return obstacleType[data.id];
  };

  Client.Obstacle.Collection.prototype.setCollision = function(data) {
    this.obstacles[data.type + 's'][data.id].didCollide = true;
  };

  Client.Obstacle.Collection.prototype.update = function() {
    for (var type in this.obstacles) {
      for (var id in this.obstacles[type]) {
        if (id !== 'model') {
          this.obstacles[type][id].update();  
        }
      }
    }
  };

  Client.Obstacle.Collection.prototype.draw = function(context) {
    for (var type in this.obstacles) {
      for (var id in this.obstacles[type]) {
        if (id !== 'model') {
          this.obstacles[type][id].shape.draw(context);
        }
      }
    }
  };

  module.exports = Client.Obstacle.Collection;

})(this);