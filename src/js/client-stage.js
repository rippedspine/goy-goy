(function() {
  'use strict';

  var config = require('../../shared/config.js');

  var Stage = function() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.background = config.area.color;
    
    this.context = this.canvas.getContext('2d');
    this.objects = {}; 
    
    this.width   = this.canvas.width = config.area.size[0];
    this.height  = this.canvas.height = config.area.size[1];

    this.zoom = 1;

    this.setSize();

    window.addEventListener('resize', this.setSize.bind(this));
    document.body.appendChild(this.canvas);
  };

  Stage.prototype.render = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    for (var type in this.objects) {
      if (this.objects[type] !== null) {
        this.objects[type].draw(this.context);
      }
    }
    this.context.restore();
  };

  Stage.prototype.setSize = function() {
    var ww = window.innerWidth
      , wh = window.innerHeight
      , nh = ww * config.area.ratioFactor.h;
    this.canvas.style.width = ww + 'px';
    this.canvas.style.height = nh + 'px';
    this.canvas.style.top = wh * 0.5 - nh * 0.5 + 'px';
    this.context.zoom = this.canvas.zoom = config.area.size[0] / ww;
  };

  Stage.prototype.setCollection = function(type, collection) {
    this.objects[type] = collection;
  };

  Stage.prototype.addToCollection = function(type, object) {
    this.objects[type][object.id] = object;
  };

  Stage.prototype.removeFromCollection = function(type, id) {
    delete this.objects[type][id];
  };

  module.exports = Stage;

})(this);