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
			.icon('menu', 'assets/images/icons/menu-white.svg', 24)
			.icon('delete', 'assets/images/icons/delete.svg', 24)
			.icon('edit', 'assets/images/icons/edit.svg', 24)
			.icon('arrow-back', 'assets/images/icons/arrow-back.svg', 24)
			.icon('arrow-forward', 'assets/images/icons/arrow-forward.svg', 24)
			.icon('add', 'assets/images/icons/add.svg', 24)
			.icon('alarm', 'assets/images/icons/alarm.svg', 24)
			.icon('alarm-add', 'assets/images/icons/alarm-add.svg', 24)
			.icon('alarm-off', 'assets/images/icons/alarm-off.svg', 24)
			.icon('alarm-on', 'assets/images/icons/alarm-on.svg', 24)
			.icon('close', 'assets/images/icons/close-white.svg', 24)
			.icon('exit-to-app', 'assets/images/icons/exit-to-app.svg', 24)
			.icon('lock-outline', 'assets/images/icons/lock-outline.svg', 24)
			.icon('people', 'assets/images/icons/people.svg', 24)
			.icon('settings', 'assets/images/icons/settings.svg', 24);
	}

	core.config(configure);

	configure.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($urlRouterProvider, $locationProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/login');
		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('authInterceptor');
	}

})();
