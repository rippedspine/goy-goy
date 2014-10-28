(function() {
  'use strict';

  var BaseCollection = require('../shared/base-classes/base-collection.js')
    , SharedPlayerModel = require('../shared/player/shared-player-model.js')
    , helpers = require('../shared/helpers.js')
    , inherits = helpers.inherits
    , utils = require('../shared/utils.js')
    , config = require('../shared/config.js');

  var PlayerModel = function() {
    SharedPlayerModel.call(this);
  };

  inherits(PlayerModel, SharedPlayerModel);

  PlayerModel.prototype.setup = function(id) {
    this.id = id;
    this.radius = config.radius.player;
    this.position = [
      (config.area[0] * 0.5) - (this.radius * 0.5),
      (config.area[1] * 0.5) - (this.radius * 0.5)
    ];
    this.vertices = helpers.getVertices(5, this.radius);
  };

  var PlayerCollection = function(options) {
    BaseCollection.call(this, options);
  };

  inherits(PlayerCollection, BaseCollection);

  PlayerCollection.prototype.add = function(modelData) {
    var model = new this.model();
    model.setup(modelData.id);
    this.collection[modelData.id] = model;
  };

  module.exports = {
    Model: PlayerModel,
    Collection: PlayerCollection
  };

})(this);