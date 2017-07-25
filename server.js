var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');

let rentalController = require('./app/rentals/rental-controller.js');

app.use(morgan('dev')); // log requests to the console

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//don't show the log when it is test
if(process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//------------------------------------------------------------
tenMinutes = 60 * 1000 * 10;

setInterval(()=>{
	rentalController.updateIndex((newRentals)=>{
		console.log('scraped for new rentals: ' + newRentals);
	});
},tenMinutes);
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
	rentalController.updateIndex((newRentals)=>{

	    res.json({
	    	message: "update-rental-index success",
	    	newRentals: newRentals
	    });
	
	});
});

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app; //for testing
