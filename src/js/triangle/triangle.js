Gaia.Triangle = Gaia.Triangle || (function() {
  'use strict';

  var Triangle = function(serverData) {
    this.didCollide = false;
    this.fillTimer = 1;
    this.frequency = 0.02;
    
    this.soundID = serverData.soundID;

    Gaia.Geometry.call(this, {
      radius: serverData.radius,
      color: serverData.color,
      position: serverData.position,
      rotation: serverData.rotation
    });

    this.vertices = serverData.vertices;
  };

  Triangle.prototype = Object.create(Gaia.Geometry.prototype);

  Triangle.prototype.update = function() {
    this.rotate();
    this.onCollision();
  };

  Triangle.prototype.rotate = function() {
    this.rotation += this.frequency;
    if (this.rotation > 360) {
      this.rotation = 0;
    }
  };

  Triangle.prototype.onCollision = function() {
    if (this.didCollide) {
      this.isFilled = true;
      this.fillTimer -= 0.05;

      if (this.fillTimer < 0) {
        this.isFilled = false;
      }

      this.scale += this.frequency;
      this.alpha -= this.frequency;

      if (this.alpha < 0) {
        this.alpha = 0;
      }
    }    
  };

  return Triangle;

})();
