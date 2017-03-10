'use strict';

angular.module('app')
	.directive('timeMask', timeMask);

	timeMask.$inject = ['$window', '$filter'];

	function timeMask($window, $filter) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ctrls) {
				let nonDigits = /\D/g,
					ignoredKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45],
					mask = /^([0-1]\d|2[0-3]):[0-5]\d$/, //HH:mm
					isNative = /(ip(a|o)d|iphone|android)/ig.test($window.navigator.userAgent);

				if(isNative) { element.prop('type', 'time'); }

				element.bind('keyup', keyup);
				ctrls.$parsers.push(parser);
				ctrls.$formatters.push(formatter);

				function keyup(event) {
					if (ignoredKeys.indexOf(event.keyCode) > -1) { return; }

					ctrls.$setViewValue(formatTime(ctrls.$viewValue));
					ctrls.$render();
				}

				function formatTime(value) {
					if (!value) { return; }

					// Remove todos os caracteres que não forem números
					let time = value.replace(nonDigits, '');

					if (time.length > 2) {
						time = time.substring(0, 2) + ':' + time.substring(2, 4);
					}

					return time;
				}

				function parser(value) {
					if (!value) {
						ctrls.$setValidity('date', true);
						return null;
					}

					// Expressão regular para validar a mascara HH:mm
					if (!mask.test(value)) {
						ctrls.$setValidity('date', false);
						return null;
					}

					let data = new Date();
					data.setHours(value.substring(0, 2));
					data.setMinutes(value.substring(3, 5));
					data.setSeconds(0);
					data.setMilliseconds(0);

					ctrls.$setValidity('date', true);

					return data;
				}

				function formatter(value) {
					return $filter('date')(value, 'HH:mm');
				}
			}
		};
	}
