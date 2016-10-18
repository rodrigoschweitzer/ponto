'use strict';

angular.module('app.layout')
	.directive('panelTime', function () {
		return {
			templateUrl: 'app/layout/panel-time/panel-time.html',
			restrict: 'E',
			scope: {
				title: '@',
				color: '@',
				hours: '='
			},
			link: function (scope) {
				scope.color = scope.color || 'grey';
			}
		};
	});
