(function() {
  var io = require('socket.io-client')
    , Stage = require('./stage.js')
    , Player = require('./player/player.js')
    , Triangle = require('./triangle/triangle.js')
    , Game = require('./client-game.js')
    , AudioPlayer = require('./audioplayer/audioplayer.js')
    , Tones = require('./audioPlayer/tones.js');

  var game = new Game(
    io(),
    new Stage(), 
    new Player.Collection({
      model: Player.Model,
      audioplayer: new AudioPlayer(new Audiolet(), new Tones())
    }), 
    new Triangle.Collection({model: Triangle.Model})
  );

  game.start();

})(this);
