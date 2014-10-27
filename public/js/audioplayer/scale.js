Gaia.PentatonicScale = Gaia.PentatonicScale || (function() {
	'use strict'

	function PentatonicScale(tuning) {
		this.degrees = [1, 3, 5, 8, 10, 13, 15, 17, 20, 22];//, 8, 9, 10, 13, 14];
    Scale.call(this, this.degrees, tuning);
	}

	extend(PentatonicScale, Scale);

	return PentatonicScale;

})();