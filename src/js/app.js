(function() {
  'use strict';

  var io = require('socket.io-client')
    , Stage = require('./client-stage.js')
    , Player = require('./client-player.js')
    , Obstacle = require('./obstacles/__client-obstacle.js')
    , Game = require('./client-game.js')
    , AudioPlayer = require('./audioplayer/audioplayer.js');

  var game = new Game(
    new Stage(), 
    new Player.Collection({model: Player.Model}), 
    new Obstacle.Collection({
      bassForms  : {model: Obstacle.BassForm},
      noiseForms : {model: Obstacle.NoiseForm},
      sharpForms : {model: Obstacle.SharpForm},
      roundForms : {model: Obstacle.RoundForm}
    }),
    new AudioPlayer(new Audiolet())
  );

  window.addEventListener('load', function(event) {
    game.start(io());
  });

})(this);
