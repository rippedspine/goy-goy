var _ = require('lodash')
  , utils = require('./shared/utils.js')
  , config = require('./shared/config.js')
  , radius = config.radius;

var Player = function(id) {
  this.id = id;
  this.radius = radius.player;
  this.position = [
    (config.area[0] * 0.5) - (this.radius * 0.5),
    (config.area[1] * 0.5) - (this.radius * 0.5)
  ];
  this.vertices = utils.getVertices(5, this.radius);  
};

Player.prototype.set = function(data) {
  this.id = data.id;
  this.position = data.position;
  this.vertices = data.vertices; 
};

var Collection = function() {
  this.players = {};

  this.add = function(data) {
    var player = new Player(data.id);
    player.set(data);
    this.players[player.id] = player;
  };

  this.hasPlayers = function() {
    return _.size(this.players) > 0;  
  };

  this.get = function(id) {
    if (typeof id === 'undefined') {
      return this.players;  
    }
    return this.players[id];
  };

  this.remove = function(id) {
    delete this.players[id];
  };

  this.set = function(data) {
    this.players[data.id].set(data);  
  };

  this.makeCollisionDetector = function(obstacles) {
    return function(id) {
      for (var objID in obstacles) {
        if (utils.circleCollision(this.players[id], obstacles[objID])) {
          return {
            player: id,
            color: obstacles[objID].color,
            obstacle: objID
          };
        }
      }
    }.bind(this);
  };
};

module.exports = {
  Player: Player,
  Collection: Collection
};