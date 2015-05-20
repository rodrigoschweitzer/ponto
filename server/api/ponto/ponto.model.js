'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PontoSchema = new Schema({
	data: {
		type: Date,
		default: Date.now
	},
	entrada1: Date,
	saida1: Date,
	entrada2: Date,
	saida2: Date,
	horasTrabalhadas: Number,
	horasExtras: Number,
	horasFaltantes: Number,
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('Ponto', PontoSchema);