(function() {
  'use strict';

  var Model = require('./player/player-model.js')
    , Collection = require('./player/player-collection.js');

  var Player = {};
  Player.Model = Model;
  Player.Collection = Collection;
  
  module.exports = Player;

})(this);