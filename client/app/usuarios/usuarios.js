'use strict';

angular.module('app')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main.usuarios', {
				url: '/usuarios',
				templateUrl: 'app/usuarios/usuarios.html',
				controller: 'UsuariosController as vm'
			});
	});
