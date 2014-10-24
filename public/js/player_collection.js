var PlayerCollection = PlayerCollection || (function() {
  'use strict';

  var PlayerCollection = function() {
    this.players = {};
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

  PlayerCollection.prototype.get = function(id) {
    if (typeof id === 'undefined') {
      return this.players;
    }
    return this.players[id];
  };

  return PlayerCollection;

})();
