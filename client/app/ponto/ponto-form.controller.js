(function () {
	'use strict';

	angular
		.module('app')
		.controller('PontoFormController', PontoFormController);

	PontoFormController.$inject = ['$mdDialog', 'PontoService', 'ponto'];

	function PontoFormController($mdDialog, PontoService, ponto) {
		var vm = this;
		vm.carregando = false;
		vm.hoje = new Date();
		vm.ponto = ponto || { data: vm.hoje };
		vm.salvar = salvar;
		vm.fecharModal = fecharModal;

		function salvar() {
			vm.carregando = true;
			antesSalvar();

			PontoService.salvar(vm.ponto).then(() => {
				$mdDialog.hide().then(() => vm.carregando = false);
			});
		}

		function fecharModal() {
			$mdDialog.cancel();
		}

		function antesSalvar() {
			ajustarData(vm.ponto.entrada1);
			ajustarData(vm.ponto.saida1);
			ajustarData(vm.ponto.entrada2);
			ajustarData(vm.ponto.saida2);
		}

		function ajustarData(registro) {
			if (!registro) { return; }

			var data = vm.ponto.data;
			registro.setDate(data.getDate());
			registro.setMonth(data.getMonth());
			registro.setFullYear(data.getFullYear());
		}
	}
})();
