var express = require('express')
  , app = express()
  , http = require('http').Server(app)
  , io = require('socket.io')(http)
  , _ = require('lodash')
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
  , collision = require('./server/server-collision.js')

  , msgs = require('./shared/messages.js')
  , game = {};

game.player = null;
game.players = new Player.Collection({model: Player.Model});

game.triangles = new Obstacle.Collection({model: Obstacle.Triangle});
game.circles = new Obstacle.Collection({model: Obstacle.Circle});
game.zigzags = new Obstacle.Collection({model: Obstacle.Zigzag});

game.collisions = [];

game.triangles.spawn(10);
game.circles.spawn(10);
game.zigzags.spawn(10);

io.on('connection', function(socket) {
  msgs.logger.connect(socket.id);

  if (game.players.count() > 0) {
    socket.emit(msgs.socket.sendPlayers, game.players.send()); 
  }

  game.player = new Player.Model(socket.id);

  socket.emit(msgs.socket.connect, {
    circles: game.circles.get(),
    triangles: game.triangles.get(),
    zigzags: game.zigzags.get(),
    player: game.player
  });

  socket.on(msgs.socket.newPlayer, function(data) {
    game.players.add(data);
    socket.broadcast.emit(msgs.socket.newPlayer, game.players.send(data.id));
  });

  socket.on(msgs.socket.updatePlayer, function(data) {
    game.players.set(data.player);
    game.player = game.players.send(data.player.id);

    socket.broadcast.emit(msgs.socket.updatePlayer, game.player);

    game.collisions.triangles = collision(game.player, game.triangles.get());
    game.collisions.circles = collision(game.player, game.circles.get());
    game.collisions.zigzags = collision(game.player, game.zigzags.get());

    for (var type in game.collisions) {
      if (typeof game.collisions[type] !== 'undefined') {
        var id = game.collisions[type].obstacle.id;
        if (!game[type].get(id).shouldBeRemoved) {
          io.emit(msgs.socket.collision, game.collisions[type]);
          game[type].get(id).shouldBeRemoved = true;
        }
      }
    }
  });

  socket.on(msgs.socket.deadObstacle, function(data) {
    if (data.type === 'triangle') {
      io.emit(msgs.socket.updateTriangles, game.triangles.resurrect(data.id));
    } else if (data.type === 'circle') {
      io.emit(msgs.socket.updateCircles, game.circles.resurrect(data.id));
    } else if (data.type === 'zigzag') {
      io.emit(msgs.socket.updateZigzags, game.zigzags.resurrect(data.id));
    }
  });

  socket.on('disconnect', function() {
    msgs.logger.disconnect(socket.id);
    game.players.remove(socket.id);
    io.sockets.emit(msgs.socket.disconnect, socket.id);
  });
}); 
