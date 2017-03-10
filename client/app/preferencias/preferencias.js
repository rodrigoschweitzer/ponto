'use strict';

angular.module('app')
	.config($stateProvider => {
		$stateProvider
			.state('main.preferencias', {
				url: '/preferencias',
				templateUrl: 'app/preferencias/preferencias.html',
				controller: 'PreferenciasController as vm'
			});
	});
