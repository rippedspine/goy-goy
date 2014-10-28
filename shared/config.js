(function() {
  'use strict';

  module.exports = {
    area: [1000, 600],
    radius: {
      player: 30,
    },
    obstacles: {
      line: {
        waveform: 'noise'
      },
      circle: {
        waveform: 'sine'
      },
      triangle: {
        amount: 20,
        waveform: 'saw',
        radiusRange: [7, 16]
      }
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