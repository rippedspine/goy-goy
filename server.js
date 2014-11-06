var express = require('express')
  , app  = express()
  , http = require('http').Server(app)
  , io   = require('socket.io')(http)
  , port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/.tmp'));
app.use('/bower',  express.static(__dirname + '/bower'));

http.listen(port, function() {
  console.log('\n\n:::::::::: listening on localhost:' + port + ' ::::::::::\n');
});

var Player = require('./server/server-player.js')
  , Obstacle = require('./server/obstacles/__server-obstacle.js')
  , Game = require('./server/server-game.js')
  , CollisionHandler = require('./server/server-collision.js')
  , msgs = require('./shared/messages.js');

var game = new Game(
  new CollisionHandler(),
  new Player.Collection({model: Player.Model}), 
  new Obstacle.Collection({model: Obstacle.SharpForm}),
  new Obstacle.Collection({model: Obstacle.RoundForm}),
  new Obstacle.Collection({model: Obstacle.NoiseForm}),
  new Obstacle.Collection({model: Obstacle.BassForm})
);

game.start();

io.on('connection', function(socket) {
  msgs.logger.connect(socket.id);

  if (game.players.count() > 0) {
    socket.emit(msgs.socket.sendPlayers, game.players.send()); 
  }

  socket.emit(msgs.socket.connect, {
    obstacles: {
      roundForms : game.roundForms.get(),
      sharpForms : game.sharpForms.get(),
      noiseForms : game.noiseForms.get(),
      bassForms  : game.bassForms.get()
    },
    player     : new Player.Model(socket.id)
  });

  socket.on(msgs.socket.newPlayer, function(data) {
    game.players.add(data);
    socket.broadcast.emit(msgs.socket.newPlayer, game.players.send(data.id));
  });

  socket.on(msgs.socket.updatePlayer, function(player) {
    game.players.set(player);
    game.player = game.players.get(player.id);

    socket.broadcast.emit(msgs.socket.updatePlayer, game.player.send());

    game.detectCollisions();
    var collision = game.getCollision();
    if (typeof collision !== 'undefined') {
      io.emit(msgs.socket.collision, collision);
    }
  });

  socket.on(msgs.socket.deadObstacle, function(data) {
    io.emit(msgs.socket.updateObstacles, game.handleDeadObstacles(data));
  });

  socket.on('disconnect', function() {
    msgs.logger.disconnect(socket.id);
    game.players.remove(socket.id);
    io.sockets.emit(msgs.socket.disconnect, socket.id);
  });
}); 
