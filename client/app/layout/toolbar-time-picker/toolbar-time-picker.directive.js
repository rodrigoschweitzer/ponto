(function () {
	'use strict';

	angular
		.module('app')
		.directive('toolbarTimePicker', ToolbarTimePicker);

	/* @ngInject */
	function ToolbarTimePicker() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/layout/toolbar-time-picker/toolbar-time-picker.html',
			scope: {
				date: '='
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope) {
			if (!angular.isDate(scope.date)) {
				throw new Error('The date parameter must be a Date object.');
			}

			let baseDate = scope.date,
				baseYear = baseDate.getFullYear(),
				baseMonth = baseDate.getMonth();

			scope.selectedMonth = scope.date.getMonth();
			scope.selectedYear = scope.date.getFullYear();
			scope.months = [];
			scope.years = [];
			scope.prevMonth = prevMonth;
			scope.nextMonth = nextMonth;
			scope.selectMonth = selectMonth;
			scope.selectYear = selectYear;
			scope.isValidPrevMonth = isValidPrevMonth;
			scope.isValidNextMonth = isValidNextMonth;

			init();

			function init() {
				scope.months = getMonths();
				scope.years = getYears();
			}

			function prevMonth() {
				if (isValidPrevMonth()) {
					scope.date.prevMonth();
					refreshMonthYear();
					scope.months = getMonths();
				}
			}

			function nextMonth() {
				if (isValidNextMonth()) {
					scope.date.nextMonth();
					refreshMonthYear();
					scope.months = getMonths();
				}
			}

			function selectMonth() {
				scope.date.setMonth(scope.selectedMonth);
			}

			function selectYear() {
				scope.date.setFullYear(scope.selectedYear);
				scope.months = getMonths();
			}

			function isValidPrevMonth() {
				let year = scope.date.getFullYear(),
					month = scope.date.getMonth(),
					startYear = baseYear - 10,
					january = 0;

				return year > startYear || month > january;
			}

			function isValidNextMonth() {
				let year = scope.date.getFullYear(),
					month = scope.date.getMonth();

				return year < baseYear || month < baseMonth;
			}

			function refreshMonthYear() {
				scope.selectedMonth = scope.date.getMonth();
				scope.selectedYear = scope.date.getFullYear();
			}

			function getMonths() {
				let months = [
						{ label: 'Janeiro', value: 0 },
						{ label: 'Fevereiro', value: 1 },
						{ label: 'Março', value: 2 },
						{ label: 'Abril', value: 3 },
						{ label: 'Maio', value: 4 },
						{ label: 'Junho', value: 5 },
						{ label: 'Julho', value: 6 },
						{ label: 'Agosto', value: 7 },
						{ label: 'Setembro', value: 8 },
						{ label: 'Outubro', value: 9 },
						{ label: 'Novembro', value: 10 },
						{ label: 'Dezembro', value: 11 }
					],
					year = scope.date.getFullYear();

				if (year === baseYear) {
					updateSelectedMonth();

					months = months.filter(month => baseMonth >= month.value);
				}

				return months;
			}

			function updateSelectedMonth() {
				if (scope.date.getMonth() > baseMonth) {
					scope.date.setMonth(baseMonth);
					scope.selectedMonth = baseMonth;
				}
			}

			function getYears() {
				let years = [],
					startYear = baseYear - 10;

				while (startYear <= baseYear) {
					years.push({ label: startYear, value: startYear++ });
				}

				return years;
			}
		}
	}

})();
