'use strict';

angular.module('pontoApp')
	.controller('LoginCtrl', function ($scope, Auth, $location) {
		$scope.user = {};
		$scope.mensagem = '';

		$scope.login = function() {
			Auth.login({
				email: $scope.user.email,
				password: $scope.user.password
			})
			.then(function() {
				$location.path('/');
			})
			.catch(function(err) {
				$scope.mensagem = err.message;
			});
		};

	});
