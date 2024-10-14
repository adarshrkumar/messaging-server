const fs = require('fs')

const config = require('../config').default
const idDigits = config.idDigits

function getId() {

}

function createChannel(req, res, params) {
  var channelName = params.name
  
  var channelList = fs.readdirSync(`${__dirname}/../channels`)

  var channelId = ''

  for (let i = 0; i < idDigits; i++) {
    channelId += String(Math.floor(Math.random()*10))
  }

  channelId = parseInt(channelId)
  
  var json = {
    id: channelId, 
    name: channelName,
    messages: [],
  }

  fs.writeFileSync(`../channels/${channelId}.json`, json)

  
  return channelList
}

exports.defaults = createChannel