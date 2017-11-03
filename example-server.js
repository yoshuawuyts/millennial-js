var http = require('http')

module.exports = function simpleServer () {
  return {
    createServer: createServer,
    request: request
  }

  function createServer (cb) {
    http.createServer(cb)
  }

  function request (opts, cb) {
    http.request(opts, cb)
  }
}

