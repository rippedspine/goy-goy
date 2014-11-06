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

    color: {
      range: [0, 360],
      saturation: 60,
      luma: 60
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
        16 * (2569 / 800)
      ]
    },

    player: {
      radius: 5,
      color: 'hsl(180,0%,100%)'
    },

    forms: {
      radiusRange: [7, 16],
      sharp: {
        amount: 10,
        waveform: 'saw'
      },
      round: {
        amount: 10,
        waveform: 'sine'
      },
      noise: {
        amount: 10,
        waveform: 'noise'
      },
      bass: {
        amount: 10,
        waveform: 'bass'
      } 
    }
  };

})(this);