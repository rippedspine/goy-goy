(function() {
  'use strict';

  var msgs = require('../../shared/messages.js')
    , utils = require('../../shared/utils.js');

  var Game = function(socket, stage, players, triangles) {
    this.socket = socket;
    this.stage = stage;
    this.players = players;
    this.triangles = triangles;

    this.player = null;
  };

  Game.prototype.start = function() {
    this.handleDOMEvents();
    this.handleSocketEvents();
    this.loop();
  };

  Game.prototype.loop = function() {
    requestAnimationFrame(this.loop.bind(this));
    if (this.player !== null) {
      this.stage.render();
      this.update();
    }
  };

  Game.prototype.update = function() {
    this.players.update();
    this.triangles.update();
  };

  Game.prototype.handleDOMEvents = function() {
    this.stage.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  };

  Game.prototype.handleMouseMove = function(event) {
    if (this.player !== null) {
      this.player.move(utils.getPosition(this.stage.canvas, event));
      this.socket.emit(msgs.socket.updatePlayer, {
        player: this.player.send(),
        triangles: this.triangles.sendRotations()
      });  
    }
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
    this.player = this.players.add(data.player);
    this.triangles.set(data.triangles);

    this.stage.setSize(data.area);
    this.stage.setCollection('players', this.players);
    this.stage.setCollection('triangles', this.triangles);

    this.socket.emit(msgs.socket.newPlayer, this.player.send());
  };

  Game.prototype.onDisonnect = function(id) {
    this.players.remove(id);
    this.stage.setCollection('players', this.players);
  };

  Game.prototype.onCollision = function(data) {
    this.players.setCollision(data.player, data.color);
    if (data.obstacle.charAt(0) === 't') {
      this.triangles.setCollision(data.obstacle);
      var obstacle = this.triangles.get(data.obstacle);
      this.players.audioplayer.play(obstacle.soundID, obstacle.soundDecay, obstacle.waveform);
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
