var express = require('express');
var app = express();
//var path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');

// var routes = require('./routes.js');
// var router = require('./routes.js').router;

app.use(morgan('dev')); // log requests to the console

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 2222; 
var router = express.Router();

router.use(function(req, res, next) {
	next();
});
//------------------------------------------------------------
router.get('/', function(req, res) {
	res.json({ message: 'you have been routed to the root route. they are coming to get you!' });	
});

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);

