'use strict';

angular.module('pontoApp')
	.controller('PontoCtrl', function ($scope, PontoService, $modal) {
		var TMPL_PONTO = 'app/ponto/ponto.modal.html',
			TMPL_REMOVER = 'app/ponto/ponto-remover.modal.html',
			_modal = {};

		function _setTemplate(template) {
			_modal = $modal({
				scope: $scope,
				template: template,
				animation: 'am-fade-and-scale',
				show: false
			});
		}

		$scope.$watch('mes', function(newValue, oldValue) {
			if (newValue !== oldValue) {
				$scope.listar();
			}
		}, true);

		$scope.mes = new Date();
		$scope.ponto = {};
		$scope.pontos = [];
		$scope.total = {};
		$scope.banco = {};

		$scope.anterior = function() {
			$scope.mes.prevMonth();
		};

		$scope.proximo = function() {
			$scope.mes.nextMonth();
		};

		$scope.showModalPonto = function(ponto) {
			_setTemplate(TMPL_PONTO);
			if (!ponto) {
				$scope.ponto = _.merge(PontoService.instance(), { data: new Date() });
			} else {
				$scope.ponto = angular.copy(ponto);
			}
			_modal.$promise.then(_modal.show);
		};

		$scope.showModalRemover = function(ponto) {
			$scope.ponto = ponto;
			_setTemplate(TMPL_REMOVER);
			_modal.$promise.then(_modal.show);
		};

		$scope.remover = function(fecharModal) {
			PontoService.remover($scope.ponto).then(function() {
				var index = $scope.pontos.indexOf($scope.ponto);
				$scope.pontos.splice(index, 1);
				$scope.getTotal();
				$scope.getHorasBanco();
				fecharModal();
			});
		};

		$scope.salvar = function(fecharModal) {
			PontoService.salvar($scope.ponto).then(function(ponto) {
				$scope.listar();
				$scope.getHorasBanco();
				fecharModal();
			});
		};

		$scope.listar = function() {
			var mes = angular.copy($scope.mes);
			PontoService.listar(mes).then(function(pontos) {
				$scope.pontos = pontos;
			});
			$scope.getTotal();
		};

		$scope.possuiRegistros = function() {
			return !!$scope.pontos.length;
		};

		$scope.getTotal = function() {
			var mes = angular.copy($scope.mes);
			PontoService.total(mes).then(function(total) {
				$scope.total = total[0];
			});
		};

		$scope.getHorasBanco = function() {
			PontoService.banco().then(function(banco) {
				$scope.banco = banco;
			});
		};

		$scope.listar();
		$scope.getHorasBanco();
	});
