'use strict';

exports.isDate = function(date) {
	return Object.prototype.toString.call(date) === '[object Date]';
};

exports.diferencaMinutosDatas = function(entrada, saida) {
	if (!entrada || !saida) return 0;
	if (!this.isDate(entrada)) entrada = new Date(entrada);
	if (!this.isDate(saida)) saida = new Date(saida);
	return Math.abs((saida - entrada) / (60 * 1000));
};

exports.getHorasTrabalhadas = function(ponto) {
	var periodo1 = this.diferencaMinutosDatas(ponto.entrada1, ponto.saida1),
		periodo2 = this.diferencaMinutosDatas(ponto.entrada2, ponto.saida2);
	return periodo1 + periodo2;
};

exports.getHorasExtras = function(ponto, cargaHorariaEmMinutos) {
	var horasDia = this.getHorasTrabalhadas(ponto),
		diferencaMinutos = horasDia - cargaHorariaEmMinutos;
	return diferencaMinutos < 0 ? 0 : diferencaMinutos;
};

exports.getHorasFaltantes = function(ponto, cargaHorariaEmMinutos) {
	if (!ponto.saida1 || !ponto.saida2) return 0;

	var horasDia = this.getHorasTrabalhadas(ponto),
		diferencaMinutos = horasDia - cargaHorariaEmMinutos;

	return diferencaMinutos > 0 ? 0 : Math.abs(diferencaMinutos);
};
