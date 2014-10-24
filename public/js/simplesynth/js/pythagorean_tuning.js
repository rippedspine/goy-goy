var PythagoreanTuning = PythagoreanTuning || (function() {
	'use strict'

	function PythagoreanTuning() {
		this.semitones = [0.90225, 2.03910, 2.94135, 4.07820,
	                     4.98045, 6.11730, 7.01955, 7.92180,
	                     9.05865, 9.96090, 11.09775];
	    Tuning.call(this, this.semitones, 2);
	}

	extend(PythagoreanTuning, Tuning);

	return PythagoreanTuning;
})();