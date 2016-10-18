'use strict';

angular.module('app')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main.pontos', {
				url: '/pontos',
				templateUrl: 'app/ponto/ponto.html',
				controller: 'PontoController as vm',
				authenticate: true
			});
	});
