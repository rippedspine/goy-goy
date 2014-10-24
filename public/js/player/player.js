Gaia.Player = Gaia.Player || (function(utils) {
  'use strict';

  var Player = function(data) {
    this.id = data.id;
    this.didCollide = false;
    this.colorTimer = 1;

    Gaia.Geometry.call(this, {
      position: data.position,
      color: '#fff',
      radius: data.radius
    });
    
    this.vertices = data.vertices;

    // pulse
    this.angle = 0;
    this.frequency = 0.05;
  };

  Player.prototype = Object.create(Gaia.Geometry.prototype);

  Player.prototype.update = function() {
    this.pulse();
    this.onCollision();
  };

  Player.prototype.onCollision = function() {
    if (this.didCollide) {
      this.colorTimer -= 0.05;
      if (this.colorTimer < 0) {
        this.didCollide = false;
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

  Player.prototype.send = function() {
    return {
      id: this.id,
      position: this.position,
      vertices: this.vertices,
    };
  };

  return Player;

})(Gaia.Utils);