(function() {
  'use strict';

  var utils = require('../../../shared/utils.js')
    , Vector = require('../../../shared/vector.js');

  var StarField = function(options) {
    this.numStars = options.numStars;
    this.width = options.width;
    this.height = options.height;
    this.stars = [];
  };

  StarField.prototype.draw = function(context) {
    if (this.stars.length < this.numStars) {
      var s = new Vector({
        x: utils.random.getInt(0, this.width),
        y: utils.random.getInt(0, this.height),
        radius: utils.myMath.random() * 8 + 2,
        speed: 1 + utils.myMath.random() * 1,
        direction: 45
      });
      s.alpha = utils.random.get() * 0.15;
      this.stars.push(s);
    }

    for (var i = 0; i < this.stars.length; i++) {
      var star = this.stars[i];
      star.updatePhysics();
      context.save();
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, utils.myMath.PI * 2, false);
      context.fillStyle = 'rgba(210,210,210,'+ star.alpha +')';
      context.fill();
      context.restore();

      if (star.y - (star.radius * 2) > this.height) {
        star.y = -(star.radius * 2);
      }
      if (star.x - (star.radius * 2) > this.width) {
        star.x = -(star.radius * 2);
      }
    }
  };

  module.exports = StarField;

})(this);