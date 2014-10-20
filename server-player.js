var _ = require('lodash')
  , utils = require('./server-utils.js')
  , constants = require('./server-constants.js')
  , radius = constants.radius;

var Player = function(id) {
  this.id = id;
  this.radius = radius.player;
  this.position = [
    (constants.area[0] * 0.5) - (this.radius * 0.5),
    (constants.area[1] * 0.5) - (this.radius * 0.5)
  ];
  this.vertices = utils.getVertices(5, this.radius);  
};

Player.prototype.recieveData = function(data) {
  this.id = data.id;
  this.position = data.position;
  this.vertices = data.vertices; 
};

var Collection = function() {
  this.players = {};

  this.addOne = function(data) {
    var player = new Player(data.id);
    player.recieveData(data);
    this.players[player.id] = player;
    return player;
  };

  this.hasPlayers = function() {
    return _.size(this.players) > 0;  
  };

  this.getAll = function() {
    return this.players;  
  };

  this.getOne = function(id) {
    return this.players[id];
  };

  this.removeOne = function(id) {
    delete this.players[id];
  };

  this.updatePlayer = function(data) {
    this.players[data.id].recieveData(data);  
  };
};

module.exports = {
  Player: Player,
  Collection: Collection
};