(function() {
  'use strict';

  var msgs = require('../../shared/messages.js')
    , helpers = require('../../shared/helpers.js');

  var Game = function(socket, stage, players, audioplayer) {
    this.socket = socket;
    this.stage = stage;
    this.players = players;
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
  };

  Game.prototype.handleDOMEvents = function() {
    this.stage.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  };

  Game.prototype.handleMouseMove = function(event) {
    this.player.move(helpers.getPosition(this.stage.canvas, event));
    this.socket.emit(msgs.socket.updatePlayer, {
      player: this.player.send()
    });
  };

  Game.prototype.handleSocketEvents = function() {
    this.socket.on(msgs.socket.connect, this.onConnect.bind(this));
    this.socket.on(msgs.socket.disconnect, this.onDisonnect.bind(this));
    this.socket.on(msgs.socket.newPlayer, this.getNewPlayer.bind(this));
    this.socket.on(msgs.socket.getPlayers, this.onGetPlayers.bind(this));
    this.socket.on(msgs.socket.updatePlayer, this.onUpdatePlayer.bind(this));
  };

  Game.prototype.onConnect = function(data) {
    this.players.add(data.player);
    this.player = this.players.get(data.player.id);

    this.stage.setCollection('players', this.players);
    this.socket.emit(msgs.socket.newPlayer, this.player.send());

    this.handleDOMEvents();
    this.loop();
  };

  Game.prototype.onDisonnect = function(id) {
    this.players.remove(id);
    this.stage.setCollection('players', this.players);
  };

  Game.prototype.getNewPlayer = function(player) {8
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

  module.exports = Game;

})(this);
