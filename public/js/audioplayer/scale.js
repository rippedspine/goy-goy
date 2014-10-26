Gaia.PentatonicScale = Gaia.PentatonicScale || (function() {
	'use strict'

	function PentatonicScale(tuning) {
		this.degrees = [1, 3, 5, 6, 8];
    Scale.call(this, this.degrees, tuning);
	}

	extend(PentatonicScale, Scale);

	return PentatonicScale;

})();