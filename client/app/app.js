'use strict';

angular.module('pontoApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngAnimate',
	'ui.router',
	'mgcrea.ngStrap'
])
	.config(function ($urlRouterProvider, $locationProvider, $httpProvider, $datepickerProvider, $timepickerProvider) {
		angular.extend($datepickerProvider.defaults, {
			dateFormat: 'dd/MM/yyyy',
			autoclose: true,
			useNative: true
		});

		angular.extend($timepickerProvider.defaults, {
			timeFormat: 'HH:mm'
		});

		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('authInterceptor');
	})

	.factory('authInterceptor', function ($q, $cookieStore, $location) {
		return {
			// Add authorization token to headers
			request: function (config) {
				config.headers = config.headers || {};
				if ($cookieStore.get('token')) {
					config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
				}
				return config;
			},

			// Intercept 401s and redirect you to login
			responseError: function(response) {
				if(response.status === 401) {
					$location.path('/login');
					// remove any stale tokens
					$cookieStore.remove('token');
					return $q.reject(response);
				}
				else {
					return $q.reject(response);
				}
			}
		};
	})

	.run(function ($rootScope, $location, Auth) {
		// Redirect to login if route requires auth and you're not logged in
		$rootScope.$on('$stateChangeStart', function (event, next) {
			Auth.isLoggedInAsync(function(loggedIn) {
				if (next.authenticate && !loggedIn) {
					$location.path('/login');
				}
			});
		});
	});
