(function() {
  'use strict';

  var sizeFactor = 2.5; //2000 / 800

  module.exports = {
    area: {
      color: '#111',
      w: 2000,
      h: 1250,
      size: [2000, 1250],
      ratioFactor: {
        h: 0.625,
        w: 1.6
      }
    },

    sizeFactor: sizeFactor,
    
    angleArray: [-125, -45, 45, 125],

    color: {
      range: [0, 360],
      saturation: 60,
      luma: 60
    },

    sound: {
      decayRange: [
        7 * sizeFactor, 
        8 * sizeFactor, 
        9 * sizeFactor, 
        10 * sizeFactor, 
        11 * sizeFactor, 
        12 * sizeFactor, 
        13 * sizeFactor, 
        14 * sizeFactor, 
        15 * sizeFactor, 
        16 * sizeFactor
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