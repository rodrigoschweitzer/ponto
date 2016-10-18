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
				throw new Error('date deve ser um objeto do tipo Date.');
			}

			scope.months = getMonths();
			scope.years = getYears();
			scope.selectedMonth = scope.date.getMonth();
			scope.selectedYear = scope.date.getFullYear();
			scope.prevMonth = prevMonth;
			scope.nextMonth = nextMonth;
			scope.selectMonth = selectMonth;
			scope.selectYear = selectYear;

			function prevMonth() {
				scope.date.prevMonth();
				refreshMonthYear();
			}

			function nextMonth() {
				scope.date.nextMonth();
				refreshMonthYear();
			}

			function refreshMonthYear() {
				scope.selectedMonth = scope.date.getMonth();
				scope.selectedYear = scope.date.getFullYear();
			}

			function selectMonth() {
				scope.date.setMonth(scope.selectedMonth);
			}

			function selectYear() {
				scope.date.setFullYear(scope.selectedYear);
			}

			function getYears() {
				let year = scope.date.getFullYear(),
					start = year - 10,
					end = year + 10,
					years = [];

				while (start <= end) {
					years.push({ label: start, value: start++ });
				}

				return years;
			}

			function getMonths() {
				return [
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
				];
			}
		}
	}

})();
