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

  Client.Game.prototype.getNewPlayer = function(player) {8
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

  module.exports = Client.Game;

})(this);
