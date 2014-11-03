(function() {
  'use strict';

  module.exports = {
    area: {
      size: [800, 400],
      color: '#111'
    },
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
    zigzag: {
      amount: 20,
      waveform: 'noise'
    },
    color: {
      range: [0, 360],
      saturation: '60%',
      luma: '60%'
    },
    sound: {
      decayRange: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    }
  };

})(this);