// var express = require('express');
// var app = express();

// var http = require('http').Server(app);
// var io = require('socket.io')(http);


var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(2222);


var SocketController = require('./app/SocketController.js');
const socketController = new SocketController(io);

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('dev')); // log requests to the console

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//don't show the log when it is test
if(process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

const port = process.env.PORT || 2222;
const router = require('./routes');

app.use('/', router);
//app.listen(port, "127.0.0.1");
console.log('Magic happens on port ' + port);

module.exports = app;