'use strict';

angular.module('pontoApp')
	.filter('time', function () {
		function _formatar(tempo) {
			var horas = Math.floor(Math.abs(tempo) / 60),
				minutos = Math.abs(tempo) % 60,
				horaNegativa = '';

			if (tempo < 0) horaNegativa = '-';
			if (horas < 10) horas = '0' + horas;
			if (minutos < 10) minutos = '0' + minutos;

			return horaNegativa + horas + ':' + minutos;
		}

		return function (valor) {
			return (valor) ? _formatar(valor) : '00:00';
		};
	});
