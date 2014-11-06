(function() {
  'use strict';

  var msgs = require('../../shared/messages.js')
    , utils = require('../../shared/utils.js');

  var ClientGame = function(
    socket, 
    stage, 
    players, 
    obstacles,
    audioplayer) {

    this.socket      = socket;
    this.stage       = stage;
    this.players     = players;
    this.audioplayer = audioplayer;
    this.obstacles   = obstacles;

    this.player = null;
  };

  ClientGame.prototype.start = function() {
    this.handleSocketEvents();
  };

  ClientGame.prototype.loop = function() {
    requestAnimationFrame(this.loop.bind(this));
    this.stage.render();
    this.update();
  };

  ClientGame.prototype.update = function() {
    this.players.update();
    this.obstacles.update();
  };

  ClientGame.prototype.handleDOMEvents = function() {
    this.stage.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('dead', this.handleDeadObstacle.bind(this));
  };

  ClientGame.prototype.handleDeadObstacle = function(event) {
    this.socket.emit(msgs.socket.deadObstacle, event.detail);
  };

  ClientGame.prototype.handleMouseMove = function(event) {
    this.player.move(utils.position.getScreenToWorld(this.stage.canvas, event));
    this.socket.emit(msgs.socket.updatePlayer, this.player.send());
  };

  ClientGame.prototype.handleSocketEvents = function() {
    this.socket.on(msgs.socket.connect, this.onConnect.bind(this));
    this.socket.on(msgs.socket.disconnect, this.onDisonnect.bind(this));
    this.socket.on(msgs.socket.newPlayer, this.getNewPlayer.bind(this));
    this.socket.on(msgs.socket.getPlayers, this.onGetPlayers.bind(this));
    this.socket.on(msgs.socket.updatePlayer, this.onUpdatePlayer.bind(this));
    this.socket.on(msgs.socket.collision, this.onCollision.bind(this));
    this.socket.on(msgs.socket.updateObstacles, this.onUpdateObstacles.bind(this));
  };

  ClientGame.prototype.onConnect = function(data) {
    msgs.logger.connect(data.player.id);

    this.players.add(data.player);
    this.player = this.players.get(data.player.id);
    this.obstacles.spawn(data.obstacles);

    this.stage.setCollection('players', this.players);
    this.stage.setCollection('obstacles', this.obstacles);

    this.socket.emit(msgs.socket.newPlayer, this.player.send());

    this.handleDOMEvents();
    this.loop();
  };

  ClientGame.prototype.onDisonnect = function(id) {
    msgs.logger.disconnect(id);
    this.players.remove(id);
    this.stage.removeFromCollection('players', id);
  };

  ClientGame.prototype.getNewPlayer = function(player) {
    this.players.add(player);
    this.stage.addToCollection('players', this.players.get(player.id));
  };

  ClientGame.prototype.onGetPlayers = function(players) {
    this.players.set(players);
    this.stage.setCollection('players', this.players);
  };

  ClientGame.prototype.onUpdatePlayer = function(player) {
    this.players.updatePlayer(player);
  };

  ClientGame.prototype.onCollision = function(data) {
    this.players.setCollision(data.playerID, data.obstacle.color);
    this.audioplayer.play(data.obstacle.sound);
    this.obstacles.setCollision(data.obstacle);
  };

  ClientGame.prototype.onUpdateObstacles = function(data) {
    this.stage.addToCollection('obstacles', this.obstacles.resurrect(data));
  };

  module.exports = ClientGame;

})(this);
