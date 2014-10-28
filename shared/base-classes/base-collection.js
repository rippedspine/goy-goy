(function() {
  'use strict';

  var _ = require('lodash');

  var BaseCollection = function(options) {
    this.model = options.model;
    this.collection = options.collection || {};
  };

  BaseCollection.prototype.get = function(id) {
    if (typeof id === 'undefined') {
      return this.collection;
    }
    return this.collection[id];
  };

  BaseCollection.prototype.set = function(data) {
    this.collection[data.id].set(data);
  };

  BaseCollection.prototype.send = function(id) {
    if (typeof id === 'undefined') {
      var collection = {};
      for (var keyID in this.collection) {
        collection[keyID] = this.collection[keyID].send();
      }
      return collection;
    }
    return this.collection[id].send();
  };

  BaseCollection.prototype.remove = function(id) {
    delete this.collection[id];
  };

  BaseCollection.prototype.count = function() {
    return _.size(this.collection);
  };

  module.exports = BaseCollection;

})(this);