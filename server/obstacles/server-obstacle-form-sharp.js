(function() {
  'use strict';

  var BaseObstacle = require('./server-obstacle-base-model.js')
    , utils    = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config   = require('../../shared/config.js')
    , forms    = config.forms

    , ServerObstacle = {};

  ServerObstacle.SharpForm = function(id) {
    BaseObstacle.call(this, id);

    this.type     = 'sharpForm';
    this.radius   = utils.random.getInt(forms.radiusRange) * config.sizeFactor;
    this.vertices = utils.vertices.getIrregularPolygon(3, this.radius);
    this.sound    = this.createSound(forms.sharp.waveform);
  };

  inherits(ServerObstacle.SharpForm, BaseObstacle);

  module.exports = ServerObstacle.SharpForm;

})(this);