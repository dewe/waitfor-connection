'use strict';

var assert = require('chai').assert;
var nock = require('nock');
var waitfor = require('../');

var options = {
  retries: 2,
  minTimeout: 100,
  maxTimeout: 100
}

// TODO: test in container

describe('waitfor-connection', function () {
  this.timeout(5000);

  it('rejects after retrying, when host not found', function () {
    return waitfor('host.not.found', 4711, options)
      .then(
        () => assert(false, 'should not resolve'),
        err => assert.equal(err.code, 'ENOTFOUND'));
  });

});
