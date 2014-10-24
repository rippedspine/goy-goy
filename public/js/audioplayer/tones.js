Gaia.Tones = Gaia.Tones || (function() {
	'use strict'

	function Tones() {
		this.tuning = new Gaia.PythagoreanTuning();
		this.scale = new Gaia.PentatonicScale(this.tuning);

		this.baseFrequency = 440;
		this.octave = 1;
	}

	Tones.prototype.getFrequencies = function() {
		var degrees = this.scale.degrees;
		var frequencies = [];

		for (var i = degrees.length - 1; i >= 0; i--) {
			frequencies.push(this.scale.getFrequency(degrees[i], this.baseFrequency, this.octave)); 
		};

		return frequencies;
	}

	return Tones;
})();