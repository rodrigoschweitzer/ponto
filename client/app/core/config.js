(function () {
	'use strict';

	let core = angular.module('app.core');

	core.config(dateLocaleConfig);

	dateLocaleConfig.$inject = ['$mdDateLocaleProvider'];

	function dateLocaleConfig($mdDateLocaleProvider) {
		$mdDateLocaleProvider.formatDate = function (date) {
			var m = moment(date);
			return m.isValid() ? m.format('DD/MM/YYYY') : '';
		};
	}

	core.config(themeConfig);

	themeConfig.$inject = ['$mdThemingProvider'];

	function themeConfig($mdThemingProvider) {
		$mdThemingProvider.theme('default').primaryPalette('blue');
	}

	core.config(iconConfig);

	iconConfig.$inject = ['$mdIconProvider'];

	function iconConfig($mdIconProvider) {
		$mdIconProvider
			.icon('menu', 'assets/icons/menu-white.svg', 24)
			.icon('delete', 'assets/icons/delete.svg', 24)
			.icon('edit', 'assets/icons/edit.svg', 24)
			.icon('arrow-back', 'assets/icons/arrow-back-black.svg', 24)
			.icon('arrow-forward', 'assets/icons/arrow-forward-black.svg', 24)
			.icon('add', 'assets/icons/add.svg', 24)
			.icon('alarm', 'assets/icons/alarm.svg', 24)
			.icon('alarm-add', 'assets/icons/alarm-add.svg', 24)
			.icon('alarm-off', 'assets/icons/alarm-off.svg', 24)
			.icon('alarm-on', 'assets/icons/alarm-on.svg', 24)
			.icon('close', 'assets/icons/close-white.svg', 24)
			.icon('exit-to-app', 'assets/icons/exit-to-app.svg', 24)
			.icon('lock-outline', 'assets/icons/lock-outline.svg', 24)
			.icon('people', 'assets/icons/people.svg', 24);
	}

	core.config(configure);

	configure.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($urlRouterProvider, $locationProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/login');
		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('authInterceptor');
	}

})();
