var Game = Game || (function() {
  'use strict';

  var Game = function(helpers, makers, socket, stage, playerCollection, triangleCollection) {
    this.helpers = helpers;
    this.makers = makers;
    this.socket = socket;
    this.stage = stage;
    this.playerCollection = playerCollection;
    this.triangleCollection = triangleCollection;

    this.collidesWithTriangle = this.makers.CollisionDetector(this.triangleCollection);

    this.player = null;
  };

  Game.MSG_CONNECT = 1;
  Game.MSG_DISCONNECT = 2;
  Game.MSG_NEW_PLAYER = 3;
  Game.MSG_GET_PLAYERS = 4;
  Game.MSG_UPDATE_PLAYER = 5;
  Game.MSG_DEAD_OBSTACLE = 6;
  Game.MSG_UPDATE_OBSTACLES = 7;

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
    this.playerCollection.update();
    this.triangleCollection.update();
    this.collidesWithTriangle(this.playerCollection.get());
  };

  Game.prototype.handleDOMEvents = function() {
    this.stage.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  };

  Game.prototype.handleMouseMove = function(event) {
    if (this.player !== null) {
      this.player.move(this.helpers.getPosition(this.stage.canvas, event));
      this.socket.emit(Game.MSG_UPDATE_PLAYER, this.player.sendData());  
    }
    
    if (this.triangleCollection.getDead()) {
      this.socket.emit(Game.MSG_DEAD_OBSTACLE, {
        deadID: this.triangleCollection.getDead(),
        triangles: this.triangleCollection.sendData()
      });
    }
  };

  Game.prototype.handleSocketEvents = function() {
    this.socket.on(Game.MSG_CONNECT, this.onConnect.bind(this));
    this.socket.on(Game.MSG_DISCONNECT, this.onDisonnect.bind(this));
    this.socket.on(Game.MSG_NEW_PLAYER, this.getNewPlayer.bind(this));
    this.socket.on(Game.MSG_GET_PLAYERS, this.onGetPlayers.bind(this));
    this.socket.on(Game.MSG_UPDATE_PLAYER, this.onUpdatePlayer.bind(this));
    this.socket.on(Game.MSG_UPDATE_OBSTACLES, this.onUpdateTriangles.bind(this));
  };

  Game.prototype.onConnect = function(data) {
    this.player = this.playerCollection.addOne(data.player);
    this.triangleCollection.set(data.triangles);

    this.stage.setSize(data.area);
    this.stage.setCollection('players', this.playerCollection);
    this.stage.setCollection('triangles', this.triangleCollection);

    this.socket.emit(Game.MSG_NEW_PLAYER, this.player.sendData());
  };

  Game.prototype.onDisonnect = function(id) {
    this.playerCollection.removeOne(id);
    this.stage.setCollection('players', this.playerCollection);
  };

  Game.prototype.getNewPlayer = function(player) {
    this.playerCollection.addOne(player);
    this.stage.setCollection('players', this.playerCollection);
  };

  Game.prototype.onGetPlayers = function(players) {
    for (var id in players) {
      this.getNewPlayer(players[id]);
    }
  };

  Game.prototype.onUpdatePlayer = function(player) {
    this.playerCollection.updatePlayer(player);
  };

  Game.prototype.onUpdateTriangles = function(triangles) {
    this.triangleCollection.set(triangles);
    this.stage.setCollection('triangles', this.triangleCollection);
  };

  return Game; 

})();