(function() {
  'use strict';

  var utils = require('../../../shared/utils.js')
    , Vector = require('../../../shared/vector.js')

    , random = utils.myMath.random
    , rand = utils.random.get
    , getRandomInt = utils.random.getInt
    , PI = utils.myMath.PI
    , Polygon = require('./polygon.js');

  var BgForms = function(options) {
    this.x = options.x;
    this.y = options.y;
    this.radius = options.radius;
    this.color = options.color;
    this.vertices = options.vertices;
    this.alpha = options.alpha;
    this.isFilled = options.isFilled;
    this.shadowBlur = options.shadowBlur;
    this.shadowOffsetX = options.shadowOffsetX;
    this.shadowOffsetY = options.shadowOffsetY;
    this.blendMode = options.blendMode;

    this.numForms = options.numForms;
    this.forms = [];
    
    this.currentHue = 0;
    this.collisionColor = 'hsl(0,0,0)';
  };

  BgForms.prototype.draw = function() {
    var context = this.context;

    if(this.forms.length < this.numForms) {
      var r = getRandomInt(200, this.radius);
      var f = new Polygon({
        x:        this.x,
        y:        this.y,
        color:    this.color,
        radius:   r,
        vertices: utils.vertices.getIrregularPolygon(getRandomInt(4, 8), r),
        alpha:    this.alpha + getRandomInt(-0.1, 0.1),
        isFilled: this.isFilled,
        shadowBlur: this.shadowBlur + getRandomInt(-20, 50),
        shadowOffsetX: this.shadowOffsetX + getRandomInt(-200, 200),
        shadowOffsetY: this.shadowOffsetY + getRandomInt(-200, 200),
        blendMode: this.blendMode
      });
      this.forms.push(f);
    }

    for(var i = 0; i < this.forms.length; i++) {
      var form = this.forms[i];
      form.color = this.color;
      form.draw();
    }
  };

  BgForms.prototype.cycleColor = function() {
    var newColor = utils.color.getValues(this.collisionColor);
    if (this.currentHue > newColor[0]) {this.currentHue-=5;} else {this.currentHue+=5;}
    this.color = utils.color.get(this.currentHue, 15, 15);
  };

  module.exports = BgForms;

})(this);