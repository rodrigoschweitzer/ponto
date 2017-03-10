'use strict';

var express = require('express');
var controller = require('./ponto.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/total', auth.isAuthenticated(), controller.total);
router.get('/banco', auth.isAuthenticated(), controller.banco);
router.get('/entradas', auth.isAuthenticated(), controller.entradas);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/atualizar-horas', auth.isAuthenticated(), controller.atualizarHoras);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
