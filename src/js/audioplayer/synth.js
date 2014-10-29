(function() {
  'use strict';

  function Synth(audiolet, frequencies) {
    this.audiolet = audiolet;

    AudioletGroup.apply(this, [this.audiolet, 0, 1]);

    this.gain = new Gain(this.audiolet);
    this.reverb = new Reverb(this.audiolet, 0.5, 0.5, 0.5);
    this.filter = new LowPassFilter(this.audiolet, 400);
    this.gain.connect(this.reverb);
    this.reverb.connect(this.outputs[0]);
  }

  extend(Synth, AudioletGroup);

  Synth.prototype.getEnvelope = function(soundDecay) {
    return new ADSREnvelope(this.audiolet, 1, 
      0.01, soundDecay, 0, 0,
      function() {
        this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
      }.bind(this)
    );
  };

  Synth.prototype.getWaveform = function(waveform) {
    switch(waveform) {
      case 'saw':
        return new Saw(this.audiolet, this.frequency);
      case 'square':
        return new Square(this.audiolet, this.frequency);
      case 'noise':
        return new WhiteNoise(this.audiolet, this.frequency);
      default:
        return new Sine(this.audiolet, this.frequency);
    }
  };

  Synth.prototype.play = function(waveform, soundDecay, frequency) {
    this.frequency = frequency;
    this.soundDecay = soundDecay || 0.1;
    this.waveform = this.getWaveform(waveform);

    this.envelope = this.getEnvelope(this.soundDecay);
    this.envelope.connect(this.gain, 0, 1);

    this.waveform.connect(this.filter);
    this.filter.connect(this.gain);

    this.connect(this.audiolet.output);

    var that = this;
    setTimeout(function() {
      that.disconnect(that.audiolet.output);
    }, 1000);
  };

  module.exports = Synth;

})(this);
