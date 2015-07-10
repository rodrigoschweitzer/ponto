'use strict';

var minutosDiaTrabalhado = 8 * 60;

exports.isDate = function(date) {
	return Object.prototype.toString.call(date) === '[object Date]';
};

exports.diferencaMinutosDatas = function(entrada, saida) {
	if (!entrada || !saida) return 0;
	if (!this.isDate(entrada)) entrada = new Date(entrada);
	if (!this.isDate(saida)) saida = new Date(saida);
	return Math.abs((saida - entrada) / (60 * 1000));
};

exports.getHorasTrabalhadas = function(entrada1, saida1, entrada2, saida2) {
	var periodo1 = this.diferencaMinutosDatas(entrada1, saida1),
		periodo2 = this.diferencaMinutosDatas(entrada2, saida2);
	return periodo1 + periodo2;
};

exports.getHorasExtras = function(entrada1, saida1, entrada2, saida2) {
	var horasDia = this.getHorasTrabalhadas(entrada1, saida1, entrada2, saida2),
		diferencaMinutos = horasDia - minutosDiaTrabalhado;
	return diferencaMinutos < 0 ? 0 : diferencaMinutos;
};

exports.getHorasFaltantes = function(entrada1, saida1, entrada2, saida2) {
	if (!saida1 || !saida2) return 0;

	var horasDia = this.getHorasTrabalhadas(entrada1, saida1, entrada2, saida2),
		diferencaMinutos = horasDia - minutosDiaTrabalhado;

	return diferencaMinutos > 0 ? 0 : Math.abs(diferencaMinutos);
};
