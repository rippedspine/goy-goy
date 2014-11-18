var express = require('express')
  , app  = express()
  , http = require('http').Server(app)
  , io   = require('socket.io')(http)
  , port = process.env.PORT || 3000

  , sr = require('./socketrooms.js');

app.use(express.static(__dirname + '/.tmp'));
app.use('/bower',  express.static(__dirname + '/bower'));

http.listen(port, function() {
  console.log('\n\n:::::::::: listening on localhost:' + port + ' ::::::::::\n');
});

var Player = require('./server/server-player.js')
  , Obstacle = require('./server/obstacles/__server-obstacle.js')
  , Game = require('./server/server-game.js')
  , CollisionHandler = require('./server/server-collision.js');

var msgs = require('./shared/messages.js')
  , MAXPARTNERS = 5;

var createGame = function() {
  return new Game(
    new CollisionHandler(),
    new Player.Collection({model: Player.Model}), 
    new Obstacle.Collection({model: Obstacle.SharpForm}),
    new Obstacle.Collection({model: Obstacle.RoundForm}),
    new Obstacle.Collection({model: Obstacle.NoiseForm}),
    new Obstacle.Collection({model: Obstacle.BassForm})
  );
};

var games = {};

io.on('connection', function(socket) {
  msgs.logger.connect(socket.id);
  
  var rooms = sr.getRooms(socket);

  if (sr.count(rooms) > 1) {
    var room = sr.getRoomInRooms(rooms, MAXPARTNERS);
    if (games.hasOwnProperty(room)) {
      sr.joinRoom(socket, room);
      if (games[socket.room].players.count() > 0) {
        socket.emit(msgs.socket.sendPlayers, games[socket.room].players.send());
      }
    } else {
      sr.createRoom(socket, socket.id);
      games[socket.room] = createGame();
    }
  } else {
    sr.createRoom(socket, socket.id);
    games[socket.room] = createGame();
  }

  socket.emit(msgs.socket.connect, {
    obstacles: {
      roundForms : games[socket.room].roundForms.get(),
      sharpForms : games[socket.room].sharpForms.get(),
      noiseForms : games[socket.room].noiseForms.get(),
      bassForms  : games[socket.room].bassForms.get()
    },
    player: new Player.Model(socket.id)
  });

  socket.on(msgs.socket.newPlayer, function(data) {
    games[socket.room].players.add(data);
    socket.broadcast.to(socket.room).emit(msgs.socket.newPlayer, games[socket.room].players.send(data.id));
  });

  socket.on(msgs.socket.updatePlayer, function(player) {
    games[socket.room].players.set(player);
    games[socket.room].player = games[socket.room].players.get(player.id);
    socket.broadcast.to(socket.room).emit(msgs.socket.updatePlayer, games[socket.room].player.send());

    games[socket.room].detectCollisions();
    var collision = games[socket.room].getCollision();
    if (typeof collision !== 'undefined') {
      io.to(socket.room).emit(msgs.socket.collision, collision);
    }
  });

  socket.on(msgs.socket.deadObstacle, function(data) {
    io.to(socket.room).emit(msgs.socket.updateObstacles, games[socket.room].handleDeadObstacles(data));
  });

  socket.on('disconnect', function() {
    msgs.logger.disconnect(socket.id);
    games[socket.room].players.remove(socket.id);
    io.to(socket.room).emit(msgs.socket.disconnect, socket.id);

    if (games[socket.room].players.count() < 1) {
      delete games[socket.room];
      delete socket.adapter.rooms[socket.room];
    }
  });
}); 