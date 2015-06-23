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
			_setDateOnRegister($scope.ponto.entrada1);
			_setDateOnRegister($scope.ponto.saida1);
			_setDateOnRegister($scope.ponto.entrada2);
			_setDateOnRegister($scope.ponto.saida2);
		}

		function _setDateOnRegister(registro) {
			if (!registro) { return; }

			var data = $scope.ponto.data;
			registro.setDate(data.getDate());
			registro.setMonth(data.getMonth());
			registro.setFullYear(data.getFullYear());
		}

		function _tratarEstadoBotaoSalvar() {
			var label = '';

			$scope.botaoSalvarDesabilitado = !$scope.botaoSalvarDesabilitado;

			if ($scope.botaoSalvarDesabilitado) {
				label = 'Salvando...';
			} else {
				label = 'Salvar';
			}

			$scope.labelBotaoSalvar = label;
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
		$scope.horasBanco = 0;
		$scope.labelBotaoSalvar = 'Salvar';
		$scope.botaoSalvarDesabilitado = false;

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
			_tratarEstadoBotaoSalvar();
			_beforeSave();

			PontoService.salvar($scope.ponto).then(function() {
				$scope.listar();
				$scope.getHorasBanco();
				fecharModal();
				_tratarEstadoBotaoSalvar();
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
			PontoService.totalHoras(mes).then(function(total) {
				$scope.total = total;
			});
		};

		$scope.getHorasBanco = function() {
			PontoService.horasBanco().then(function(horasBanco) {
				$scope.horasBanco = horasBanco.horas;
			});
		};

		$scope.listar();
		$scope.getHorasBanco();
	});
