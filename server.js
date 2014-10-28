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
  , msgs = require('./shared/messages.js')

  , myPlayer = null
  , players = new Player.Collection({model: Player.Model});

io.on('connection', function(socket) {
  msgs.logger.connect(socket.id);

  if (players.count() > 0) {
    socket.emit(msgs.socket.sendPlayers, players.send()); 
  }

  myPlayer = new Player.Model();
  myPlayer.setup(socket.id);

  socket.emit(msgs.socket.connect, {player: myPlayer});

  socket.on(msgs.socket.newPlayer, function(data) {
    players.add(data);
    socket.broadcast.emit(msgs.socket.newPlayer, players.send(data.id));
  });

  socket.on(msgs.socket.updatePlayer, function(data) {
    players.set(data.player);
    socket.broadcast.emit(msgs.socket.updatePlayer, players.send(data.player.id));
  });

  socket.on('disconnect', function() {
    msgs.logger.disconnect(socket.id);
    socket.broadcast.emit(msgs.socket.disconnect, socket.id);
    players.remove(socket.id);
  });
});