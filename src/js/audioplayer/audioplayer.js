(function() {
  'use strict';

  var Synth = require('./synth.js');

  var AudioPlayer = function(audiolet, tones) {
    this.audiolet = audiolet;
    this.frequencies = [261.626, 293.665, 329.628, 391.995, 440, 523.251, 587.330, 659.255, 783.991, 880.000];
    this.synth = null;
  };

  AudioPlayer.prototype.play = function(id, decay, waveform) {
    this.synth = new Synth(this.audiolet);
    this.synth.play(waveform, decay, this.frequencies[id]);

    console.log('id', id);
  };

  module.exports = AudioPlayer;

})(this);
