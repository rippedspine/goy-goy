(function() {
  'use strict';

  var BaseObstacle = require('./_server-obstacle-form-base.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../../shared/config.js')
    , forms = config.forms

    , ServerObstacle = {};

  ServerObstacle.BassForm = function(id) {
    BaseObstacle.call(this, id);

    this.type = 'bassForm';
    this.spread = 5.05;
    this.width = 95;
    this.height = 10;
    this.sound = this.createSound(forms.bass.waveform);
  };

  inherits(ServerObstacle.BassForm, BaseObstacle);

  ServerObstacle.BassForm.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.position = data.position;
    this.scale = data.scale;
    this.pulse = data.pulse;
  };

  ServerObstacle.BassForm.prototype.send = function() {
    return {
      id: this.id,
      position: this.position,
      sound: this.sound,
      color: this.color
    };
  };

  module.exports = ServerObstacle.BassForm;

})(this);