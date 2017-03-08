(function () {
	'use strict';

	angular
		.module('app')
		.controller('RegistrarController', RegistrarController);

	RegistrarController.$inject = ['$state', 'Auth'];

	function RegistrarController($state, Auth) {
		var vm = this;
		vm.carregando = false;
		vm.usuario = {};
		vm.erros = {};
		vm.registrar = registrar;

		function registrar(form) {
			if (form.$valid) {
				vm.carregando = true;
				Auth.createUser({
						name: vm.usuario.nome,
						email: vm.usuario.email,
						password: vm.usuario.senha
					})
					.then(function () {
						$state.go('main.pontos');
						vm.carregando = false;
					})
					.catch(function (response) {
						vm.erros = {};

						angular.forEach(response.data.errors, function (erro, campo) {
							form[campo].$setValidity('mongoose', false);
							vm.erros[campo] = erro.message;
						});

						vm.carregando = false;
					});
			}
		};
	}
})();
