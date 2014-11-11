(function() {
  'use strict';

  var Vector = require('../../../shared/vector.js')
    , utils = require('../../../shared/utils.js')

    , Client = { Obstacle: {} };

  Client.Obstacle.BaseModel = function(data) {
    this.type       = data.type;
    this.id         = data.id;
    this.didCollide = false;
    this.willFadeIn = true;
    
    this.fillTimer   = 1;
    this.updateHz    = 0.02;

    this.position = new Vector({
      x         : data.x,
      y         : data.y,
      direction : data.direction,
      speed     : 1,
      friction  : 0
    });

    this.boundary = {
      top    : data.y - data.radius * 0.5,
      left   : data.x - data.radius * 0.5,
      bottom : data.y + data.radius * 0.5,
      right  : data.x + data.radius * 0.5
    };

    this.sendDeadEvent = new CustomEvent('dead', {
      'detail': {id: null, type: null}
    });
  };

  Client.Obstacle.BaseModel.prototype.onCollision = function() {
    this.shape.willFadeOut = this.didCollide;

    if (this.didCollide) {
      this.shape.isFilled = true;

      this.fillTimer -= 0.05;
      if (this.fillTimer < 0) {this.shape.isFilled = false;}
      if (this.shape.alpha < 0.05) {        
        this.sendDeadEvent.detail.id   = this.id;
        this.sendDeadEvent.detail.type = this.type;
        document.dispatchEvent(this.sendDeadEvent);

        this.shape.alpha = 0;
        this.didCollide  = false;
      }
    }
  };

  Client.Obstacle.BaseModel.prototype.rotate = function() {
    this.shape.rotation += this.updateHz;
    if (this.shape.rotation > 360) {this.shape.rotation = 0;}
  };

  module.exports = Client.Obstacle.BaseModel;

})(this);