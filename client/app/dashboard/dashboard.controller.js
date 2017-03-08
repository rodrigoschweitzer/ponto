(function() {
	'use strict';

	angular
		.module('app')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', 'DashboardService'];

	/* @ngInject */
	function DashboardController($scope, DashboardService) {
		var vm = this;

		vm.graph = {
			labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
			series: ['Entradas'],
			colours: ['#46BFBD'],
			data: [],
			options: {
				bezierCurve: false
			}
		};

		activate();

		function activate() {
			DashboardService.listarEntradasPorSemana().then(function (entradas) {
				vm.graph.data.push(entradas.map((data) => getTimeDecimal(new Date(data.entrada1))));
			});
		}

		function getTimeDecimal(date) {
			var decimalHours = date.getHours(),
				decimalMinutes = +(date.getMinutes() / 60).toFixed(2);

			return decimalHours + decimalMinutes;
		}
	}
})();
