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

		function _converterDatasPonto(pontos) {
			return _.map(pontos, function (ponto) {
				if (ponto.data && _.isString(ponto.data)) { ponto.data = new Date(ponto.data); }
				if (ponto.entrada1 && _.isString(ponto.entrada1)) { ponto.entrada1 = new Date(ponto.entrada1); }
				if (ponto.saida1 && _.isString(ponto.saida1)) { ponto.saida1 = new Date(ponto.saida1); }
				if (ponto.entrada2 && _.isString(ponto.entrada2)) { ponto.entrada2 = new Date(ponto.entrada2); }
				if (ponto.saida2 && _.isString(ponto.saida2)) { ponto.saida2 = new Date(ponto.saida2); }
				return ponto;
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
				$scope.pontos = _converterDatasPonto(pontos);
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
