(function() {
  'use strict';

  var BaseObstacle = require('./server-obstacle-base-model.js')
    , utils    = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config   = require('../../shared/config.js')
    , forms    = config.forms

    , ServerObstacle = {};

  ServerObstacle.BassForm = function(id) {
    BaseObstacle.call(this, id);

    this.type   = 'bassForm';
    this.points = utils.random.getInt(forms.radiusRange) - 4;
    this.spread = 2;
    this.width  = utils.random.getInt(7, 16) * config.sizeFactor;
    this.height = this.width * 0.8;
    this.radius = this.width;
    this.sound  = this.createSound(forms.bass.waveform);
  };

  inherits(ServerObstacle.BassForm, BaseObstacle);

  module.exports = ServerObstacle.BassForm;

})(this);