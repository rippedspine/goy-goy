(function() {
  'use strict';

  var msgs = require('../../shared/messages.js')
    , utils = require('../../shared/utils.js')

    , Client = {};

  Client.Game = function(socket, stage, players, triangles, circles, audioplayer) {
    this.socket = socket;
    this.stage = stage;
    this.players = players;
    this.audioplayer = audioplayer;
    this.triangles = triangles;
    this.circles = circles;

    this.player = null;
  };

  Client.Game.prototype.start = function() {
    this.handleSocketEvents();
  };

  Client.Game.prototype.loop = function() {
    requestAnimationFrame(this.loop.bind(this));
    this.stage.render();
    this.update();
  };

  Client.Game.prototype.update = function() {
    this.players.update();
    this.triangles.update();
    this.circles.update();
  };

  Client.Game.prototype.handleDOMEvents = function() {
    this.stage.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('dead', this.handleDeadObstacle.bind(this));
  };

  Client.Game.prototype.handleDeadObstacle = function(event) {
    this.socket.emit(msgs.socket.deadObstacle, event.detail);
  };

  Client.Game.prototype.handleMouseMove = function(event) {
    this.player.move(utils.getPosition(this.stage.canvas, event));
    this.socket.emit(msgs.socket.updatePlayer, {
      player: this.player.send()
    });
  };

  Client.Game.prototype.handleSocketEvents = function() {
    this.socket.on(msgs.socket.connect, this.onConnect.bind(this));
    this.socket.on(msgs.socket.disconnect, this.onDisonnect.bind(this));
    this.socket.on(msgs.socket.newPlayer, this.getNewPlayer.bind(this));
    this.socket.on(msgs.socket.getPlayers, this.onGetPlayers.bind(this));
    this.socket.on(msgs.socket.updatePlayer, this.onUpdatePlayer.bind(this));
    this.socket.on(msgs.socket.collision, this.onCollision.bind(this));
    this.socket.on(msgs.socket.updateTriangles, this.onUpdateTriangles.bind(this));
    this.socket.on(msgs.socket.updateCircles, this.onUpdateCircles.bind(this));
  };

  Client.Game.prototype.onConnect = function(data) {
    msgs.logger.connect(data.player.id);

    this.players.add(data.player);
    this.player = this.players.get(data.player.id);

    this.triangles.spawn(data.triangles);
    this.circles.spawn(data.circles);

    this.stage.setCollection('players', this.players);
    this.stage.setCollection('triangles', this.triangles);
    this.stage.setCollection('circles', this.circles);

    this.socket.emit(msgs.socket.newPlayer, this.player.send());

    this.handleDOMEvents();
    this.loop();
  };

  Client.Game.prototype.onDisonnect = function(id) {
    msgs.logger.disconnect(id);

    this.players.remove(id);
    this.stage.setCollection('players', this.players);
  };

  Client.Game.prototype.getNewPlayer = function(player) {
    this.players.add(player);
    this.stage.setCollection('players', this.players);
  };

  Client.Game.prototype.onGetPlayers = function(players) {
    this.players.set(players);
    this.stage.setCollection('players', this.players);
  };

  Client.Game.prototype.onUpdatePlayer = function(player) {
    this.players.updatePlayer(player);
  };

  Client.Game.prototype.onCollision = function(data) {
    this.players.setCollision(data.playerID, data.obstacle.color);
    this.audioplayer.play(data.obstacle.sound);

    if (data.obstacle.type === 'triangle') {
      this.triangles.setCollision(data.obstacle.id, this.socket);
    } else if (data.obstacle.type === 'circle') {
      this.circles.setCollision(data.obstacle.id, this.socket);
    }
  };

  Client.Game.prototype.onUpdateCircles = function(data) {
    this.stage.addToCollection('circles', this.circles.resurrect(data));
  };

  Client.Game.prototype.onUpdateTriangles = function(data) {
    this.stage.addToCollection('triangles', this.triangles.resurrect(data));
  };

  module.exports = Client.Game;

})(this);
