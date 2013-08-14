
var battlespace = {};

battlespace.server = {};
var express = require('express');
battlespace.server.app = express();

battlespace.server.app.use(express.static('client'));

battlespace.server.app.get('/test', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

battlespace.server.app.listen(3000);
console.log('Listening on port 3000');