'use strict';

angular.module('app')
	.config(function ($stateProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/account/login/login.html',
				controller: 'LoginController as vm'
			})
			.state('registrar', {
				url: '/registrar',
				templateUrl: 'app/account/registrar/registrar.html',
				controller: 'RegistrarController as vm'
			})
			.state('main.alterar-senha', {
				url: '/alterar-senha',
				templateUrl: 'app/account/alterar-senha/alterar-senha.html',
				controller: 'AlterarSenhaController as vm',
				authenticate: true
			});
	});
