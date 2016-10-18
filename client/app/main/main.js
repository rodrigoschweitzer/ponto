(function () {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$stateProvider']

	function config($stateProvider) {
		$stateProvider
			.state('main', {
				abstract: true,
				templateUrl: 'app/main/main.html',
				controller: 'MainController as vm'
			});
	}

})();
