const express = require('express');

const router = express.Router();

const rentalController = require('./app/rentals/rental-controller.js');


router.get('/', function(req, res) {
	res.json({ message: 'you have been routed to the root route. they are coming to get you!' });
});

router.get('/stats', (req, res) => {
    res.sendfile(__dirname + '/front-end/dist/index.html');
    //app.use(serveStatic(__dirname + "/dist"));
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



// router.use(function(req, res, next) {
// 	next();
// });
//------------------------------------------------------------
// router.get('/', function(req, res) {
// 	res.json({ message: 'you have been routed to the root route. they are coming to get you!' });
// });
//------------------------------------------------------------
// app.get('/van-search', function(req, res) {
//     res.sendfile(path.join(__dirname + '/'+ 'van-search' +'.html'));
// });

// //------------------------------------------------------------
// router.get('/crawl', function(req, res) {

// 	var crawl = new Crawler();

// 	var searchUrl = "https://phoenix.craigslist.org/search/cta?query=van";

// 	crawl.scrapeForPosts(searchUrl, function(response){

// 		res.json({
// 			note : ' this is a test of the method : crawl.scrapeForPosts()',
// 			message: response
// 		});
// 	});
// });
// //------------------------------------------------------------
// router.get('/get-search-url-set', function(req, res){

// 	var urlMan = new UrlManager();

// 	urlMan.getSearchResultUrlSet(function(){

// 		res.json({
// 			note: 'this is a test of the method : urlMan.getSearchResultUrlSet()',
// 			searchResultPageUrls: urlMan.searchResultPageUrls
// 		});
// 	})
// })
// //------------------------------------------------------------
// router.get('/get-vanposts', function(req, res){

// 	var findVans = new FindVans();

// 	findVans.getVanPostsUrls(function(response){

// 		res.json({
// 			note : ' this is a  test : finding and indexing van posts!!',
// 			message: response
// 		});

// 	})
// });
// //------------------------------------------------------------

// router.get('/init-vanposts-index', function(req, res){

// 	esi.initIndex(function(indexInfoResponse){
// 		console.log(JSON.stringify(indexInfoResponse,null,4));
// 		console.log('initialised the vans index');
// 		res.json({
// 			note : 'initialized the vans index',
// 			message: indexInfoResponse
// 		});
// 	})
// });


