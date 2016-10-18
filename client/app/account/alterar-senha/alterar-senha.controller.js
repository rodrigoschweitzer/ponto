(function () {
	'use strict';

	angular
		.module('app')
		.controller('AlterarSenhaController', AlterarSenhaController);

	AlterarSenhaController.$inject = ['Auth'];

	/* @ngInject */
	function AlterarSenhaController(Auth) {
		var vm = this;
		vm.user = {};
		vm.alterarSenha = alterarSenha;

		function alterarSenha(form) {
			if (form.$valid) {
				Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
					.then(function () {
						vm.message = 'Senha alterada com sucesso.';
					})
					.catch(function () {
						form.password.$setValidity('mongoose', false);
					});
			}
		}
	}
})();
