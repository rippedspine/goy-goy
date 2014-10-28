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

var config = require('./shared/config.js')
  , utils = require('./shared/utils.js')
  , Player = require('./server/server-player.js')
  , Triangle = require('./server/server-triangle.js')
  , msgs = require('./shared/messages.js')

  , myPlayer = null
  , players = new Player.Collection({model: Player.Model})
  , triangles = new Triangle.Collection({model: Triangle.Model});

var detectCollision = function(player, obstacles) {
  for (var id in obstacles) {
    if (utils.circleCollision(player, obstacles[id])) {
      return {
        playerID: player.id,
        obstacle: obstacles[id].send()
      };
    }
  }
};

triangles.spawn();

io.on('connection', function(socket) {
  msgs.logger.connect(socket.id);

  if (players.count() > 0) {
    socket.emit(msgs.socket.sendPlayers, players.send()); 
  }

  myPlayer = new Player.Model();
  myPlayer.setup(socket.id);

  socket.emit(msgs.socket.connect, {
    triangles: triangles.get(),
    player: myPlayer,
    area: config.area
  });

  socket.on(msgs.socket.newPlayer, function(data) {
    players.add(data);
    socket.broadcast.emit(msgs.socket.newPlayer, players.send(data.id));
  });

  socket.on(msgs.socket.updatePlayer, function(data) {
    players.set(data.player);
    socket.broadcast.emit(msgs.socket.updatePlayer, players.send(data.player.id));

    var collisionData = detectCollision(players.get(data.player.id), triangles.get());

    if (collisionData) {
      socket.emit(msgs.socket.collision, collisionData);
      socket.broadcast.emit(msgs.socket.collision, collisionData);

      triangles.set(data.triangles);
      triangles.remove(collisionData.obstacle.id);

      socket.emit(msgs.socket.updateObstacles, triangles.get());
      socket.broadcast.emit(msgs.socket.updateObstacles, triangles.get());
    }
  });

  socket.on(msgs.socket.deadObstacle, function(data) {
    triangles.removeDead(data.deadID);
    triangles.set(data.triangles);
    socket.emit(msgs.socket.updateObstacles, triangles.get());
  });

  socket.on('disconnect', function() {
    msgs.logger.disconnect(socket.id);
    socket.broadcast.emit(msgs.socket.disconnect, socket.id);
    players.remove(socket.id);
  });
});