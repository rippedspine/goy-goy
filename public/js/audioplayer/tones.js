Gaia.Tones = Gaia.Tones || (function() {
	'use strict'

	function Tones() {
		this.tuning = new Gaia.PythagoreanTuning();
		this.scale = new Gaia.PentatonicScale(this.tuning);

		this.baseFrequency = 440;
		this.octave = 0;
	}

	Tones.prototype.getFrequencies = function() {
		var degrees = this.scale.degrees;
		var frequencies = [];

		for (var i = degrees.length - 1; i >= 0; i--) {
			frequencies.push(this.scale.getFrequency(degrees[i], this.baseFrequency, this.octave)); 
		};

		console.log(frequencies);

		return frequencies;
	}

	return Tones;
})();