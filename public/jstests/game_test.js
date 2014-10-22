var assert = require('assert');

var Helpers = require('./../js/helpers.js');
var io = require('./../js/helpers.js');
var Game = require('./../js/game.js');

module.exports = {

  test_that_handleDOMEvents_setups_up_listener_on_canvas: function() {
    var listeners_received = null;
    var stage = {
      canvas: {
        addEventListener: function(a, b) {
          listeners_received = [a, b];
        }
      }
    };

    var game = new Game({}, {}, stage);

    game.handleDOMEvents();

    assert.equal(listeners_received[0], 'mousemove');
//    assert.equals(listeners_received[1], isFunction());

  }

}