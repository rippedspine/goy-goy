(function() {
  'use strict';

  var Synth = require('./synth.js');

  var AudioPlayer = function(audiolet, tones) {
    this.audiolet = audiolet;
    this.frequencies = tones.getFrequencies();
    this.synth = null;
  };

  AudioPlayer.prototype.play = function(id, decay) {
    this.synth = new Synth(this.audiolet);
    this.synth.play('sine', decay, this.frequencies[id]);
  };

  module.exports = AudioPlayer;

})(this);
