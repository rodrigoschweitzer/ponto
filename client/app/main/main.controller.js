'use strict';

angular.module('pontoApp')
	.controller('MainCtrl', function ($scope, Auth) {
		$scope.isLoggedIn = Auth.isLoggedIn;
	});
