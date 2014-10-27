var express = require('express')
  , app = express()
  , http = require('http').Server(app)
  , io = require('socket.io')(http)
  , port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/src'));
app.use('/bower',  express.static(__dirname + '/bower'));
app.use('/common',  express.static(__dirname + '/common'));

http.listen(port, function() {
  console.log('\n\n:::::::::: listening on localhost:' + port + ' ::::::::::\n');
});

var config = require('./shared/config.js')
  , player = require('./server-player.js')
  , triangle = require('./server-triangle.js')
  , msgs = require('./shared/messages.js')

  , myPlayer = null
  , playerCollection = new player.Collection()
  , triangleCollection = new triangle.Collection()
  , collidedWithTriangle = null;

triangleCollection.spawn();

io.on('connection', function(socket) {
  msgs.logger.connect(socket.id);

  if (playerCollection.hasPlayers()) {
    socket.emit(msgs.socket.sendPlayers, playerCollection.get()); 
  }

  myPlayer = new player.Player(socket.id);
  collidedWithTriangle = playerCollection.makeCollisionDetector(triangleCollection.get());

  socket.emit(msgs.socket.connect, {
    triangles: triangleCollection.get(),
    player: myPlayer,
    area: config.area
  });

  socket.on(msgs.socket.newPlayer, function(data) {
    playerCollection.add(data);
    socket.broadcast.emit(msgs.socket.newPlayer, playerCollection.get(data.id));
  });

  socket.on(msgs.socket.updatePlayer, function(data) {
    playerCollection.set(data.player);
    socket.broadcast.emit(msgs.socket.updatePlayer, playerCollection.get(data.player.id));

    var collision = collidedWithTriangle(data.player.id);

    if (collision) {
      socket.emit(msgs.socket.collision, collision);
      socket.broadcast.emit(msgs.socket.collision, collision);

      triangleCollection.set(data.triangles);
      triangleCollection.remove(collision.obstacle);
      socket.emit(msgs.socket.updateObstacles, triangleCollection.get());
      socket.broadcast.emit(msgs.socket.updateObstacles, triangleCollection.get());
    }
  });

  socket.on(msgs.socket.deadObstacle, function(data) {
    triangleCollection.removeDead(data.deadID);
    triangleCollection.set(data.triangles);
    socket.emit(msgs.socket.updateObstacles, triangleCollection.get());
  });

  socket.on('disconnect', function() {
    msgs.logger.disconnect(socket.id);
    socket.broadcast.emit(msgs.socket.disconnect, socket.id);
    playerCollection.remove(socket.id);
  });
});