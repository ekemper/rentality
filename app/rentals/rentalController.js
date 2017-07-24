'use strict'

var elasticSearch = require('elasticSearch');

class Rental{
	constructor(elasticSearch){
		this.elasticSearch = elasticSearch;
	}

	save(newRental, callback){

		var newDoc = {
		  index: 'rentals',
		  type: 'default',
		  id: '1',
		  body: {
		    title: 'Test 1',
		    tags: ['y', 'z'],
		    published: true,
		    published_at: '2013-01-01',
		    counter: 1
		  }
		}

		this.elasticSearch.create(newDoc, (error, response)=>{
			callback(error, response);
		});

	}
}

