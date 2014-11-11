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

    this.socket = null;
    this.player = null;
    this.currentHue = 0;
    this.collisionColor = 'hsl(0, 0%, 0%)';
  };

  ClientGame.prototype.start = function(socket) {
    this.socket = socket;
    this.handleSocketEvents();
    this.audioplayer.sequence();
  };

  ClientGame.prototype.loop = function() {
    requestAnimationFrame(this.loop.bind(this));
    this.render();
    this.update();
  };

  ClientGame.prototype.update = function() {
    this.stage.bgForm.cycleColor();
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
  };

  ClientGame.prototype.handleDeadObstacle = function(event) {
    this.socket.emit(msgs.socket.deadObstacle, event.detail);
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
    this.players.remove(id);
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
    this.stage.bgForm.currentHue = utils.color.getValues(this.stage.bgForm.color)[0];
    this.stage.bgForm.collisionColor = data.obstacle.color;

    console.log('bgForm.color', this.stage.bgForm.color);

    this.players.setCollision(data.playerID, data.obstacle.color);
    this.obstacles.setCollision(data.obstacle);
    this.audioplayer.play(data.obstacle.sound);
  };

  // ClientGame.prototype.cycleColor = function() {
  //   var newColor = utils.color.getValues(this.collisionColor);
  //   if (this.currentHue > newColor[0]) {this.currentHue--;} else {this.currentHue++;}
  //   this.stage.bgForm.color = utils.color.get(this.currentHue, newColor[1] * 0.25, newColor[2] * 0.25);
  // };

  module.exports = ClientGame;

})(this);
// 
