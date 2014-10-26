Gaia.AudioPlayer = Gaia.AudioPlayer || (function(u) {
  'use strict'

  var AudioPlayer = function(audiolet, tones) {
    this.audiolet = audiolet;
    this.frequencies = tones.getFrequencies();
    this.synth = null;
  };

  AudioPlayer.prototype.play = function() {
    this.synth = new Gaia.Synth(this.audiolet);
    this.synth.play('sine', u.getRandomInt([0.05, 0.08]), this.frequencies[u.getRandomInt([0, this.frequencies.length])]);//this.frequencies[4]);
  };

  return AudioPlayer;

})(Gaia.Utils);
