// Root Object for the Server
var _space = {};

// Libs (Dependencies) 
var express = require('express');
var redis = require('redis');

// SERVER 
_space.server = {};
_space.tick = 0;

// Data-Models
_space.server.client = redis.createClient(6379);
_space.server.client.on("error",function (err) {
        console.log("Error " + err);
}); 


// HTTP Server Setup 
_space.server.app = express();
_space.server.app.engine('html', require('ejs').renderFile);
_space.server.app.use(express.static('client')); // Treat the Client Folder as Static Content
_space.server.app.use(express.bodyParser());

//Route: Test 
_space.server.app.get('/test', function (req, res) {
    var body = 'Hello World' + _space.tick;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

_space.server.app.get('/form', function (req, res) {
    res.render('node_form.html');
});

// REDIS: GET
_space.server.app.get('/data', function (req, res) {
    var body = "{}";
    console.log("getting: " + req.query.key);

    _space.server.client.get(req.query.key, function (err, data) {
        if (err) { console.log(err); }
        else 
        {console.log(data);  res.end(data); redis.print();}
    });
});

// REDIS: SET
_space.server.app.post('/data', function (req, res) {
    var _data = req.body;
    console.log('saving ' + req.query.key);
    _space.server.client.set(req.query.key, _data, function (err) {
        if (err) {
            console.log(error);
        }
    });
});

_space.server.app.listen(3000);
console.log('Listening on port 3000');


