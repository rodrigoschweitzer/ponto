'use strict';

var Ponto = require('./ponto.model'),
	DateUtils = require('../../components/utils/date-utils'),
	_ = require('lodash'),
	async = require('async');

exports.banco = function(req, res) {
	Ponto.aggregate([{
				$match: { user: req.user._id }
			}, {
				$group: {
					_id: null,
					horasExtras: { $sum: '$horasExtras' },
					horasFaltantes: { $sum: '$horasFaltantes' }
				}
			}
		])
		.exec(function(err, dados) {
			if (err) { return handleError(res, err); }

			var horas = 0;

			if (dados.length) horas = dados[0].horasExtras - dados[0].horasFaltantes;

			return res.json(200, { horas: horas });
		});
};

exports.total = function(req, res) {
	Ponto.aggregate([{
			$match: {
				data: {
					$gte: new Date(req.query.inicio),
					$lte: new Date(req.query.fim)
				},
				user: req.user._id
			}
		}, {
			$group: {
				_id: null,
				horasTrabalhadas: { $sum: '$horasTrabalhadas' },
				horasExtras: { $sum: '$horasExtras' },
				horasFaltantes: { $sum: '$horasFaltantes' }
			}
		}
	]).exec(function(err, dados) {
		if (err) { return handleError(res, err); }

		var total = dados[0];

		if (total) {
			var	horasExtras = total.horasExtras || 0,
				horasFaltantes = total.horasFaltantes || 0;

			total.horasBancoMes = total.horasExtras - total.horasFaltantes;
		}

		return res.json(200, total);
	});
};

exports.entradas = function(req, res) {
	Ponto.find({
			data: {
				'$gte': req.query.inicio,
				'$lte': req.query.fim
			},
			user: req.user._id
		})
		.select('entrada1')
		.exec(function (err, pontos) {
			if (err) { return handleError(res, err); }

			return res.json(200, pontos);
		});
};

// Get list of pontos
exports.index = function(req, res) {
	Ponto.find({
			data: {
				'$gte': req.query.inicio,
				'$lte': req.query.fim
			},
			user: req.user._id
		})
		.sort('-data')
		.exec(function (err, pontos) {
			if (err) { return handleError(res, err); }

			return res.json(200, pontos);
		});
};

// Get a single ponto
exports.show = function(req, res) {
	Ponto.findById(req.params.id, function (err, ponto) {
		if (err) { return handleError(res, err); }
		if (!ponto) { return res.send(404); }
		return res.json(ponto);
	});
};

// Creates a new ponto in the DB.
exports.create = function(req, res) {
	var ponto = req.body;

	_.merge(ponto, calcularMinutos(ponto, req.user.workLoad), { user: req.user });

	Ponto.create(ponto, function(err, ponto) {
		if (err) { return handleError(res, err); }
		return res.json(201, ponto);
	});
};

// Updates an existing ponto in the DB.
exports.update = function(req, res) {
	if (req.body._id) { delete req.body._id; }
	Ponto.findById(req.params.id, function (err, ponto) {
		if (err) { return handleError(res, err); }
		if (!ponto) { return res.send(404); }

		var tmp = _.merge({
			entrada1: null,
			saida1: null,
			entrada2: null,
			saida2: null
		}, req.body);

		var updated = _.merge(ponto, tmp);
		_.merge(updated, calcularMinutos(updated, req.user.workLoad));

		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.json(200, ponto);
		});
	});
};

exports.atualizarHoras = function (req, res, next) {
	let user = req.user;

	Ponto.find({ user: user._id })
		.sort('-data')
		.exec((err, pontos) => {
			if (err) { return next(err) }

			async.each(pontos, (ponto, callback) => {
				_.merge(ponto, calcularMinutos(ponto, user.workLoad));
				ponto.save(callback);
			}, (err) => {
				if (err) { return next(err); }
				res.json(204);
			});
		});
};

// Deletes a ponto from the DB.
exports.destroy = function(req, res) {
	Ponto.findById(req.params.id, function (err, ponto) {
		if (err) { return handleError(res, err); }
		if (!ponto) { return res.send(404); }
		ponto.remove(function(err) {
			if (err) { return handleError(res, err); }
			return res.send(204);
		});
	});
};

function calcularMinutos(ponto, cargaHoraria) {
	let cargaHorariaMinutos = converterCargaHorariaParaMinutos(cargaHoraria);
	return {
		horasTrabalhadas: DateUtils.getHorasTrabalhadas(ponto),
		horasExtras: DateUtils.getHorasExtras(ponto, cargaHorariaMinutos),
		horasFaltantes: DateUtils.getHorasFaltantes(ponto, cargaHorariaMinutos)
	};
}

function converterCargaHorariaParaMinutos(cargaHoraria) {
	let cargaHorariaLimpa = cargaHoraria.replace(/[a-z]/ig, ''),
		cargaHorariaSplit = cargaHorariaLimpa.split(' '),
		horasEmMinutos = +cargaHorariaSplit[0] * 60,
		minutos = cargaHorariaSplit.length > 1 ? +cargaHorariaSplit[1] : 0;

	return horasEmMinutos + minutos;
}

function handleError(res, err) {
	return res.send(500, err);
}
