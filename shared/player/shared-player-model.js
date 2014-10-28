(function() {
  'use strict';
  
  var SharedPlayerModel = function() {
    this.id = null;
    this.radius = 0;
    this.position = [0, 0];
    this.vertices = [];
  };

  SharedPlayerModel.prototype.set = function(data) {
    this.id = data.id;
    this.radius = data.radius;
    this.position = data.position;
    this.vertices = data.vertices;
  };

  SharedPlayerModel.prototype.send = function() {
    return {
      id: this.id,
      radius: this.radius,
      position: this.position,
      vertices: this.vertices
    };
  };

  module.exports = SharedPlayerModel;
  
})(this);