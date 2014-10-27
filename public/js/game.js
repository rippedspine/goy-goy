Gaia.Game = Gaia.Game || (function() {
  'use strict';

  var Game = function(
    helpers, 
    socket,
    stage, 
    playerCollection, 
    triangleCollection
  ) {
    
    this.helpers = helpers;
    this.socket = socket;
    this.stage = stage;
    this.playerCollection = playerCollection;
    this.triangleCollection = triangleCollection;

    this.player = null;
  };

  Game.MSG_CONNECT = 1;
  Game.MSG_DISCONNECT = 2;
  Game.MSG_NEW_PLAYER = 3;
  Game.MSG_GET_PLAYERS = 4;
  Game.MSG_UPDATE_PLAYER = 5;
  Game.MSG_DEAD_OBSTACLE = 6;
  Game.MSG_UPDATE_OBSTACLES = 7;
  Game.MSG_COLLIDED = 8;

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
  };

  Game.prototype.handleDOMEvents = function() {
    this.stage.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  };

  Game.prototype.handleMouseMove = function(event) {
    if (this.player !== null) {
      this.player.move(this.helpers.getPosition(this.stage.canvas, event));
      this.socket.emit(Game.MSG_UPDATE_PLAYER, {
        player: this.player.send(),
        triangles: this.triangleCollection.sendRotations()
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
    this.socket.on(Game.MSG_COLLIDED, this.onCollision.bind(this));
  };

  Game.prototype.onConnect = function(data) {
    this.player = this.playerCollection.add(data.player);
    this.triangleCollection.set(data.triangles);

    this.stage.setSize(data.area);
    this.stage.setCollection('players', this.playerCollection);
    this.stage.setCollection('triangles', this.triangleCollection);

    this.socket.emit(Game.MSG_NEW_PLAYER, this.player.send());
  };

  Game.prototype.onDisonnect = function(id) {
    this.playerCollection.remove(id);
    this.stage.setCollection('players', this.playerCollection);
  };

  Game.prototype.onCollision = function(data) {
    this.playerCollection.setCollision(data.player, data.color);
    if (data.obstacle.charAt(0) === 't') {
      this.triangleCollection.setCollision(data.obstacle);
      var obstacle = this.triangleCollection.get(data.obstacle);
      this.playerCollection.audioplayer.play(obstacle.soundID, obstacle.decay);
      console.log('obstacle-decay', obstacle.decay);
    }
  };

  Game.prototype.getNewPlayer = function(player) {
    this.playerCollection.add(player);
    this.stage.setCollection('players', this.playerCollection);
  };

  Game.prototype.onGetPlayers = function(players) {
    this.playerCollection.set(players);
    this.stage.setCollection('players', this.playerCollection);
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