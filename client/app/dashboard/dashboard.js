'use strict';

angular.module('app')
	.config(function ($stateProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'app/dashboard/dashboard.html',
				controller: 'DashboardController as vm'
			});
	});
