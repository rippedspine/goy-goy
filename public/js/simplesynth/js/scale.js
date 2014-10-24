var PentatonicScale = PentatonicScale || (function() {
	'use strict'

	function PentatonicScale(tuning) {
		this.degrees = [0, 1, 2, 3, 4, 5, 6];
	    Scale.call(this, this.degrees, tuning);
	}

	extend(PentatonicScale, Scale);

	return PentatonicScale;
})();