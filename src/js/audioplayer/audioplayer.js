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
    this.synth = null;
  };

  AudioPlayer.prototype.play = function(sound) {
    this.synth = new Synth(this.audiolet);
    if(sound.waveform === 'bass') {
      this.synth.play(sound.waveform, sound.decay, this.toneFrequencies[sound.id], 200);
    } else {
      this.synth.play(sound.waveform, sound.decay, this.toneFrequencies[sound.id], 400);
    }
  };

  module.exports = AudioPlayer;

})(this);
