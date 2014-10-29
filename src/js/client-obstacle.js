(function() {
  'use strict';

  var BaseCollection = require('../../shared/base/collection.js')
    , Geometry = require('./geometry.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits

    , Client = {Obstacle: {}};

  // ==============================
  // CLIENT OBSTACLE TRIANGLE
  // ==============================

  Client.Obstacle.Triangle = function(data) {
    this.id = data.id;
    Geometry.call(this, data);
  };

  inherits(Client.Obstacle.Triangle, Geometry);

  Client.Obstacle.Triangle.prototype.send = function() {
    return {
      alpha: this.alpha,
      scale: this.scale,
      rotation: this.rotation
    };
  };

  // ==============================
  // CLIENT OBSTACLE CIRCLE
  // ==============================

  Client.Obstacle.Circle = function(data) {
    this.id = data.id;
    Geometry.call(this, data);
  };

  inherits(Client.Obstacle.Circle, Geometry);

  Client.Obstacle.Triangle.prototype.send = function() {
    return {
      alpha: this.alpha,
      scale: this.scale
    };
  };

  // ==============================
  // CLIENT OBSTACLE COLLECTION
  // ==============================

  Client.Obstacle.Collection = function(options) {
    BaseCollection.call(this, options);
  };

  inherits(Client.Obstacle.Collection, BaseCollection);

  module.exports = Client.Obstacle;

})(this);