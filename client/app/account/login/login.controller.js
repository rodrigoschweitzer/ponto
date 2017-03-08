(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', '$mdToast', 'Auth'];

	function LoginController($state, $mdToast, Auth) {
		var vm = this;
		vm.usuario = {};
		vm.login = login;
		vm.carregando = false;

		function login() {
			vm.carregando = true;
			Auth.login({
					email: vm.usuario.email,
					password: vm.usuario.senha
				})
				.then(function () {
					$state.go('main.pontos');
					vm.carregando = false;
				})
				.catch(function (erro) {
					exibirMensagemErro(erro.message);
					vm.carregando = false;
				});
		}

		function exibirMensagemErro(mensagem) {
			$mdToast.show(
				$mdToast.simple()
					.textContent(mensagem)
					.position('top right')
			);
		}

	}
})();
