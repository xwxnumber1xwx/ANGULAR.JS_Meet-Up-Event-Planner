'use strict';

describe('Service: firebaseApi', function () {

  // load the service's module
  beforeEach(module('eventPlannerApp'));

  // instantiate service
  var firebaseApi;
  beforeEach(inject(function (_firebaseApi_) {
    firebaseApi = _firebaseApi_;
  }));

  it('should do something', function () {
    expect(!!firebaseApi).toBe(true);
  });

});
