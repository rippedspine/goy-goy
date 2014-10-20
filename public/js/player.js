// ==================================
// PLAYER
// ==================================
var Player = Player || (function(utils) {
  'use strict';

  var Player = function(data) {
    this.id = data.id;

    Polygon.call(this, {
      position: data.position,
      color: '#fff',
      radius: data.radius
    });
    
    this.vertices = data.vertices;

    // pulse
    this.angle = 0;
    this.frequency = 0.05;
  };

  Player.prototype = Object.create(Polygon.prototype);

  Player.prototype.update = function() {
    this.pulse();
  };

  Player.prototype.pulse = function() {
    this.strokeWidth = 3 + Math.sin(this.angle) * 2;
    this.angle += this.frequency;
  };

  Player.prototype.move = function(position) {
    this.position = position;
  };

  Player.prototype.sendData = function() {
    return {
      id: this.id,
      position: this.springPoint,
      vertices: this.vertices,
    };
  };

  return Player;

})(Utils);

// ==================================
// PLAYER COLLECTION
// ==================================
var PlayerCollection = PlayerCollection || (function() {
  'use strict';

  var PlayerCollection = function() {
    this.players = {};
  };

  PlayerCollection.prototype.detectCollision = function() {
    for (var id in this.players) {
      this.players[id];
    }
  };

  PlayerCollection.prototype.draw = function(context) {
    for (var id in this.players) {
      this.players[id].draw(context);
    }
  };

  PlayerCollection.prototype.update = function() {
    for (var id in this.players) {
      this.players[id].update();
    }
  };

  PlayerCollection.prototype.addOne = function(data) {
    return this.players[data.id] = new Player(data);
  };

  PlayerCollection.prototype.removeOne = function(id) {
    delete this.players[id];
  };

  PlayerCollection.prototype.updatePlayer = function(data) {
    this.players[data.id].move(data.position);
  };

  PlayerCollection.prototype.getAll = function() {
    return this.players;
  };

  return PlayerCollection;

})();
