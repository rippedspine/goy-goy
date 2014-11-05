(function() {
  'use strict';

  var BaseObstacle = require('./_server-obstacle-form-base.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../../shared/config.js')
    , forms = config.forms

    , ServerObstacle = {};

  ServerObstacle.SharpForm = function(id) {
    BaseObstacle.call(this, id);

    this.type = 'sharpForm';
    this.radius = utils.random.getInt(forms.radiusRange) * config.sizeFactor;
    this.vertices = utils.vertices.getIrregularPolygon(3, this.radius);
    this.sound = this.createSound(forms.sharp.waveform);
  };

  inherits(ServerObstacle.SharpForm, BaseObstacle);

  ServerObstacle.SharpForm.prototype.set = function(data) {
    this.alpha = data.alpha;
    this.position = data.position;
    this.rotation = data.rotation;
    this.scale = data.scale;
  };

  ServerObstacle.SharpForm.prototype.send = function() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      sound: this.sound,
      color: this.color,
      vertices: this.vertices
    };
  };

  module.exports = ServerObstacle.SharpForm;

})(this);