'use strict';

describe('Controller: PontoCtrl', function () {

  // load the controller's module
  beforeEach(module('pontoApp'));

  var PontoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PontoCtrl = $controller('PontoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
