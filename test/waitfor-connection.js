'use strict';

var assert = require('chai').assert;
var waitfor = require('../');

var options = {
  retries: 3,
  minTimeout: 100,
  maxTimeout: 200
}

describe('waitfor-connection', function () {
  this.timeout(5000);
  this.slow(1000);

  it('rejects after retrying', function () {
    return waitfor('host.not.found', 4711, options)
      .then(
        () => assert(false, 'should not resolve'),
        err => assert.equal(err.code, 'ENOTFOUND'));
  });

  it('resolves when connected', function() {
    return waitfor('google.com', 80, options)
      .catch(err => assert(false, 'Should not reject'));
  })

});
