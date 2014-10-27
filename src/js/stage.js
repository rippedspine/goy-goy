(function() {
  'use strict';

  var Stage = function() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.objects = {
      players: null,
      triangles: null,
      circles: null
    };
    
    this.canvas.style.background = '#222';
    document.body.appendChild(this.canvas);
  };

  Stage.prototype.render = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (var type in this.objects) {
      if (this.objects[type] !== null) {
        this.objects[type].draw(this.context);
      }
    }
  };

  Stage.prototype.setCollection = function(type, collection) {
    this.objects[type] = collection;
  };

  Stage.prototype.setSize = function(area) {
    this.width = this.canvas.width = area[0];
    this.height = this.canvas.height = area[1];  
  };

  module.exports = Stage;

})(this)