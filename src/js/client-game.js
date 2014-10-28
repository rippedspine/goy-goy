(function() {
  'use strict';

  var msgs = require('../../shared/messages.js')
    , helpers = require('../../shared/helpers.js');

  var Game = function(socket, stage, players, triangles, audioplayer) {
    this.socket = socket;
    this.stage = stage;
    this.players = players;
    this.triangles = triangles;
    this.audioplayer = audioplayer;

    this.player = null;
  };

  Game.prototype.start = function() {
    this.handleSocketEvents();
  };

  Game.prototype.loop = function() {
    requestAnimationFrame(this.loop.bind(this));
    this.stage.render();
    this.update();
  };

  Game.prototype.update = function() {
    this.players.update();
    this.triangles.update();
    this.triangles.getDead();
  };

  Game.prototype.handleDOMEvents = function() {
    this.stage.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('deadObstacle', this.onDeadObstacle.bind(this));
  };

  Game.prototype.onDeadObstacle = function(event) {
    this.socket.emit(msgs.socket.deadObstacle, {
      triangles: this.triangles.sendRotations(),
      deadID: event.detail.id
    });
  };

  Game.prototype.handleMouseMove = function(event) {
    this.player.move(helpers.getPosition(this.stage.canvas, event));
    this.socket.emit(msgs.socket.updatePlayer, {
      player: this.player.send(),
      triangles: this.triangles.sendRotations()
    });
  };

  Game.prototype.handleSocketEvents = function() {
    this.socket.on(msgs.socket.connect, this.onConnect.bind(this));
    this.socket.on(msgs.socket.disconnect, this.onDisonnect.bind(this));
    this.socket.on(msgs.socket.newPlayer, this.getNewPlayer.bind(this));
    this.socket.on(msgs.socket.getPlayers, this.onGetPlayers.bind(this));
    this.socket.on(msgs.socket.updatePlayer, this.onUpdatePlayer.bind(this));
    this.socket.on(msgs.socket.updateObstacles, this.onUpdateTriangles.bind(this));
    this.socket.on(msgs.socket.collision, this.onCollision.bind(this));
  };

  Game.prototype.onConnect = function(data) {
    this.players.add(data.player);
    this.player = this.players.get(data.player.id);

    this.triangles.set(data.triangles);

    this.stage.setSize(data.area);
    this.stage.setCollection('players', this.players);
    this.stage.setCollection('triangles', this.triangles);

    this.socket.emit(msgs.socket.newPlayer, this.player.send());

    this.handleDOMEvents();
    this.loop();
  };

  Game.prototype.onDisonnect = function(id) {
    this.players.remove(id);
    this.stage.setCollection('players', this.players);
  };

  Game.prototype.onCollision = function(data) {
    this.players.setCollision(data.playerID, data.obstacle.color);

    if (data.obstacle.type === 'triangle') {
      this.triangles.setCollision(data.obstacle.id);
      this.audioplayer.play(data.obstacle.sound);
    }
  };

  Game.prototype.getNewPlayer = function(player) {
    this.players.add(player);
    this.stage.setCollection('players', this.players);
  };

  Game.prototype.onGetPlayers = function(players) {
    this.players.set(players);
    this.stage.setCollection('players', this.players);
  };

  Game.prototype.onUpdatePlayer = function(player) {
    this.players.updatePlayer(player);
  };

  Game.prototype.onUpdateTriangles = function(triangles) {
    this.triangles.set(triangles);
    this.stage.setCollection('triangles', this.triangles);
  };

  module.exports = Game;

})(this);
