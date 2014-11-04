(function() {
  'use strict';

  var Synth = require('./synth.js');

  var AudioPlayer = function(audiolet) {
    this.audiolet = audiolet;
    this.toneFrequencies = [
      261.626, 
      293.665, 
      329.628, 
      391.995, 
      440, 
      523.251, 
      587.330, 
      659.255,
      783.991, 
      880.000
    ];
    this.filterFrequencies = [
      3000,
      2500,
      2000,
      1500,
      1000,
      500,
      400,
      300,
      200,
      100
    ];
    this.synth = null;
  };

  AudioPlayer.prototype.play = function(sound) {
    this.synth = new Synth(this.audiolet);
    if(sound.waveform === 'noise') {
      this.synth.play(sound.waveform, sound.decay, 440, this.filterFrequencies[sound.id]);
    } else {
      this.synth.play(sound.waveform, sound.decay, this.toneFrequencies[sound.id], 400);
    }
  };

  module.exports = AudioPlayer;

})(this);
