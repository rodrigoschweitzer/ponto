'use strict';

describe('Service: ponto', function () {

  // load the service's module
  beforeEach(module('pontoApp'));

  // instantiate service
  var ponto;
  beforeEach(inject(function (_ponto_) {
    ponto = _ponto_;
  }));

  it('should do something', function () {
    expect(!!ponto).toBe(true);
  });

});
