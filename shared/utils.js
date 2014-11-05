(function() {
  'use strict';

  var utils = {};

  utils.myMath = {
    floor: Math.floor,
    random: Math.random,
    sqrt: Math.sqrt,
    cos: Math.cos,
    sin: Math.sin,
    max: Math.max,
    min: Math.min,
    PI: Math.PI
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
          , xv = radius * utils.myMath.cos(angle) + utils.random.get() * radius * 0.4
          , yv = radius * utils.myMath.sin(angle) + utils.random.get() * radius * 0.4;
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
      return utils.myMath.sqrt(dx * dx + dy * dy); 
    },

    rangeIntersect: function(min0, max0, min1, max1) {
      return utils.myMath.max(min0, max0) >= utils.myMath.min(min1, max1) && 
        utils.myMath.min(min0, max0) <= utils.myMath.max(min1, max1);
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
      return utils.myMath.floor(utils.myMath.random() * (max - min + 1) + min);  
    },

    get: function() {
      return utils.myMath.random() - 0.5;  
    }
  };

  module.exports = utils;

})(this);