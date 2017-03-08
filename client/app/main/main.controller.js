'use strict';

angular
	.module('app')
	.controller('MainController', MainController);

	MainController.$inject = ['$state', '$mdSidenav', '$mdDialog', 'Auth'];

	function MainController($state, $mdSidenav, $mdDialog, Auth) {
		var vm = this;
		vm.isLoggedIn = Auth.isLoggedIn;
		vm.isAdmin = Auth.isAdmin;
		vm.currentUser = Auth.getCurrentUser();
		vm.toggleMenu = toggleMenu;
		vm.logout = logout;
		vm.goTo = goTo;
		vm.isActive = isActive;

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
			$mdDialog.show(
				$mdDialog.confirm()
					.title('Confirmar Saída')
					.textContent(`Você deseja realmente sair?`)
					.ok('Sair')
					.cancel('Cancelar')
			)
			.then(confirmar => {
				if (confirmar) {
					Auth.logout();
					goTo('login');
				}
			});
		};
	}