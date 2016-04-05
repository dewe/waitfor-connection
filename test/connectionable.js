'use strict';

var assert = require('chai').assert;
var connection = require('../connectionable')

describe('test connection with connectionable', function () {
  this.slow(500);

  it('resolves with timing on success', function () {
    return connection('tcp-server', 9000)
      .then(x => assert.isNumber(x));
  });

  it('rejects with error on host not found', function () {
    return connection('host.not.found', 9000)
      .then(
        () => assert(false, 'should not resolve'),
        err => assert.propertyVal(err, 'code', 'ENOTFOUND'));
  });

  it('rejects with error on connection refused', function () {
    return connection('tcp-server', 4711)
      .then(
        () => assert(false, 'should not resolve'),
        err => assert.propertyVal(err, 'code', 'ECONNREFUSED'));
  });

  it('rejects on connection timeout', function () {
    var nonRoutableIp = '10.255.255.1';
    var timeoutMs = 200;

    return connection(nonRoutableIp, 80, timeoutMs)
      .then(
        () => assert(false, 'should not resolve'),
        err => assert.match(err, /TIMEOUT/));
  });
});
