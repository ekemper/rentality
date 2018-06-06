const express = require('express');

const router = express.Router();

const rentalController = require('./app/rentals/rental-controller.js');


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

module.exports = router;

