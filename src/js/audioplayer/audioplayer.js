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

    console.log(this.audiolet);
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
    
      this.audiolet.scheduler.addAbsolute(0,
        function() {
          var frequency = 880;
          var synth = new Synth(this.audiolet, frequency);
          synth.play('triangle', 2.5, frequency, 2000, 2500);
        }.bind(this)
      );
    
      this.audiolet.scheduler.play(5, 4,
          function() {
            var frequency = this.toneFrequencies[utils.random.getInt(0, 9)];
            var synth = new Synth(this.audiolet, frequency);
            synth.play('triangle', 2.5, frequency, 2000, 2500);

          }.bind(this)
      );

    console.log(this.firstNote);
  };

  // AudioPlayer.prototype.fadeIn = function(audio, rampTime, targetVolume, tick) {
  //   //
  //   if(!targetVolume) {
  //       targetVolume = 1;
  //   }

  //   // By default, ramp up in one second
  //   if(!rampTime) {
  //       rampTime = 1000;
  //   }

  //   // How often adjust audio volume (ms)
  //   if(!tick) {
  //       tick = 50;
  //   }

  //   var volumeIncrease = targetVolume / (rampTime / tick);

  //   var playingEventHandler = null;

  //   function ramp() {
  //       console.log('ramp');
  //       var vol = Math.min(targetVolume, audio.volume + volumeIncrease);

  //       audio.volume = vol;

  //        // Have we reached target volume level yet?
  //       if(audio.volume < targetVolume) {
  //           // Keep up going until 11
  //           setTimeout(ramp, tick);
  //       }
  //   }

  //   function startRampUp() {
  //       console.log('stramp');
  //       // For now, we capture only the first playing event
  //       // as we assume the user calls fadeIn()
  //       // every time when wants to resume playback
  //       audio.removeEventListener('playing', playingEventHandler);

  //       ramp();
  //   }

  //   // Start with zero audio level
  //   audio.volume = 0;

  //   // Start volume ramp up when the audio actually stars to play (not when begins to buffer, etc.)
  //   audio.addEventListener('playing', startRampUp);

  //   audio.play();
  // };

  module.exports = AudioPlayer;

})(this);


