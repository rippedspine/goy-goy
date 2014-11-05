(function() {
  'use strict';

  var BaseObstacle = require('./_server-obstacle-form-base.js')
    , utils    = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config   = require('../../shared/config.js')
    , forms    = config.forms

    , ServerObstacle = {};

  ServerObstacle.BassForm = function(id) {
    BaseObstacle.call(this, id);

    this.type   = 'bassForm';
    this.spread = 5.05;
    this.width  = 95;
    this.height = 10;
    this.sound  = this.createSound(forms.bass.waveform);
  };

  inherits(ServerObstacle.BassForm, BaseObstacle);

  module.exports = ServerObstacle.BassForm;

})(this);