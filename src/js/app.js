(function() {
  'use strict';

  var io = require('socket.io-client')
    , Stage = require('./client-stage.js')
    , Player = require('./client-player.js')
    , Obstacle = require('./obstacles/_client-obstacles.js')
    , Game = require('./client-game.js')
    , AudioPlayer = require('./audioplayer/audioplayer.js');

  window.addEventListener('load', function(event) {
    var game = new Game(
      io(),
      new Stage(), 
      new Player.Collection({model: Player.Model}), 
      new Obstacle.Collection({model: Obstacle.SharpForm}),
      new Obstacle.Collection({model: Obstacle.RoundForm}),
      new Obstacle.Collection({model: Obstacle.NoiseForm}),
      new Obstacle.Collection({model: Obstacle.BassForm}),
      new AudioPlayer(new Audiolet())
    );
    game.start();
  });

})(this);
