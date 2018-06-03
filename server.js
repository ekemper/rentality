var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');

let rentalController = require('./app/rentals/rental-controller.js');

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

//------------------------------------------------------------
//tenMinutes = 60 * 1000 * 10;
const tenSecconds = 10000;

// setInterval(()=>{

// 	rentalController.updateIndex((newRentals)=>{
// 		console.log('scraped for new rentals, count: ' + newRentals.length);
// 	});

// },tenSecconds);

//------------------------------------------------------------

var port = process.env.PORT || 2222;
var router = express.Router();

// router.use(function(req, res, next) {
// 	next();
// });

//------------------------------------------------------------
router.get('/', function(req, res) {
	res.json({ message: 'you have been routed to the root route. they are coming to get you!' });
});

router.get('/update-rental-index', function(req, res){
	rentalController.updateIndex( newRentals => {

	    res.json({
	    	message: "update-rental-index success",
	    	newRentals: newRentals
	    });

	});
});

router.get('/rentals', (req, res)=>{
	rentalController.getAllRentals((rentals)=>{
		res.json(rentals);
	});
});

router.get('/stats', (req, res) => {
    res.sendfile('./index.html');
});

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app; //for testing
