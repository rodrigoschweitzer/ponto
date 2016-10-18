(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', 'Auth'];

	function LoginController($state, Auth) {
		var vm = this;
		vm.usuario = {};
		vm.mensagem = '';
		vm.login = login;

		function login() {
			Auth.login({
					email: vm.usuario.email,
					password: vm.usuario.senha
				})
				.then(function () {
					$state.go('main.pontos');
				})
				.catch(function (erro) {
					vm.mensagem = erro.message;
				});
		}

	}
})();
