(function() {
  'use strict';

  var io = require('socket.io-client')
    , Stage = require('./stage.js')
    , PlayerCollection = require('./player/player-collection.js')
    , PlayerModel = require('./player/player-model.js')
    , TriangleCollection = require('./triangle/triangle-collection.js')
    , TriangleModel = require('./triangle/triangle-model.js')
    , Game = require('./client-game.js')
    , AudioPlayer = require('./audioplayer/audioplayer.js')
    , Tones = require('./audioPlayer/tones.js');

  var players = new PlayerCollection({
    model: PlayerModel,
    audioplayer: new AudioPlayer(new Audiolet(), new Tones())
  });

  var game = new Game(
    io(),
    new Stage(), 
    players, 
    new TriangleCollection({model: TriangleModel})
  );

  game.start();

})(this);
