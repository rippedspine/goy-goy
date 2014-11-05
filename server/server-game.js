(function() {
  'use strict';

  var config = require('../shared/config.js');

  var ServerGame = function(
    collisionHandler,
    players,
    sharpForms,
    roundForms,
    noiseForms,
    bassForms
    ) {

    this.player = null;
    this.players = players;

    this.sharpForms = sharpForms;
    this.roundForms = roundForms;
    this.noiseForms = noiseForms;
    this.bassForms = bassForms;

    this.collisions = {};
    this.collisionHandler = collisionHandler;
  };

  ServerGame.prototype.handleDeadObstacles = function(data) {
    return this[data.type + 's'].resurrect(data.id);
  };

  ServerGame.prototype.start = function() {
    this.sharpForms.spawn(config.forms.sharp.amount);
    this.roundForms.spawn(config.forms.round.amount);
    this.noiseForms.spawn(config.forms.noise.amount);
    this.bassForms.spawn(config.forms.bass.amount);
  };

  ServerGame.prototype.detectCollisions = function() {
    this.collisions.sharpForms = this.collisionHandler.detectCircle(this.player, this.sharpForms.get());
    this.collisions.roundForms = this.collisionHandler.detectCircle(this.player, this.roundForms.get());
    this.collisions.noiseForms = this.collisionHandler.detectCircle(this.player, this.noiseForms.get());
    this.collisions.bassForms = this.collisionHandler.detectRect(this.player, this.bassForms.get());
  };

  ServerGame.prototype.getCollision = function() {
    for (var type in this.collisions) {
      if (typeof this.collisions[type] !== 'undefined') {
        var id = this.collisions[type].obstacle.id;
        if (!this[type].get(id).shouldBeRemoved) {
          this[type].get(id).shouldBeRemoved = true;
          return this.collisions[type];
        }
      }
    }
  };

  module.exports = ServerGame;

})(this);
