(function() {
  'use strict';

  var utils = {}

    , math       = Math
    , mathFloor  = math.floor
    , mathRandom = math.random
    , mathSqrt   = math.sqrt
    , mathCos    = math.cos
    , mathSin    = math.sin
    , mathAtan2  = math.atan2
    , mathMax    = math.max
    , mathMin    = math.min
    , mathPI     = math.PI;

  utils.myMath = {
    floor  : mathFloor,
    random : mathRandom,
    sqrt   : mathSqrt,
    cos    : mathCos,
    sin    : mathSin,
    atan2  : mathAtan2,
    max    : mathMax,
    min    : mathMin,
    PI     : mathPI
  };

  utils.inherits = function(child, parent) {
    child.prototype = Object.create(parent.prototype);
  };

  utils.color = {
    get: function(hue, saturation, luma) {
      return 'hsl(' + [
        hue, 
        saturation + '%', 
        luma + '%'
      ].join(',') + ')';
    },

    getValues: function(color) {
      return color
        .substring(4, color.length - 1)
        .split(',')
        .map(function(value) {
          return parseInt(value);
        });
    }
  };

  utils.sound = {
    getDecay: function(min, max, range, radius) {
      return min + (max * range.indexOf(radius));
    }
  };

  utils.position = {
    getRandomInArea: function(area, offset) {
      offset = typeof offset === 'undefined' ? 0 : offset;
      return {
        x: utils.random.getInt(offset, area[0] - offset),
        y: utils.random.getInt(offset, area[1] - offset)
      };
    },

    getScreenToWorld: function(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * canvas.zoom,
        y: (event.clientY - rect.top) * canvas.zoom
      };
    }
  };

  utils.vertices = {
    getIrregularPolygon: function(points, radius) {
      var vertices = [];
      for (var i = 0; i < points; i++) {
        var angle = i * 2 * utils.myMath.PI / points
          , xv = radius * mathCos(angle) + utils.random.get() * radius * 0.4
          , yv = radius * mathSin(angle) + utils.random.get() * radius * 0.4;
        vertices.push({x: xv, y: yv});
      }
      return vertices;
    },

    getStar: function(points) {
      var vertices = [];
      for (var i = 0; i < points; i++) {
        var xv = i
          , yv = i % 2 === 0 ? 0 : 1;
        vertices.push({x: xv * 10, y: yv * 10});
      }
      return vertices;
    }
  };

  utils.vector = {
    distance: function(v1, v2) {
      var dx = v2.x - v1.x
        , dy = v2.y - v1.y;
      return mathSqrt(dx * dx + dy * dy); 
    },

    rangeIntersect: function(min0, max0, min1, max1) {
      return mathMax(min0, max0) >= mathMin(min1, max1) && 
        mathMin(min0, max0) <= mathMax(min1, max1);
    },

    wrapBounce: function(p, rect) {
      if (p.x + p.radius > rect.right) {
        p.x = rect.right - p.radius;
        p.vx *= p.bounciness;
      }
      if (p.x - p.radius < rect.left) {
        p.x = p.radius + rect.left;
        p.vx *= p.bounciness;
      }
      if (p.y + p.radius > rect.bottom) {
        p.y = rect.bottom - p.radius;
        p.vy *= p.bounciness;
      }
      if (p.y - p.radius < rect.top) {
        p.y = p.radius + rect.top;
        p.vy *= p.bounciness;
      }
    }
  };

  utils.random = {
    getInt: function(minOrRange, max) {
      var min = minOrRange;
      if (arguments.length === 1) {
        min = minOrRange[0];
        max = minOrRange[1];
      }
      return mathFloor(mathRandom() * (max - min + 1) + min);  
    },

    get: function() {
      return mathRandom() - 0.5;  
    }
  };

  module.exports = utils;

})(this);