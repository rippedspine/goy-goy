(function() {
  'use strict';

  module.exports = {
    Collection: require('./server-obstacle-collection.js'),
    SharpForm: require('./server-obstacle-form-sharp.js'),
    RoundForm: require('./server-obstacle-form-round.js'),
    NoiseForm: require('./server-obstacle-form-noise.js'),
    BassForm: require('./server-obstacle-form-bass.js')
  };

})(this);