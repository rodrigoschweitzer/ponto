(function () {
	'use strict';

	angular
		.module('app')
		.directive('loading', Loading);

	Loading.$inject = ['$compile'];

	function Loading($compile) {
		var directive = {
			restrict: 'A',
			scope: {
				loading: '=',
				loadingMessage: '@'
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope) {
			var loadingWatchInstance,
				$backdrop,
				$container,
				$body = $('body');

			scope.loadingMessage = scope.loadingMessage ? scope.loadingMessage : 'Carregando...';

			scope.$on('$destroy', function () {
				loadingWatchInstance();
				if ($container) { $container.remove(); }
				if ($backdrop) { $backdrop.remove(); }
			});

			injetarHtml();

			function injetarHtml() {
				var templateCompilado = getTemplateCompilado();
				$body.append(templateCompilado);
				$backdrop = $body.find('.loading-backdrop');
				$container = $body.find('.loading-container');
				loadingWatchInstance = scope.$watch('loading', observeLoading);
			}

			function getTemplateCompilado() {
				return $compile(getTemplate())(scope);
			}

			function getTemplate() {
				return `
					<div class="loading-backdrop"></div>
					<div class="loading-container" layout layout-align="center center">
						<md-card class="loading-card">
							<md-card-content layout layout-align="center center">
								<md-progress-circular md-mode="indeterminate"></md-progress-circular>
								{{ loadingMessage }}
							</md-card-content>
						</md-card>
					</div>`;
			}

			function observeLoading(value) {
				if (value) {
					show();
				} else {
					hide();
				}
			}

			function show() {
				if ($backdrop && $container) {
					$container.fadeIn();
					$backdrop.fadeIn();
				}
			}

			function hide() {
				if ($backdrop && $container) {
					$backdrop.fadeOut();
					$container.fadeOut();
				}
			}
		}
	}

})();
