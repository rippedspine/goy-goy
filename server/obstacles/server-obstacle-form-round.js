(function() {
  'use strict';

  var BaseObstacle = require('./server-obstacle-base-model.js')
    , utils    = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config   = require('../../shared/config.js')
    , forms    = config.forms

    , ServerObstacle = {};

  ServerObstacle.RoundForm = function(id) {
    BaseObstacle.call(this, id);

    this.type   = 'roundForm';
    this.radius = utils.random.getInt(forms.radiusRange) * config.sizeFactor;
    this.sound  = this.createSound(forms.round.waveform);
  };

  inherits(ServerObstacle.RoundForm, BaseObstacle);

  module.exports = ServerObstacle.RoundForm;

})(this);