Gaia.AudioPlayer = Gaia.AudioPlayer || (function() {
  'use strict'

  var AudioPlayer = function(audiolet, tones) {
    this.audiolet = audiolet;
    this.frequencies = tones.getFrequencies();
    this.synth = null;
  };

  AudioPlayer.prototype.play = function(id) {
    console.log(id);
    this.synth = new Gaia.Synth(this.audiolet);
    this.synth.play('sine', 0.05, this.frequencies[id]);
  };

  return AudioPlayer;

})();
