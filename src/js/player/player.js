(function() {
  'use strict';

  var Model = require('./player-model.js')
    , Collection = require('./player-collection.js');

  var Player = {};
  Player.Model = Model;
  Player.Collection = Collection;
  
  module.exports = Player;

})(this);