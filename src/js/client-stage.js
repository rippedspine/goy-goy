(function() {
  'use strict';

  var config = require('../../shared/config.js')
    , StarField = require('./shapes/starfield.js');

  var Stage = function() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.objects = {
      obstacles: {},
      players: {}
    }; 
    
    this.width  = this.canvas.width  = config.area.size[0];
    this.height = this.canvas.height = config.area.size[1];

    this.zoom = 1;

    this.starField = new StarField({
      numStars: 200,
      width: this.width,
      height: this.height
    });

    this.setSize();

    window.addEventListener('resize', this.setSize.bind(this));
    document.body.appendChild(this.canvas);
  };

  Stage.prototype.render = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.starField.draw(this.context);
    this.objects.obstacles.draw(this.context);
    this.objects.players.draw(this.context);
  };

  Stage.prototype.setSize = function() {
    var ww = window.innerWidth
      , wh = window.innerHeight
      , nh = ww * config.area.ratioFactor.h;
      
    this.canvas.style.width  = ww + 'px';
    this.canvas.style.height = nh + 'px';
    this.canvas.style.top    = wh * 0.5 - nh * 0.5 + 'px';
    
    this.context.zoom = this.canvas.zoom = config.area.size[0] / ww;
  };

  Stage.prototype.setCollection = function(type, collection) {
    this.objects[type] = collection;
  };

  Stage.prototype.addToCollection = function(type, object) {
    if (type === 'obstacles') {
      this.objects[type][type][object.type + 's'][object.id] = object;
    }
    this.objects[type][object.id] = object;
  };

  Stage.prototype.removeFromCollection = function(type, id) {
    delete this.objects[type][id];
  };

  module.exports = Stage;

})(this);