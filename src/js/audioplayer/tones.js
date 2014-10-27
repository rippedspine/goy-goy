(function() {
	'use strict'

	var PythagoreanTuning = require('./pythagorean-tuning.js')
		, PentatonicScale = require('./pentagonic-scale.js')

	function Tones() {
		this.tuning = new PythagoreanTuning();
		this.scale = new PentatonicScale(this.tuning);

		this.baseFrequency = 440;
		this.octave = 0;
	}

	Tones.prototype.getFrequencies = function() {
		var degrees = this.scale.degrees;
		var frequencies = [];

		for (var i = degrees.length - 1; i >= 0; i--) {
			frequencies.push(this.scale.getFrequency(degrees[i], this.baseFrequency, this.octave)); 
		};

		return frequencies;
	}

	module.exports = Tones;

})(this);