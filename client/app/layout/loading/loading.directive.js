(function () {
	'use strict';

	angular
		.module('app')
		.directive('loading', Loading);

	Loading.$inject = ['$compile', '$timeout'];

	function Loading($compile, $timeout) {
		var directive = {
			restrict: 'A',
			scope: {
				loading: '='
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el) {
			var templateUrl = 'app/layout/loading/loading.html',
				loadingWatchInstance,
				$backdrop,
				$container,
				$body = $('body');

			scope.$on('$destroy', function () {
				loadingWatchInstance()
				if ($container) $container.remove();
				if ($backdrop) $backdrop.remove();
			});

			injetarHtml();

			function injetarHtml(exibir) {
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
				return [
					'<div class="loading-backdrop"></div>',
					'<div class="loading-container" layout layout-align="center center">',
					'	<md-card class="loading-card">',
					'		<md-card-content>',
					'			<md-progress-circular md-mode="indeterminate"></md-progress-circular>',
					'		</md-card-content>',
					'	</md-card>',
					'</div>'
				].join('');
			}

			function observeLoading(value) {
				value ? show() : hide();
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