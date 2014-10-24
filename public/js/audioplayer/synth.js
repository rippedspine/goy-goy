Gaia.Synth = Gaia.Synth || (function() {
  'use strict'

  function Synth(audiolet, frequencies) {
    this.audiolet = audiolet;

    AudioletGroup.apply(this, [this.audiolet, 0, 1]);

    this.gain = new Gain(this.audiolet);
    this.reverb = new Reverb(this.audiolet, 0.5, 0.5, 0.5);
    this.gain.connect(this.reverb);
    this.reverb.connect(this.outputs[0]);
  }

  extend(Synth, AudioletGroup);

  Synth.prototype.getEnvelope = function() {
    return new ADSREnvelope(this.audiolet, 1, 
      0.01, this.decay, 0, 0,
      function() {
        this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
      }.bind(this)
    );
  };

  Synth.prototype.getWaveform = function(waveform) {
    switch(waveform) {
      case 'saw':
        return new Saw(this.audiolet, this.frequency);
        break;
      case 'square':
        return new Square(this.audiolet, this.frequency);
        break;
      case 'noise':
        return new WhiteNoise(this.audiolet, this.frequency);
        break;
      default:
        return new Sine(this.audiolet, this.frequency);
    }
  };

  Synth.prototype.play = function(waveform, decay, frequency) {
    this.frequency = frequency;
    this.decay = decay || 0.1;
    this.waveform = this.getWaveform(waveform);

    this.envelope = this.getEnvelope();
    this.envelope.connect(this.gain, 0, 1);
    this.waveform.connect(this.gain);

    this.connect(this.audiolet.output);
  };

  return Synth;
})();
