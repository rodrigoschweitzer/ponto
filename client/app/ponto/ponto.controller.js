(function () {
	'use strict';

	angular
		.module('app')
		.controller('PontoController', PontoController);

	PontoController.$inject = ['$scope', '$mdDialog', '$mdMedia', 'PontoService', 'DateService'];

	function PontoController($scope, $mdDialog, $mdMedia, PontoService, DateService) {
		var vm = this;
		vm.mes = new Date();
		vm.pontos = [];
		vm.total = {};
		vm.horasBanco = 0;
		vm.carregando = false;
		vm.pontoSelecionado = [];
		vm.telaGrande = telaGrande;
		vm.exibirModalPonto = exibirModalPonto;
		vm.exibirModalRemover = exibirModalRemover;
		vm.listarPontos = listarPontos;
		vm.possuiRegistros = possuiRegistros;
		vm.obterTotalHoras = obterTotalHoras;
		vm.obterHorasBanco = obterHorasBanco;

		activate();

		function activate() {
			adicionarObservadores();
			listarPontos();
		}

		function adicionarObservadores() {
			$scope.$watch('vm.mes', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					listarPontos();
				}
			}, true);
		}

		function telaGrande() {
			return $mdMedia('gt-md');
		}

		function exibirModalPonto(ponto) {
			$mdDialog.show({
				templateUrl: 'app/ponto/ponto-form.html',
				controller: 'PontoFormController',
				controllerAs: 'vm',
				locals: {
					ponto: ponto
				},
				clickOutsideToClose: false,
				fullscreen: true
			})
			.then(() => listarPontos());
		}

		function exibirModalRemover(ponto) {
			var dia = DateService.formatar(ponto.data, 'dd'),
				confirmar = $mdDialog.confirm()
							.title('Confirmar Exclusão')
							.textContent(`Deseja realmente remover o registro do dia ${dia}?`)
							.ok('Remover')
							.cancel('Cancelar');

			$mdDialog.show(confirmar).then(() => remover(ponto));
		}

		function remover(ponto) {
			vm.carregando = true;
			PontoService.remover(ponto).then(() => listarPontos());
		}

		function limparPontoSelecionado() {
			vm.pontoSelecionado = [];
		}

		function listarPontos() {
			vm.carregando = true;
			limparPontoSelecionado();
			PontoService.listar(vm.mes).then(pontos => {
				vm.pontos = pontos;
				vm.carregando = false;
			});
			obterTotalHoras();
			obterHorasBanco();
		}

		function possuiRegistros() {
			return !!vm.pontos.length;
		}

		function obterTotalHoras() {
			var mes = angular.copy(vm.mes);
			return PontoService.obterTotalHoras(mes).then(total => vm.total = total);
		}

		function obterHorasBanco() {
			return PontoService.obterHorasBanco().then(horasBanco => vm.horasBanco = horasBanco.horas);
		}
	}
})();
