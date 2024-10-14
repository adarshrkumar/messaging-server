const config = {
  idDigits: 16, 
  doNotHost: [
    '/config.json', 
    '/api/', 
    '/channels/', 
    '/api.js', 
    '/index.js', 
  ], 
}

exports.default = config