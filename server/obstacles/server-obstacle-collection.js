(function() {
  'use strict';

  var BaseCollection = require('../../shared/base/collection.js')
    , utils = require('../../shared/utils.js')
    , inherits = utils.inherits
    , config = require('../../shared/config.js')
    , forms = config.forms

    , ServerObstacle = {};

  ServerObstacle.Collection = function(options) {
    BaseCollection.call(this, options);
  };

  inherits(ServerObstacle.Collection, BaseCollection);

  ServerObstacle.Collection.prototype.spawn = function(amount) {
    for (var id = 0; id < amount; id++) {
      this.collection[id] = new this.model(id);
    }
  };

  ServerObstacle.Collection.prototype.resurrect = function(id) {
    this.collection[id] = new this.model(id);
    return this.collection[id];
  };

  ServerObstacle.Collection.prototype.set = function(data) {
    for (var id in data) {
      this.collection[id].set(data[id]);
    }
  };

  ServerObstacle.Collection.prototype.send = function(id) {
    return this.collection[id].send();
  };

  module.exports = ServerObstacle.Collection;

})(this);