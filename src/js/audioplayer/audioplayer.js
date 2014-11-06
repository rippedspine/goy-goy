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
  };

  AudioPlayer.prototype.play = function(sound) {
    this.synth = new Synth(this.audiolet);
    if(sound.waveform === 'bass') {
      this.synth.play(sound.waveform, sound.decay, this.toneFrequencies[sound.id], 200);
    } else {
      this.synth.play(sound.waveform, sound.decay, this.toneFrequencies[sound.id], 400);
    }
  };

  AudioPlayer.prototype.sequence = function() {
    // var melodyA = new PSequence(this.toneFrequencies);
    // var frequencyPattern = new PChoose([melodyA],
    //                                    Infinity);

    // var durationPattern = new PChoose([new PSequence([5, 6, 6, 5]),
    //                                    new PSequence([5, 5, 6, 6]),
    //                                    new PSequence([6, 6, 5, 5])],
    //                                   Infinity);
    

    this.audiolet.scheduler.play(290, 5,
        function(frequency) {
          frequency = this.toneFrequencies[utils.random.getInt(0, 9)];
            var synth = new Synth(this.audiolet, frequency);
            synth.play('triangle', 2.5, frequency, 2000);
        }.bind(this)
    );
  };

  module.exports = AudioPlayer;

})(this);

    
