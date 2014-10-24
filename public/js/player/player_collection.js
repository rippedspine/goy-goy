Gaia.PlayerCollection = Gaia.PlayerCollection || (function(utils) {
  'use strict';

  var PlayerCollection = function() {
    this.players = {};
    this.collisions = [];
    this.audioplayer = new Gaia.AudioPlayer(new Audiolet(), new Gaia.Tones());
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

  PlayerCollection.prototype.setCollision = function(id, color) {
    this.players[id].didCollide = true;
    this.players[id].color = color;
  };

  PlayerCollection.prototype.add = function(data) {
    return this.players[data.id] = new Gaia.Player(data);
  };

  PlayerCollection.prototype.remove = function(id) {
    delete this.players[id];
  };

  PlayerCollection.prototype.updatePlayer = function(data) {
    this.players[data.id].move(data.position);
  };

  PlayerCollection.prototype.get = function(id) {
    if (typeof id === 'undefined') {
      return this.players;
    }
    return this.players[id];
  };

  PlayerCollection.prototype.set = function(players) {
    for (var id in players) {
      this.players[id] = new Gaia.Player(players[id]);
    }
  };

  return PlayerCollection;

})(Gaia.Utils);
