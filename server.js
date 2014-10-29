var express = require('express')
  , app = express()
  , http = require('http').Server(app)
  , io = require('socket.io')(http)
  , port = process.env.PORT || 3000;

var dev = true;
var dir = dev ? '/.tmp' : '/build';

app.use(express.static(__dirname + dir));
app.use('/bower',  express.static(__dirname + '/bower'));

http.listen(port, function() {
  console.log('\n\n:::::::::: listening on localhost:' + port + ' ::::::::::\n');
});

var Player = require('./server/server-player.js')
  , Obstacle = require('./server/server-obstacle.js')

  , msgs = require('./shared/messages.js')
  , game = {};

game.player = null;
game.players = new Player.Collection({model: Player.Model});

game.triangles = new Obstacle.Collection({model: Obstacle.Triangle});
game.circles = new Obstacle.Collection({model: Obstacle.Circle});

game.triangles.spawn(20);
game.circles.spawn(20);

io.on('connection', function(socket) {
  msgs.logger.connect(socket.id);

  if (game.players.count() > 0) {
    socket.emit(msgs.socket.sendPlayers, game.players.send()); 
  }

  game.player = new Player.Model(socket.id);

  socket.emit(msgs.socket.connect, {
    circles: game.circles.get(),
    triangles: game.triangles.get(),
    player: game.player
  });

  socket.on(msgs.socket.newPlayer, function(data) {
    game.players.add(data);
    socket.broadcast.emit(msgs.socket.newPlayer, game.players.send(data.id));
  });

  socket.on(msgs.socket.updatePlayer, function(data) {
    game.players.set(data.player);
    socket.broadcast.emit(msgs.socket.updatePlayer, game.players.send(data.player.id));
  });

  socket.on('disconnect', function() {
    msgs.logger.disconnect(socket.id);
    socket.broadcast.emit(msgs.socket.disconnect, socket.id);
    game.players.remove(socket.id);
  });
});