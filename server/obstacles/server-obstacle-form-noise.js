(function() {
  'use strict';

  var BaseObstacle = require('./server-obstacle-base-model.js')
    , utils    = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config   = require('../../shared/config.js')
    , forms    = config.forms

    , ServerObstacle = {};

  ServerObstacle.NoiseForm = function(id) {
    BaseObstacle.call(this, id);
    
    this.type   = 'noiseForm';
    this.points = utils.random.getInt(forms.radiusRange) - 4;
    this.radius = (this.points + 4) * config.sizeFactor;
    this.sound  = this.createSound(forms.noise.waveform);
  };

  inherits(ServerObstacle.NoiseForm, BaseObstacle);

  module.exports = ServerObstacle.NoiseForm;

})(this);