Gaia.AudioPlayer = Gaia.AudioPlayer || (function(u) {
  'use strict'

  var AudioPlayer = function(audiolet, tones) {
    this.audiolet = audiolet;
    this.frequencies = tones.getFrequencies();
    this.synth = null;
  };

  AudioPlayer.prototype.play = function(id, decay) {
    console.log(id);
    this.synth = new Gaia.Synth(this.audiolet);
    this.synth.play('sine', decay, this.frequencies[id]);
  };

  return AudioPlayer;

})(Gaia.Utils);
