(function() {
  'use strict';

  var Splash = function(options) {
    this.element = options.element;
    this.loader = options.loader;
    this.playBtn = options.playBtn;
  };

  Splash.prototype.onLoad = function() {
    this.loader.className = 'off';
    this.playBtn.className = 'on';
  };

  Splash.prototype.fade = function(delay) {
    this.element.className = 'off';
    setTimeout(function() {
      this.element.style.display = 'none';
    }.bind(this), delay);
  };

  module.exports = Splash;

})(this);