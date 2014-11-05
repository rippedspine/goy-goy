(function() {
  'use strict';

  var BaseObstacle = require('./_server-obstacle-form-base.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../../shared/config.js')
    , forms = config.forms

    , ServerObstacle = {};

  ServerObstacle.NoiseForm = function(id) {
    BaseObstacle.call(this, id);
    
    this.type = 'noiseForm';
    this.points = utils.random.getInt(forms.radiusRange) - 4;
    this.radius = (this.points + 4) * config.sizeFactor;
    this.sound = this.createSound(forms.noise.waveform);
  };

  inherits(ServerObstacle.NoiseForm, BaseObstacle);

  ServerObstacle.NoiseForm.prototype.set = function(data) {
    this.x = data.x;
    this.y = data.y;
  };

  ServerObstacle.NoiseForm.prototype.send = function() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      sound: this.sound,
      color: this.color,
      radius: this.radius,
      points: this.points
    };
  };

  module.exports = ServerObstacle.NoiseForm;

})(this);