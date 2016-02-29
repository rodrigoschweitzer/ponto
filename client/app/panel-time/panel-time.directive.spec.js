'use strict';

describe('Directive: panelTime', function () {

  // load the directive's module and view
  beforeEach(module('pontoApp'));
  beforeEach(module('app/panel-time/panel-time.html'));

  var element, scope, compile;

  beforeEach(inject(function ($compile, $rootScope) {
    compile = $compile;
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', function () {
    element = angular.element('<panel-time></panel-time>');
    element = compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the panelTime directive');
  });
});
