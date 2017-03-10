(function () {
	'use strict';

	angular
		.module('app')
		.controller('UsuariosController', UsuariosController);

	UsuariosController.$inject = ['$mdDialog', 'User'];

	function UsuariosController($mdDialog, User) {
		let vm = this;
		vm.usuarios = [];
		vm.exibirConfirmacao = exibirConfirmacao;
		vm.carregando = false;

		activate();

		function activate() {
			listarUsuarios();
		}

		function exibirConfirmacao(usuario) {
			$mdDialog.show(
				$mdDialog.confirm()
				.title('Confirmar Exclusão')
				.textContent(`Você deseja realmente remover o usuário: "${usuario.name}"?`)
				.ok('Remover')
				.cancel('Cancelar')
			)
			.then(confirmar => {
				if (confirmar) { removerUsuario(usuario); }
			});
		}

		function removerUsuario(usuario) {
			vm.carregando = true;
			User.remove({ id: usuario._id }).$promise.then(() => listarUsuarios());
		}

		function listarUsuarios() {
			vm.carregando = true;
			User.query().$promise.then(usuarios => vm.usuarios = usuarios).finally(() => vm.carregando = false);
		}
	}
})();
