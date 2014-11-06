(function() {
  'use strict';

  var utils = require('../../shared/utils.js')
    , config = require('../../shared/config.js')
    , color  = config.color

    , ServerObstacle = {};

  ServerObstacle.Base = function(id) {
    this.id       = id;
    this.alpha    = 1;
    this.scale    = 1;
    this.rotation = 0;

    this.x            = utils.position.getRandomInArea(config.area.size, 100).x;
    this.y            = utils.position.getRandomInArea(config.area.size, 100).y;
    this.colorSoundID = utils.random.getInt(color.range[0] + 1, color.range[1]);
    this.color        = utils.color.get(this.colorSoundID, color.saturation, color.luma);
    this.direction    = config.angleArray[utils.random.getInt(0, 3)];

    this.shouldBeRemoved = false;
  };

  ServerObstacle.Base.prototype.createSound = function(waveform) {
    return {
      id: Math.floor(this.colorSoundID/36),
      decay: utils.sound.getDecay(0.02, 0.07, config.sound.decayRange, this.radius),
      waveform: waveform
    };
  };

  module.exports = ServerObstacle.Base;

})(this);