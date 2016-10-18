(function() {
	'use strict';

	angular
		.module('app')
		.factory('DashboardService', DashboardService);

	DashboardService.$inject = ['$resource'];

	/* @ngInject */
	function DashboardService($resource) {
		var resource = $resource('/api/pontos/entradas'),
			service = {
				listarEntradasPorSemana: listarEntradasPorSemana
			};

		return service;

		function listarEntradasPorSemana() {
			var inicio = new Date(2016, 1, 29),
				fim = angular.copy(new Date(2016, 2, 4));

			return listarEntradasPorPeriodo(inicio, fim);
		}

		function listarEntradasPorPeriodo(inicio, fim) {
			return resource.query({
				inicio: inicio,
				fim: fim
			}).$promise;
		}
	}
})();
