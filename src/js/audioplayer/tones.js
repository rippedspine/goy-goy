(function() {
	'use strict'

	var PythagoreanTuning = require('./pythagorean-tuning.js')
		, PentatonicScale = require('./pentatonic-scale.js')

	function Tones() {
		this.tuning = new PythagoreanTuning();
		this.scale = new PentatonicScale(this.tuning);

		this.baseFrequency = 440;
		this.octave = 0;
	}

	Tones.prototype.getFrequencies = function() {
		var degrees = this.scale.degrees;
		var frequencies = [261.626, 293.665, 329.628, 391.995, 440, 523.251, 587.330, 659.255, 783.991, 880.000];

		for (var i = degrees.length - 1; i >= 0; i--) {
			frequencies.push(this.scale.getFrequency(degrees[i], this.baseFrequency, this.octave)); 
		};

		return frequencies;
	}

	module.exports = Tones;

})(this);
