(function() {
  'use strict';

  var utils = require('../../../shared/utils.js')
    , Vector = require('../../../shared/vector.js')

    , random = utils.myMath.random
    , rand = utils.random.get
    , getRandomInt = utils.random.getInt
    , PI = utils.myMath.PI;

  var StarField = function(options) {
    this.numStars = options.numStars;
    this.width = options.width;
    this.height = options.height;
    this.context = options.context;
    this.stars = [];
    this.heading = 45;
  };

  StarField.prototype.updateHeading = function(heading) {
    this.heading = heading;
  };

  StarField.prototype.draw = function() {
    var context = this.context
      , w = this.width
      , h = this.height
      , heading = this.heading
      , star, x, y, r, a;

    if (this.stars.length < this.numStars) {
      var s = new Vector({
        x: getRandomInt(0, w),
        y: getRandomInt(0, h),
        radius: random() * 8 + 2,
        speed: random() + 1,
        direction: heading
      });
      s.alpha = rand() * 0.2;
      this.stars.push(s);
    }

    for (var i = 0; i < this.stars.length; i++) {
      star = this.stars[i];
      r = star.radius;
      x = star.x;
      y = star.y;
      a = star.alpha;

      star.setHeading(this.heading);
      star.updatePhysics();
      context.save();
      context.beginPath();

      context.arc(x, y, r, 0, PI * 2, false);
      context.fillStyle = 'rgba(210,210,210,'+ a +')';
      context.fill();
      context.restore();

      if (y - (r * 2) > h) { star.y = -(r * 2); }
      if (x - (r * 2) > w) { star.x = -(r * 2); }
      if (y + (r * 2) < 0) { star.y = h + (r * 2); }
      if (x + (r * 2) < 0) { star.x = w + (r * 2); }
    }
  };

  module.exports = StarField;

})(this);