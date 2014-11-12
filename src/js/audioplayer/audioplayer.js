(function() {
  'use strict';

  var Synth = require('./synth.js')
  ,   utils = require('../../../shared/utils.js');

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
    this.durations = [0,0,1,2,1];
  };

  AudioPlayer.prototype.play = function(sound) {
    this.synth = new Synth(this.audiolet);
    if(sound.waveform === 'bass') {
      this.synth.play(sound.waveform, sound.decay, this.toneFrequencies[sound.id], 200, 1000);
    } else {
      this.synth.play(sound.waveform, sound.decay, this.toneFrequencies[sound.id], 400, 1000);
    }
  };

  AudioPlayer.prototype.sequence = function() {    
      this.audiolet.scheduler.play(1, 3,
          function() {
            var frequency = this.toneFrequencies[utils.random.getInt(0, 9)];
            var synth = new Synth(this.audiolet, frequency);
            synth.play('triangle', 2.5, frequency, 2000, 2500);
          }.bind(this)
      );
  };

  module.exports = AudioPlayer;

})(this);
