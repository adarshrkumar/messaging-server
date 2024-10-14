const fs = require('fs')

function listChannels(req, res, params) {
  var channels = []
  var channelList = fs.readdirSync(`${__dirname}/../channels`)
  return channelList
}

exports.defaults = listChannels