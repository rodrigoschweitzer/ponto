'use strict';

describe('Directive: timeMask', function () {

  // load the directive's module
  beforeEach(module('pontoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<time-mask></time-mask>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the timeMask directive');
  }));
});