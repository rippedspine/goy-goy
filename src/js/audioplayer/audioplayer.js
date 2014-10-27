(function() {
  'use strict';

  var Synth = require('./synth.js');

  var AudioPlayer = function(audiolet, tones) {
    this.audiolet = audiolet;
    this.frequencies = tones.getFrequencies();
    this.synth = null;
  };

  AudioPlayer.prototype.play = function(id) {
    this.synth = new Synth(this.audiolet);
    this.synth.play('sine', 0.05, this.frequencies[id]);
  };

  module.exports = AudioPlayer;

})(this);