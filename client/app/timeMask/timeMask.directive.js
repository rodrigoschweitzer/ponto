'use strict';

angular.module('pontoApp')
	.directive('timeMask', function ($window, $filter) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ctrls) {
				var _formartTime, _keyup, _parser, _formatter,
					isNative = /(ip(a|o)d|iphone|android)/ig.test($window.navigator.userAgent);

				if(isNative) {
					element.prop('type', 'time');
				}

				_formartTime = function (value) {
					if (!value) { return ''; }

					// Remove todos os caracteres que não forem números
					var time = value.replace(/\D/g, '');

					if (time.length > 2) {
						time = time.substring(0, 2) + ':' + time.substring(2, 4);
					}

					return time;
				};

				_keyup = function (event) {
					if (/(16|17|18|20|35|36|37|38|39|40|45)/.test(event.keyCode)) { return; }

					ctrls.$setViewValue(_formartTime(ctrls.$viewValue));
					ctrls.$render();
				};

				_parser = function (value) {
					// Expressão regular para a mascara HH:mm
					if (!/^([0-1]\d|2[0-3]):[0-5]\d$/.test(value)) {
						ctrls.$setValidity('date', false);
						return value;
					}

					var data = new Date();
					data.setHours(value.substring(0, 2));
					data.setMinutes(value.substring(3, 5));
					data.setSeconds(0);
					data.setMilliseconds(0);
					ctrls.$setValidity('date', true);
					return data;
				};

				_formatter = function (value) {
					return $filter('date')(value, 'HH:mm');
				};

				element.bind('keyup', _keyup);
				ctrls.$parsers.push(_parser);
				ctrls.$formatters.push(_formatter);
			}
		};
	});


