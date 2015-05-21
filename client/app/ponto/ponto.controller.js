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

		function _beforeSave() {
			_setDate($scope.ponto.entrada1);
			_setDate($scope.ponto.saida1);
			_setDate($scope.ponto.entrada2);
			_setDate($scope.ponto.saida2);
		}

		function _setDate(registro) {
			if (!registro) { return; }

			var data = $scope.ponto.data;
			registro.setDate(data.getDate());
			registro.setMonth(data.getMonth());
			registro.setFullYear(data.getFullYear());
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
			_beforeSave();

			PontoService.salvar($scope.ponto).then(function() {
				$scope.listar();
				$scope.getHorasBanco();
				fecharModal();
			});
		};

		$scope.listar = function() {
			var mes = angular.copy($scope.mes);

			PontoService.listar(mes).then(function(pontos) {
				angular.forEach(pontos, function (ponto) {
					ponto.data = new Date(ponto.data);
					if (ponto.entrada1) { ponto.entrada1 = new Date(ponto.entrada1); }
					if (ponto.saida1) { ponto.saida1 = new Date(ponto.saida1); }
					if (ponto.entrada2) { ponto.entrada2 = new Date(ponto.entrada2); }
					if (ponto.saida2) { ponto.saida2 = new Date(ponto.saida2); }
				});

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
