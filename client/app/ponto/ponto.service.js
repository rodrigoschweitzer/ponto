'use strict';

angular.module('pontoApp')
	.factory('PontoService', function($resource) {
		var Service = $resource('/api/pontos/:id', {
			id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});

		return {
			instance: function() {
				return new Service();
			},

			get: function(id) {
				return Service.get({ id: id }).$promise;
			},

			salvar: function(ponto) {
				if (ponto && !ponto._id) {
					ponto.data.resetTime();
					return ponto.$save();
				}

				return ponto.$update();
			},

			remover: function(ponto) {
				return ponto.$remove();
			},

			listar: function(mes) {
				var inicio = mes,
					fim = angular.copy(mes);

				return Service.query({
					inicio: inicio.firstDay().resetTime(),
					fim: fim.lastDay().maxTime()
				}).$promise;
			},

			totalHoras: function(mes) {
				var inicio = mes,
					fim = angular.copy(mes);

				return $resource('/api/pontos/total').get({
					inicio: inicio.firstDay().resetTime(),
					fim: fim.lastDay().maxTime()
				}).$promise;
			},

			horasBanco: function() {
				return $resource('/api/pontos/banco').get().$promise;
			}
		};
	});
