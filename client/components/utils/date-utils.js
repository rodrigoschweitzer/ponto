Date.prototype.nextMonth = function() {
	this.setMonth(this.getMonth() + 1);
	return this;
};

Date.prototype.prevMonth = function() {
	this.setMonth(this.getMonth() - 1);
	return this;
};

Date.prototype.firstDay = function() {
	this.setDate(1);
	return this;
};

Date.prototype.lastDay = function() {
	this.nextMonth().setDate(0);
	return this;
};

Date.prototype.resetTime = function() {
	this.setHours(0, 0, 0, 0);
	return this;
};

Date.prototype.maxTime = function() {
	this.setHours(23, 59, 59, 999);
	return this;
};
