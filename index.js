'use strict';

var promiseRetry = require('promise-retry');
var tcp = require('tcp-connect');
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

    return tcp(host, port, 1000)
      .then(() => debug(`${host}:${port} is available`))
      .catch(retry);
  });
}
