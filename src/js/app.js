(function() {
  'use strict';

  var io = require('socket.io-client')
    , Stage = require('./stage.js')
    , PlayerCollection = require('./player/player-collection.js')
    , PlayerModel = require('./player/player-model.js')
    , TriangleCollection = require('./triangle/triangle-collection.js')
    , TriangleModel = require('./triangle/triangle-model.js')
    , Game = require('./client-game.js')
    , AudioPlayer = require('./audioplayer/audioplayer.js');

  var game = new Game(
    io(),
    new Stage(), 
    new PlayerCollection({model: PlayerModel}), 
    new TriangleCollection({model: TriangleModel}),
    new AudioPlayer(new Audiolet())
  );

  game.start();

})(this);
