// function playExample() 
// {
    var Synth = function(audiolet, frequency) 
    {
    	// 0:inputs, 1:outputs:
    	AudioletGroup.apply(this, [audiolet, 0, 1]);

    	// Basic wave and modulation:
    	this.sine = new Sine(this.audiolet, frequency);

    	//Gain stage:
    	this.gain = new Gain(this.audiolet);
    	this.envelope = new ADSREnvelope(this.audiolet, 1, 0.001, 0.1, 0, 0,
    		function() {
    			this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
    		}.bind(this)
    	);

    	//Reverb:
    	this.reverb = new Reverb(this.audiolet, 0.9, 0.8, 0.9);

    	// Main signal path:
    	this.envelope.connect(this.gain, 0, 1);

    	this.sine.connect(this.gain);
    	this.gain.connect(this.reverb);

    	this.reverb.connect(this.outputs[0]);
    };
    extend(Synth, AudioletGroup);

    var PythagoreanTuning = function() {
	    var semitones = [0.90225, 2.03910, 2.94135, 4.07820,
	                     4.98045, 6.11730, 7.01955, 7.92180,
	                     9.05865, 9.96090, 11.09775];
	    Tuning.call(this, semitones, 2);
	};
	extend(PythagoreanTuning, Tuning);

    var PentatonicScale = function(tuning) {
	    var degrees = [0, 1, 2, 3, 4, 5, 6];
	    Scale.call(this, degrees, tuning);
	};
	extend(PentatonicScale, Scale);

	var tuning = new PythagoreanTuning();
	var scale = new PentatonicScale(tuning);

	// Get the first four notes of the second octave
	var baseFrequency = 220; // The base frequency of the scale
	var octave = 1; // The second octave
	var freq1 = scale.getFrequency(0, baseFrequency, octave);
	var freq2 = scale.getFrequency(1, baseFrequency, octave);
	var freq3 = scale.getFrequency(2, baseFrequency, octave);
	var freq4 = scale.getFrequency(3, baseFrequency, octave);

    var AudioletApp = function(frequency) 
    {
    	this.audiolet = new Audiolet();
    	var synth = new Synth(this.audiolet, frequency);
    	console.log(tuning);
    	synth.connect(this.audiolet.output);
    }

    

    function playSoundOne() {
    	this.audioletApp = new AudioletApp(freq1);	
    }

    function playSoundTwo() {
    	this.audioletApp = new AudioletApp(freq2);	
    }

    function playSoundThree() {
    	this.audioletApp = new AudioletApp(freq3);	
    }

    function playSoundFour() {
    	this.audioletApp = new AudioletApp(freq4);	
    }
// };

