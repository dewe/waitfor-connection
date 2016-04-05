'use strict';

var assert = require('chai').assert;
var connection = require('../test-connection')

describe('test-connection', function () {

  it('resolves with timing on success', function () {
    return connection('google.com', 80)
      .then(x => assert.isNumber(x));
  });

  it('rejects with error on host not found', function () {
    return connection('host.not.found', 80)
      .then(
        () => assert(false, 'should not resolve'),
        err => assert.propertyVal(err, 'code', 'ENOTFOUND'));
  });

});
