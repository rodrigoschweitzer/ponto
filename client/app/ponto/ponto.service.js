(function () {
	'use strict';

	angular
		.module('app')
		.factory('PontoService', PontoService);

	PontoService.$inject = ['$resource', '$filter', 'DateService'];

	function PontoService($resource, $filter, DateService) {
		var PontoResource = $resource('/api/pontos/:id', {
					id: '@_id'
				}, {
					update: { method: 'PUT' },
					atualizarHoras: { method: 'PUT', params: { id: 'atualizar-horas' } },
					totalHoras: { method: 'GET', params: { id: 'total' } },
					horasBanco: { method: 'GET', params: { id: 'banco' } }
				}
			),
			timeFilter = $filter('time'),
			service = {
				salvar: salvar,
				remover: remover,
				listar: listar,
				obterHorasBanco: obterHorasBanco,
				obterTotalHoras: obterTotalHoras,
				atualizarHoras: atualizarHoras
			};

		return service;

		function salvar(ponto) {
			ponto = getResource(ponto);

			if (ponto && !ponto._id) {
				ponto.data.resetTime();
				return ponto.$save();
			}

			return ponto.$update();
		}

		function remover(ponto) {
			ponto = getResource(ponto);
			return ponto.$remove();
		}

		function listar(mes) {
			var inicio = angular.copy(mes),
				fim = angular.copy(mes);

			return PontoResource.query({
				inicio: inicio.firstDay().resetTime(),
				fim: fim.lastDay().maxTime()
			})
			.$promise
			.then(pontos => formatarPontos(pontos));
		}

		function obterTotalHoras(mes) {
			var inicio = angular.copy(mes),
				fim = angular.copy(mes);

			return PontoResource.totalHoras({
				inicio: inicio.firstDay().resetTime(),
				fim: fim.lastDay().maxTime()
			}).$promise;
		}

		function obterHorasBanco() {
			return PontoResource.horasBanco().$promise;
		}

		function atualizarHoras() {
			return PontoResource.atualizarHoras().$promise;
		}

		function getResource(ponto) {
			var pontoResource = _.merge(new PontoResource(), ponto);
			return pontoResource;
		}

		function formatarPontos(pontos) {
			return pontos.map(function (ponto) {
				ponto.formatados = {};

				if (ponto.data && !angular.isDate(ponto.data)) { ponto.data = new Date(ponto.data); }
				if (ponto.entrada1 && !angular.isDate(ponto.entrada1)) { ponto.entrada1 = new Date(ponto.entrada1); }
				if (ponto.saida1 && !angular.isDate(ponto.saida1)) { ponto.saida1 = new Date(ponto.saida1); }
				if (ponto.entrada2 && !angular.isDate(ponto.entrada2)) { ponto.entrada2 = new Date(ponto.entrada2); }
				if (ponto.saida2 && !angular.isDate(ponto.saida2)) { ponto.saida2 = new Date(ponto.saida2); }

				ponto.formatados.registro1 = '';
				ponto.formatados.registro2 = '';

				if (ponto.entrada1) {
					ponto.formatados.registro1 = DateService.formatar(ponto.entrada1, 'HH:mm');
				}

				if (ponto.saida1) {
					ponto.formatados.registro1 += ' - ' + DateService.formatar(ponto.saida1, 'HH:mm');
				}

				if (ponto.entrada2) {
					ponto.formatados.registro2 = DateService.formatar(ponto.entrada2, 'HH:mm');
				}

				if (ponto.saida2) {
					ponto.formatados.registro2 += ' - ' + DateService.formatar(ponto.saida2, 'HH:mm');
				}

				if (ponto.horasTrabalhadas) {
					ponto.formatados.horasTrabalhadas = timeFilter(ponto.horasTrabalhadas);
				}

				if (ponto.horasExtras) {
					ponto.formatados.horasExtras = timeFilter(ponto.horasExtras);
				}

				if (ponto.horasFaltantes) {
					ponto.formatados.horasFaltantes = timeFilter(ponto.horasFaltantes);
				}

				return ponto;
			});
		}
	}
})();
