'use strict';

angular.module('pontoApp')
	.directive('panelTime', function () {
		return {
			templateUrl: 'app/panelTime/panelTime.html',
			restrict: 'E',
			replace: true,
			scope: {
				title: '@',
				color: '@',
				hours: '='
			},
			link: function (scope) {
				scope.panelColor = scope.color || 'default';
				scope.textColor = scope.color || 'muted';
			}
		};
	});