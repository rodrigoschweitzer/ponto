'use strict';

angular.module('pontoApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('ponto', {
				url: '/pontos',
				templateUrl: 'app/ponto/ponto.html',
				controller: 'PontoCtrl',
				authenticate: true
			});
	});