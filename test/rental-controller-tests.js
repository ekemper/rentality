process.env.NODE_ENV = 'test';

let chai = require('chai');
let should = chai.should();
let expect = chai.expect;

let rentalController = require('../app/rentals/rental-controller.js');

var testDoc = {
    "url": "http://flagstaff.craigslist.org/apa/6217100852.html",
    "id": "testDocId",
    "price": "$1350",
    "title": "Not just a rental but it's home! Cottonwood Home",
    "images": [
        "https://images.craigslist.org/00X0X_kj5pWD8PiHd_600x450.jpg",
        "https://images.craigslist.org/00Q0Q_8AFQwhLsyTC_600x450.jpg",
        "https://images.craigslist.org/00404_jPatCVqhEMu_600x450.jpg",
        "https://images.craigslist.org/00B0B_ghQ22HZCGAZ_600x450.jpg"
    ],
    "body": "this is the description of the rental",
    "attributes": [
        "3BR / 2Ba",
        "1332ft2",
        "available aug 5",
        "house",
        "w/d in unit",
        "no smoking",
        "detached garage"
    ],
    "crawldate": 1500924447787
};

describe('rental-controller', () => {

	it('should be able to create/index a new rental document', (done) => {
      
		rentalController.create(testDoc,(error, response)=>{
			if(error){
				throw Error(error);
			}
			//console.log('new rental create response:' + JSON.stringify(response,null,4));
			response._id.should.equal("testDocId");
			done();
		});
    });

    it('should be able to gracesully handle the case when a document already exists in the index', (done) => {
      
		rentalController.create(testDoc,(error, response)=>{
			if(error){
				throw Error(error);
			}
			// console.log('duplicate rental create response:' + JSON.stringify(response,null,4));
			response.should.equal("document already exists");
			done();
		});
    });

	it('should be able to delete a rental document by id', (done) => {
		rentalController.delete(testDoc.id, (error, response) => { 
			// console.log('rentalController remove response: ' + JSON.stringify(response));
			response._id.should.equal("testDocId");
			response.result.should.equal("deleted");

			done();         
		});
	});

});

