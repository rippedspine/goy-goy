(function() {
  	'use strict';

  	var audiolet = new Audiolet();
  	var tones = new Tones();
  	var frequencies = tones.frequencies;
  	var synth = null;

  	// document.addEventListener('keyup', function(e) {
  	// 	console.log(e.keyCode);
  	// 	switch(e.keyCode) {
  	// 		case 49:
  	// 			synth = new Synth(audiolet);
  	// 			synth.play('sine', 0.05, frequencies[0]);
  	// 			break;
  	// 		case 50:
  	// 			synth = new Synth(audiolet);
  	// 			synth.play('sine', 0.05, frequencies[1]);
  	// 			break;
  	// 		case 51:
  	// 			synth = new Synth(audiolet);
  	// 			synth.play('sine', 0.05, frequencies[2]);
  	// 			break;
  	// 		case 52:
  	// 			synth = new Synth(audiolet);
  	// 			synth.play('sine', 0.05, frequencies[3]);
  	// 			break;
  	// 		case 53:
  	// 			synth = new Synth(audiolet);
  	// 			synth.play('sine', 0.05, frequencies[4]);
  	// 			break;
  	// 		case 54:
  	// 			synth = new Synth(audiolet);
  	// 			synth.play('sine', 0.05, frequencies[5]);
  	// 			break;
  	// 	}
  		
  	// });

	function playSynth(waveform, decay, frequency) {
		// var audiolet = new Audiolet();
		var synth = new Synth(audiolet, waveform, decay, frequency)
		synth.play();
		console.log(tones.tuning);
	}  
}());
