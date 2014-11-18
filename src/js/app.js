(function() {
  'use strict';

  var io = require('socket.io-client')
    , Stage = require('./client-stage.js')
    , Player = require('./client-player.js')
    , Obstacle = require('./obstacles/__client-obstacle.js')
    , Game = require('./client-game.js')
    , AudioPlayer = require('./audioplayer/audioplayer.js')
    , Splash = require('./splash.js');

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

  var splash = new Splash({
    element: document.getElementById('splash'),
    loader: document.getElementById('loader'),
    playBtn: document.getElementById('play')
  });

  window.addEventListener('load', function(event) {
    splash.onLoad();
    splash.playBtn.addEventListener('click', function(event) {
      event.preventDefault();
      splash.fade(3000);
      game.start(io(), new AudioPlayer(new Audiolet()));
    });
  });

})(this);
