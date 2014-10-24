var express = require('express')
  , app = express()
  , http = require('http').Server(app)
  , io = require('socket.io')(http)
  , port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use('/bower',  express.static(__dirname + '/bower'));
app.use('/common',  express.static(__dirname + '/common'));

http.listen(port, function() {
  console.log('\n\n:::::::::: listening on localhost:' + port + ' ::::::::::\n');
});

var constants = require('./server-constants.js')
  , player = require('./server-player.js')
  , triangle = require('./server-triangle.js')

  , MSG_CONNECT = 1
  , MSG_DISCONNECT = 2
  , MSG_NEW_PLAYER = 3
  , MSG_SEND_PLAYERS = 4
  , MSG_UPDATE_PLAYER = 5
  , MSG_DEAD_OBSTACLE = 6
  , MSG_UPDATE_OBSTACLES = 7
  , MSG_COLLIDED = 8

  , myPlayer = null
  , playerCollection = new player.Collection()
  , triangleCollection = new triangle.Collection()
  , collidedWithTriangle = null;

triangleCollection.spawn();

io.on('connection', function(socket) {
  console.log('Connected:', socket.id);

  if (playerCollection.hasPlayers()) {
    socket.emit(MSG_SEND_PLAYERS, playerCollection.get()); 
  }

  myPlayer = new player.Player(socket.id);
  collidedWithTriangle = playerCollection.makeCollisionDetector(triangleCollection.get());

  socket.emit(MSG_CONNECT, {
    triangles: triangleCollection.get(),
    player: myPlayer,
    area: constants.area
  });

  socket.on(MSG_NEW_PLAYER, function(data) {
    playerCollection.add(data);
    socket.broadcast.emit(MSG_NEW_PLAYER, playerCollection.get(data.id));
  });

  socket.on(MSG_UPDATE_PLAYER, function(data) {
    playerCollection.set(data.player);
    socket.broadcast.emit(MSG_UPDATE_PLAYER, playerCollection.get(data.player.id));

    var collision = collidedWithTriangle(data.player.id);

    if (collision) {
      socket.emit(MSG_COLLIDED, collision);
      socket.broadcast.emit(MSG_COLLIDED, collision);

      triangleCollection.set(data.triangles);
      triangleCollection.remove(collision.obstacle);
      socket.emit(MSG_UPDATE_OBSTACLES, triangleCollection.get());
      socket.broadcast.emit(MSG_UPDATE_OBSTACLES, triangleCollection.get());
    }
  });

  socket.on(MSG_DEAD_OBSTACLE, function(data) {
    triangleCollection.removeDead(data.deadID);
    triangleCollection.set(data.triangles);
    socket.emit(MSG_UPDATE_OBSTACLES, triangleCollection.get());
  });

  socket.on('disconnect', function() {
    console.log('Disconnected:', socket.id);
    socket.broadcast.emit(MSG_DISCONNECT, socket.id);
    playerCollection.remove(socket.id);
  });
});