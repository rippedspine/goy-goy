(function() {
	// 'use strict'

	// var Vector = function(x, y) {
	// 	this.x = x;
	// 	this.y = y;
	// }

	// Vector.prototype.add = function(vector) {
	// 	this.x += vector.x;
	// 	this.y += vector.y;
	// };

	// Vector.prototype.sub = function(vector) {
	// 	this.x -= vector.x;
	// 	this.y -= vector.y;
	// };

	// Vector.prototype.mult = function(n) {
	// 	this.x *= n;
	// 	this.y *= n;
	// };

	// Vector.prototype.div = function(n) {
	// 	this.x /= n;
	// 	this.y /= n;
	// };

	// Vector.prototype.mag = function() {
	// 	return Math.sqrt(x * x + y * y);
	// };

	// Vector.prototype.normalize = function() {
	// 	var m = mag();
	// 	if(m != 0) div(m);
	// };	

	'use strict'
	
	function Vector(x, y) {
		this.setX(x);
		this.setY(y);
	};
		

	Vector.prototype.setX = function(value) { this.x = value; };
	Vector.prototype.setY = function(value) { this.y = value; };
	Vector.prototype.getX = function() { return this.x; };
	Vector.prototype.getY = function() { return this.y; };
	
	Vector.prototype.setAngle = function(angle) {
		var length = this.getLength();
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;
	};

	Vector.prototype.getAngle = function() {
		return Math.atan2(this.y, this.x);
	};

	Vector.prototype.setLength = function(length) {
		var angle = this.getAngle();
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;	
	};

	Vector.prototype.getLength = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	Vector.prototype.add = function(v2) {
		return new Vector(this.x + v2.getX(), this.y + v2.getY());
	}

	Vector.prototype.subtract = function(v2) {
		return new Vector(this.x - v2.getX(), this.y - v2.getY());
	};

	Vector.prototype.multiply = function(val) {
		return new Vector(this.x * val, this.y * val); };

	Vector.prototype.divide = function(val) {
		return new Vector(this.x / val, this.y / val);
	};

	Vector.prototype.addTo = function(v2) {
		this.x += v2.getX();
		this.y += v2.getY();
	};

	Vector.prototype.subtractFrom = function(v2) {
		this.x -= v2.getX();
		this.y -= v2.getY();
	};

	Vector.prototype.multiplyBy = function(val) {
		this.x *= val;
		this.y *= val;
	};

	Vector.prototype.DivideBy = function(val) {
		this.x /= val;
		this.y /= val;
	};

	module.exports = Vector;
})(this);