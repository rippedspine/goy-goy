(function() {
  'use strict';

  var abs = Math.abs;

  module.exports = {
    linear: function(t, b, c, d) {
      return c * t / d + b;
    },

    inQuad: function(t, b, c, d) {
      b = (b === c) ? -b : (b < c) ? b : -b;
      return abs(c * (t /= d) * t + b);
    },

    outQuad: function(t, b, c, d) {
      b = (b === c) ? -b : (b < c) ? b : -b;
      return abs(-c * (t /= d ) * (t - 2) + b);
    },

    inOutQuad: function(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
    }
  };

})(this);