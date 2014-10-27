(function() {
  'use strict'

  function PentatonicScale(tuning) {
    this.degrees = [1,2,3,4,5,6,7,8,9,10];//[1, 3, 5, 8, 10, 13, 15, 17, 20, 22];
    Scale.call(this, this.degrees, tuning);
  }

  extend(PentatonicScale, Scale);

  module.exports = PentatonicScale;

})(this);