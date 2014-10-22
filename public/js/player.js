var Player = Player || (function(utils) {
  'use strict';

  var Player = function(data) {
    this.id = data.id;
    this.collided = false;
    this.colorTimer = 1;

    Geometry.call(this, {
      position: data.position,
      color: '#fff',
      radius: data.radius
    });
    
    this.vertices = data.vertices;

    // pulse
    this.angle = 0;
    this.frequency = 0.05;
  };

  Player.prototype = Object.create(Geometry.prototype);

  Player.prototype.update = function() {
    this.pulse();
    if (this.collided) {
      this.colorTimer -= 0.05;
      if (this.colorTimer < 0) {
        this.collided = false;
        this.colorTimer = 1;
        this.color = '#fff';
      }
    }
  };

  Player.prototype.pulse = function() {
    this.strokeWidth = 3 + Math.sin(this.angle) * 2;
    this.angle += this.frequency;
  };

  Player.prototype.move = function(position) {
    this.position = position;
  };

  Player.prototype.sendData = function() {
    return {
      id: this.id,
      position: this.position,
      vertices: this.vertices,
    };
  };

  return Player;

})(Utils);