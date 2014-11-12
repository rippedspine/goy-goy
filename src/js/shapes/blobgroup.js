(function() {
  'use strict';

  var utils = require('../../../shared/utils.js')
    , easing = require('../easing.js')
    , Vector = require('../../../shared/vector.js')
    , Polygon = require('./polygon.js')

    , floor = Math.floor
    , easeOut = easing.easeOut
    , easeIn = easing.easeIn
    , getColorValues = utils.color.getValues
    , getColor = utils.color.get
    , rand = utils.random.get
    , getRandomInt = utils.random.getInt
    , getIrregularPolygon = utils.vertices.getIrregularPolygon;

  var BlobGroup = function(options) {
    this.area = options.area;
    this.startColor = 'hsl(50,0%,20%)';
    this.color = this.startColor;
    this.numBlobs = options.numBlobs;
    this.blobs = [];

    this.collisionHue = null;
    this.currentHue = null;
  };

  BlobGroup.prototype.draw = function() {
    if (this.blobs.length < this.numBlobs) {
      var r = getRandomInt(this.area[1] * 0.2, this.area[1] * 0.25);
      this.blobs.push(new Polygon({
        x: this.area[0] * 0.5,
        y: this.area[1] * 0.5,
        alpha: 0.1,
        radius: r,
        color: this.color,
        isFilled: true,
        updateHz: rand() * 0.01,
        vertices: getIrregularPolygon(getRandomInt(4, 8), r),
        shadow: false
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
    var t = Date.now() - this.startColorCycleTime
      , d = 400
      , currHue = this.currentHue
      , hueChange = currHue - this.collisionHue;

    if (t < d) {
      var newHue = easeOut(t, currHue, hueChange, d);
      this.color = getColor(newHue >> 0, 60, 20);
    }
  };

  module.exports = BlobGroup;

})(this);