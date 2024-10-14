const fs = require('fs');
const config = require('./config').default;

const express = require('express');
const app = express();

var apiRequest = require('./api').default;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/api/*', function(req, res) {
  res.send(apiRequest(req, res))
})

app.get('*', function(req, res) {
  var doNotHost = config.doNotHost
  
  var url = req.path
  var file = url
  if (file.endsWith('/')) file = file.slice(0, -1)
  if (!file.includes('.')) {
    if (!url.endsWith('/')) res.redirect(`${url}/`)
    else file += '.html'
  }
  
  file = `${__dirname}/${file}`
  if (file.includes('//')) file = file.replace('//', '/')
  var blocked = false

  doNotHost.forEach(function(p, i) {
    var method = 'includes'
    if (p.endsWith('/')) method = 'startsWith'
    if (url[method](p)) {
      blocked = true
    }
  })

  if (blocked) {
    file = `${__dirname}/401.html`
  }
  else if (!fs.existsSync(file)) {
    file = `${__dirname}/404.html`
  }
  if (!fs.existsSync(file)) {
    console.log(`Error with: ${url}`)
  }
  res.sendFile(file)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});