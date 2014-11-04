(function() {
  'use strict';

  module.exports = {
    area: {
      color: '#111',
      size: [2569, 1600],
      ratioFactor: {
        h: 0.625,
        w: 1.6
      }
    },
    sizeFactor: 2569 / 800,
    angleArray: [-125, -45, 45, 125],
    player: {
      radius: 5,
      color: '#eee'
    },
    line: {
      amount: 20,
      waveform: 'noise'
    },
    circle: {
      amount: 20,
      waveform: 'sine',
      radiusRange: [7, 16]
    },
    triangle: {
      amount: 20,
      waveform: 'saw',
      radiusRange: [7, 16]
    },
    noiseform: {
      amount: 20,
      waveform: 'noise'
    },
    bassform: {
      amount: 20,
      waveform: 'bass'
    },
    color: {
      range: [0, 360],
      saturation: '60%',
      luma: '60%'
    },
    sound: {
      decayRange: [
      7 * (2569 / 800), 
      8 * (2569 / 800), 
      9 * (2569 / 800), 
      10 * (2569 / 800), 
      11 * (2569 / 800), 
      12 * (2569 / 800), 
      13 * (2569 / 800), 
      14 * (2569 / 800), 
      15 * (2569 / 800), 
      16 * (2569 / 800)]
    }
  };

})(this);