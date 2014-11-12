(function() {
  'use strict';

  var msgs = require('../../shared/messages.js')
    , utils = require('../../shared/utils.js');

  var ClientGame = function(
    stage, 
    players, 
    obstacles,
    audioplayer) {

    this.stage       = stage;
    this.players     = players;
    this.audioplayer = audioplayer;
    this.obstacles   = obstacles;

    this.socket         = null;
    this.player         = null;

    this.currentHue     = 0;
    this.collisionColor = 'hsl(0, 0%, 0%)';
  };

  ClientGame.prototype.start = function(socket, audioplayer) {
    this.socket = socket;
    this.handleSocketEvents();

    var splash = document.getElementById('splash');
    splash.className = 'off';
    setTimeout(function() {
      splash.style.display = 'none';
    }, 3000);

    setTimeout(function() {
      audioplayer.sequence(true);  
    }, 1000);
  };

  ClientGame.prototype.loop = function() {
    requestAnimationFrame(this.loop.bind(this));
    this.render();
    this.update();
  };

  ClientGame.prototype.update = function() {
    this.players.update();
    this.obstacles.update();
  };

  ClientGame.prototype.render = function() {
    this.stage.render();
    this.players.draw();
    this.obstacles.draw();
  };

  ClientGame.prototype.handleDOMEvents = function() {
    this.stage.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('dead', this.handleDeadObstacle.bind(this));
    document.addEventListener('removePlayer', this.handleRemovePlayer.bind(this));
  };

  ClientGame.prototype.handleDeadObstacle = function(event) {
    this.socket.emit(msgs.socket.deadObstacle, event.detail);
  };

  ClientGame.prototype.handleRemovePlayer = function(event) {
    this.players.remove(event.detail.id);
  };

  ClientGame.prototype.handleMouseMove = function(event) {
    this.player.move(utils.position.getScreenToWorld(this.stage.canvas, event));
    this.stage.starField.updateHeading(this.player.position.getHeading());
    this.socket.emit(msgs.socket.updatePlayer, this.player.send());
  };

  ClientGame.prototype.handleSocketEvents = function() {
    this.socket.on(msgs.socket.connect, this.onConnect.bind(this));
    this.socket.on(msgs.socket.disconnect, this.onRemovePlayer.bind(this));
    this.socket.on(msgs.socket.newPlayer, this.onNewPlayer.bind(this));
    this.socket.on(msgs.socket.getPlayers, this.onGetPlayers.bind(this));
    this.socket.on(msgs.socket.updatePlayer, this.onUpdatePlayer.bind(this));
    this.socket.on(msgs.socket.collision, this.onCollision.bind(this));
    this.socket.on(msgs.socket.updateObstacles, this.onUpdateObstacles.bind(this));
  };

  ClientGame.prototype.onConnect = function(data) {
    msgs.logger.connect(data.player.id);

    this.obstacles.spawn(data.obstacles);

    this.players.add(data.player);
    this.player = this.players.get(data.player.id);

    this.socket.emit(msgs.socket.newPlayer, this.player.send());

    this.handleDOMEvents();
    this.loop();
  };

  ClientGame.prototype.onRemovePlayer = function(id) {
    this.players.fadeOutPlayer(id);
  };

  ClientGame.prototype.onNewPlayer = function(player) {
    this.players.add(player);
  };

  ClientGame.prototype.onGetPlayers = function(players) {
    this.players.set(players);
  };

  ClientGame.prototype.onUpdatePlayer = function(player) {
    this.players.updatePlayer(player);
  };

  ClientGame.prototype.onUpdateObstacles = function(data) {
    this.obstacles.resurrect(data);
  };

  ClientGame.prototype.onCollision = function(data) {
    this.stage.setCollision(data.obstacle.color);
    this.players.setCollision(data.playerID, data.obstacle.color);
    this.obstacles.setCollision(data.obstacle);
    this.audioplayer.play(data.obstacle.sound);
  };

  module.exports = ClientGame;

})(this);
