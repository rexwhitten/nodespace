
var battlespace = {};

// libs 
var express = require('express');
var redis = require('redis');


// SERVER 
battlespace.server = {};
battlespace.tick = 0;

// Data-Models
battlespace.server.client = redis.createClient(6379);
battlespace.server.client.on("error",function (err) {
        console.log("Error " + err);
}); 


// HTTP Server
battlespace.server.app = express();

battlespace.server.app.use(express.static('client'));

battlespace.server.app.get('/test', function (req, res) {

    battlespace.tick++;
    battlespace.server.client.set("update:", battlespace.tick.toString());

    var body = 'Hello World' + battlespace.tick;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);

});

battlespace.server.app.listen(3000);
console.log('Listening on port 3000');


