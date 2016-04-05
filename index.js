'use strict';

var promiseRetry = require('promise-retry');
var test = require('./test-connection');
var debug = require('debug')('waitfor-connection');

var defaults = {
  retries: 30,
  maxTimeout: 1000
};

module.exports = function (host, port, options) {
  options = Object.assign({}, defaults, options);
  debug(`${host}:${port} retry options`, options);

  return promiseRetry(options, function (retry, number) {
    debug(`${host}:${port} attempt ${number}`);

    return test(host, port, 1000)
      .then(() => debug(`${host}:${port} is available`))
      .catch(retry);
  });
}
