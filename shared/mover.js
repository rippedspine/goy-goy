(function() {	
	'use strict'
	
	var Vector = require('./vector.js');

	function Mover() {
		this.location = new Vector(0, 0);
		this.velocity = new Vector(0, 0);
	};

	Mover.prototype.update = function() {
		location.add(velocity);
	}

	module.exports = Mover;
})(this);
