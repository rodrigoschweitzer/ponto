(function () {
	'use strict';

	angular
		.module('app')
		.factory('DateService', DateService);

	DateService.$inject = ['$filter'];

	function DateService($filter) {
		var service = {
				formatar: formatar
			},
			dateFilter = $filter('date');

		init();

		return service;

		function formatar(valor, formato) {
			let formatoPadrao = formato || 'dd/MM/yyyy';
			return dateFilter(valor, formatoPadrao);
		}

		function init() {
			addPrototypeUtilities();
		}

		function addPrototypeUtilities() {
			Date.prototype.nextMonth = function () {
				this.setMonth(this.getMonth() + 1);
				return this;
			};

			Date.prototype.prevMonth = function () {
				this.setMonth(this.getMonth() - 1);
				return this;
			};

			Date.prototype.firstDay = function () {
				this.setDate(1);
				return this;
			};

			Date.prototype.lastDay = function () {
				this.nextMonth().setDate(0);
				return this;
			};

			Date.prototype.resetTime = function () {
				this.setHours(0, 0, 0, 0);
				return this;
			};

			Date.prototype.maxTime = function () {
				this.setHours(23, 59, 59, 999);
				return this;
			};
		}
	}
})();
