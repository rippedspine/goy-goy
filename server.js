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
  , MSG_DEAD_TRIANGLE = 6
  , MSG_UPDATE_TRIANGLES = 7

  , players = new player.Collection()
  , triangles = new triangle.Collection()
  , clientPlayer = null;

triangles.spawn();

io.on('connection', function(client) {
  console.log('Connected:', client.id);

  if (players.hasPlayers()) {
    client.emit(MSG_SEND_PLAYERS, players.getAll()); 
  }

  clientPlayer = new player.Player(client.id);

  client.emit(MSG_CONNECT, {
    triangles: triangles.getAll(),
    player: clientPlayer,
    area: constants.area
  });

  client.on(MSG_NEW_PLAYER, function(data) {
    client.broadcast.emit(MSG_NEW_PLAYER, players.addOne(data));
  });

  client.on(MSG_UPDATE_PLAYER, function(data) {
    players.updatePlayer(data);
    client.broadcast.emit(MSG_UPDATE_PLAYER, players.getOne(data.id));
  });

  client.on(MSG_DEAD_TRIANGLE, function(id) {
    triangles.removeDead(id);
    client.emit(MSG_UPDATE_TRIANGLES, triangles.getAll());
  });

  client.on('disconnect', function() {
    console.log('Disconnected:', client.id);
    client.broadcast.emit(MSG_DISCONNECT, client.id);
    players.removeOne(client.id);
  });
});