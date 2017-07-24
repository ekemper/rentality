process.env.NODE_ENV = 'test';

let chai = require('chai');
let should = chai.should();
let expect = chai.expect;

let rental = require('../app/rentals/rentalController.js');

var testDoc = {
	name: 'doodoo here',
	rooms: 25,
	price: 10000
};

	

describe('rental model', () => {
	it('should be able to create/index a new rental document', (done) => {
      


		rental.save(testDoc,(response, error)=>{
			if(error){
				throw Error(error);
			}

			console.log('response:' + response);
			response.should.equal(true);
			done();
		});


    });
});

