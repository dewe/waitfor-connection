'use strict'

var net = require('net');

module.exports = function (host, port, timeout) {
  return new Promise((resolve, reject) => {
    var hrstart = process.hrtime();
    var socket = new net.Socket();

    socket.connect(port, host);
    socket.setTimeout(timeout || 1000);

    socket.on('connect', () => {
      socket.destroy();
      resolve(milliseconds());
    });

    socket.on('error', (error) => {
      socket.destroy();
      reject(error);
    });

    socket.on('timeout', (error) => {
      socket.destroy();
      reject(error || 'socket TIMEOUT');
    });

    function milliseconds() {
      var hrend = process.hrtime(hrstart);
      var ms = hrend[0] * 1e3 + hrend[1] / 1e6;
      return Math.floor(ms);
    }
  });
}
