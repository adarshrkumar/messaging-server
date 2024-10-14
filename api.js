var listChannels = require('./api/listChannels').defaults
const functions = {
  listChannels: listChannels
}

function apiRequest(req, res) {
  var name = req.path.split('api/')[1]
  if (name.endsWith('/')) name = name.slice(0, -1)
  if (name.includes('-')) {
    name = name.split('-')
    name.forEach(function(n, i) {
      if (i !== 0) {
        name[i] = n[0].toUpperCase() + n.slice(1)
      }
    })
    name = name.join('')
  }
  var params = req.query
  var theFunction = functions[name]
  var output = `No Function found for ${name}.`
  if (theFunction) {
    output = theFunction(req, res, params)
  }
  return output
}

exports.default = apiRequest