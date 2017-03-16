(function () {
	'use strict';

	angular
		.module('app')
		.controller('PontoController', PontoController);

	PontoController.$inject = ['$scope', '$mdDialog', '$mdMedia', 'PontoService', 'DateService'];

	function PontoController($scope, $mdDialog, $mdMedia, PontoService, DateService) {
		let vm = this;
		vm.mes = new Date();
		vm.pontos = [];
		vm.total = {};
		vm.horasBanco = 0;
		vm.carregando = false;
		vm.pontoSelecionado = null;
		vm.pontosSelecionados = [];
		vm.telaGrande = telaGrande;
		vm.exibirModalPonto = exibirModalPonto;
		vm.exibirModalRemover = exibirModalRemover;
		vm.listarPontos = listarPontos;
		vm.possuiRegistros = possuiRegistros;
		vm.obterTotalHoras = obterTotalHoras;
		vm.obterHorasBanco = obterHorasBanco;
		vm.onPontoSelecionado = onPontoSelecionado;

		activate();

		function activate() {
			adicionarObservadores();
			listarPontos();
		}

		function adicionarObservadores() {
			$scope.$watch('vm.mes', (newValue, oldValue) => {
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
				fullscreen: true,
				focusOnOpen: false,
				onComplete: (scope, el) => el.find('input.ng-empty:first').focus()
			})
			.then(() => listarPontos());
		}

		function exibirModalRemover(ponto) {
			let dia = DateService.formatar(ponto.data, 'dd');

			$mdDialog.show(
				$mdDialog.confirm()
					.title('Confirmar Exclusão')
					.textContent(`Deseja realmente remover o registro do dia ${dia}?`)
					.ok('Remover')
					.cancel('Cancelar')
			).then(() => remover(ponto));
		}

		function remover(ponto) {
			vm.carregando = true;
			PontoService.remover(ponto).then(() => listarPontos());
		}

		function limparPontoSelecionado() {
			vm.pontoSelecionado = null;
			vm.pontosSelecionados = [];
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
			let mes = angular.copy(vm.mes);
			return PontoService.obterTotalHoras(mes).then(total => vm.total = total);
		}

		function obterHorasBanco() {
			return PontoService.obterHorasBanco().then(horasBanco => vm.horasBanco = horasBanco.horas);
		}

		function onPontoSelecionado(ponto) {
			vm.pontoSelecionado = ponto;
		}
	}
})();
