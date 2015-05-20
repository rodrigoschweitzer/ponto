'use strict';

angular.module('pontoApp')
	.controller('NavbarCtrl', function ($scope, $location, Auth, $aside) {
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.isAdmin = Auth.isAdmin;
		$scope.getCurrentUser = Auth.getCurrentUser;

		var _menu = $aside({
			scope: $scope,
			template: 'components/navbar/menu.html',
			placement: 'left',
			animation: 'am-slide-left',
			show: false
		});

		$scope.showMenu = function() {
			_menu.$promise.then(_menu.show);
		};

		$scope.logout = function(esconderMenu) {
			Auth.logout();

			if (esconderMenu) {
				esconderMenu();
			}

			$location.path('/');
		};

		$scope.isActive = function(route) {
			return route === $location.path();
		};
	});