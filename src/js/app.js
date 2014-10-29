(function() {
  'use strict';

  var io = require('socket.io-client')
    , Stage = require('./stage.js')
    , Player = require('./client-player.js')
    , Obstacle = require('./client-obstacle.js')
    , Game = require('./game.js')
    , AudioPlayer = require('./audioplayer/audioplayer.js');

  var game = new Game(
    io(),
    new Stage(), 
    new Player.Collection({model: Player.Model}), 
    new Obstacle.Collection({model: Obstacle.Triangle}),
    new Obstacle.Collection({model: Obstacle.Circle}),
    new AudioPlayer(new Audiolet())
  );

  game.start();

})(this);
