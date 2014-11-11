(function() {
  'use strict';

  var abs = Math.abs
    , min = Math.min;

  module.exports = {
    linear: function(t, b, c, d) {
      return c * t / d + b;
    },

    easeIn: function(t, b, c, d) {
      b = (b === c) ? -b : (b < c) ? b : -b;
      return abs(c * (t /= d) * t + b);
    },

    easeOut: function(t, b, c, d) {
      b = (b === c) ? -b : (b < c) ? b : -b;
      return abs(-c * (t /= d ) * (t - 2) + b);
    },

    easeInOut: function(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
    }
  };

})(this);