(function() {
  'use strict';

  var BaseObstacle = require('./_server-obstacle-form-base.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../../shared/config.js')
    , forms = config.forms

    , ServerObstacle = {};

  ServerObstacle.RoundForm = function(id) {
    BaseObstacle.call(this, id);

    this.type = 'roundForm';
    this.radius = utils.random.getInt(forms.radiusRange) * config.sizeFactor;
    this.sound = this.createSound(forms.round.waveform);
  };

  inherits(ServerObstacle.RoundForm, BaseObstacle);

  ServerObstacle.RoundForm.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.position = data.position;
    this.scale = data.scale;
  };

  ServerObstacle.RoundForm.prototype.send = function() {
    return {
      id: this.id,
      position: this.position,
      sound: this.sound,
      color: this.color
    };
  };

  module.exports = ServerObstacle.RoundForm;

})(this);