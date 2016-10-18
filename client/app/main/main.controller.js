'use strict';

angular.module('app')
	.controller('MainController', function ($scope, $state, $mdSidenav, Auth) {
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.isAdmin = Auth.isAdmin;
		$scope.currentUser = Auth.getCurrentUser();
		$scope.toggleMenu = toggleMenu;
		$scope.logout = logout;
		$scope.goTo = goTo;
		$scope.isActive = isActive;

		function isActive(state) {
			return $state.is(state);
		}

		function toggleMenu() {
			$mdSidenav('sidemenu').toggle();
		}

		function goTo(state) {
			$state.go(state);
			toggleMenu();
		}

		function logout() {
			Auth.logout();
			goTo('login');
		};
	});
