(function () {
	'use strict';

	angular
		.module('app')
		.controller('PreferenciasController', PreferenciasController);

	PreferenciasController.$inject = ['$mdDialog', '$mdToast','Auth', 'User', 'PontoService'];

	function PreferenciasController($mdDialog, $mdToast, Auth, User, PontoService) {
		let vm = this;
		vm.carregando = false;
		vm.cargaHoraria = '';
		vm.cargaHoariaPattern = /^([0-2][0-3]|\d{1})h\s?(([0-5]\d|\d{1})m)?$/ig; //Padrão: 23h 59m
		vm.salvar = salvar;
		vm.usuarioLogado = {};

		activate();

		function activate() {
			getUsuarioLogado().then(usuario => {
				vm.usuarioLogado = usuario;
				vm.cargaHoraria = usuario.workLoad;
			});
		}

		function salvar() {
			vm.carregando = true;
			vm.usuarioLogado.workLoad = vm.cargaHoraria;
			vm.usuarioLogado.$update().then(() =>  {
				vm.carregando = false;
				confirmarAlteracaoDeRegistros();
			});
		}

		function confirmarAlteracaoDeRegistros() {
			$mdDialog.show(
				$mdDialog.confirm()
					.title('Atualização de Carga Horária')
					.textContent(`Deseja atualizar todos os registros de ponto com a nova carga horária?`)
					.ok('Atualizar')
					.cancel('Manter')
			)
			.then(() => {
				vm.carregando = true;
				return PontoService.atualizarHoras().then(() => vm.carregando = false);
			})
			.finally(() => exibirMensagem('Preferências salva com sucesso'));
		}

		function getUsuarioLogado() {
			return Auth.getCurrentUser().$promise;
		}

		function exibirMensagem(mensagem) {
			$mdToast.show(
				$mdToast.simple()
					.textContent(mensagem)
					.position('bottom right')
			);
		}
				
	}
})();
