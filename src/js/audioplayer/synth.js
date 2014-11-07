(function() {
  'use strict';

  function Synth(audiolet, frequencies) {
    this.audiolet = audiolet;

    AudioletGroup.apply(this, [this.audiolet, 0, 1]);

    this.gain   = new Gain(this.audiolet);
    this.reverb = new Reverb(this.audiolet, 0.5, 0.5, 0.5);
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
        return new Pulse(this.audiolet, this.frequency);
      case 'bass':
        return new Sine(this.audiolet, this.frequency/3);
      case 'triangle':
        return new Triangle(this.audiolet, this.frequency/3);
      default:
        return new Sine(this.audiolet, this.frequency);
    }
  };

  Synth.prototype.createFilter = function(filterHz) {
    this.filterHz = filterHz;
    return new LowPassFilter(this.audiolet, this.filterHz);
  };

  Synth.prototype.play = function(waveform, soundDecay, frequency, filterHz, delay) {
    this.frequency  = frequency;
    this.soundDecay = soundDecay || 0.1;
    this.filter     = waveform === 'noise' ? this.createFilter(filterHz) : this.createFilter(400);
    this.waveform   = this.getWaveform(waveform);
    this.delay      = delay;

    this.envelope = this.getEnvelope(this.soundDecay);
    this.envelope.connect(this.gain, 0, 1);

    if(waveform === 'bass') {
      this.modulator = new Sine(this.audiolet, frequency * 0.25);
      this.modulatorMulAdd = this.modulate(200, 0.25, frequency);
    } else if (waveform === 'noise') {
      this.modulator = new WhiteNoise(this.audiolet, frequency * 2);
      this.modulatorMulAdd = this.modulate(500, 1, frequency);
    } else if (waveform === 'triangle') {
      this.modulator = new WhiteNoise(this.audiolet, frequency * 2.5);
      this.modulatorMulAdd = this.modulate(200, 0.333, frequency);
    }

    if(waveform === 'bass' || waveform === 'noise' || waveform === 'triangle') {
      this.modulator.connect(this.modulatorMulAdd);
      this.modulatorMulAdd.connect(this.waveform);
    }

    this.waveform.connect(this.filter);
    this.filter.connect(this.gain);

    this.connect(this.audiolet.output);

    this.disconnectSound();
  };

  Synth.prototype.disconnectSound = function() {
    setTimeout(function() {
      this.disconnect(this.audiolet.output); 
    }.bind(this), this.delay);
  };

  Synth.prototype.modulate = function(var1, var2, frequency) {
    return new MulAdd(this.audiolet, var1, frequency * var2);
  };

  module.exports = Synth;

})(this);
