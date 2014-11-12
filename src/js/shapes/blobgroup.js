(function() {
  'use strict';

  var utils = require('../../../shared/utils.js')
    , easing = require('../easing.js')
    , Vector = require('../../../shared/vector.js')
    , Polygon = require('./polygon.js')

    , floor = Math.floor
    , easeOut = easing.easeOut
    , getColorValues = utils.color.getValues
    , getColor = utils.color.get
    , rand = utils.random.get
    , getRandomInt = utils.random.getInt
    , getIrregularPolygon = utils.vertices.getIrregularPolygon;

  var BlobGroup = function(options) {
    this.area = options.area;
    this.blendMode = options.blendMode || null;
    this.color = 'hsl(50,60%,20%)';
    this.numBlobs = options.numBlobs;
    this.blobs = [];

    this.collisionHue = null;
    this.currentHue = null;
  };

  BlobGroup.prototype.draw = function() {
    if (this.blobs.length < this.numBlobs) {
      var r = getRandomInt(300, 400);
      this.blobs.push(new Polygon({
        x: this.area[0] * 0.5,
        y: this.area[1] * 0.5,
        alpha: 0.1,
        radius: r,
        color: this.color,
        isFilled: true,
        updateHz: rand() * 0.01,
        vertices: getIrregularPolygon(getRandomInt(4, 8), r),
        shadowBlur: 70
      }));
    }

    if (this.collisionHue) {this.cycleColor();}

    for (var i = 0; i < this.blobs.length; i++) {
      var b = this.blobs[i];
      b.color = this.color;
      b.rotation += b.updateHz;
      b.draw();
    }  
  };

  BlobGroup.prototype.cycleColor = function() {
    var t = new Date() - this.startColorCycleTime
      , d = 400
      , currHue = this.currentHue
      , hueChange = currHue - this.collisionHue;

    if (t < d) {
      var newHue = easeOut(t, currHue, hueChange, d);
      this.color = getColor(floor(newHue), 60, 20);
    }
  };

  module.exports = BlobGroup;

})(this);