'use strict'

var elasticSearch = require('elasticSearch');
var esClient = new elasticSearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
class RentalController{
	constructor(){
		this.esClient = esClient;
	}

	create(newRental, callback){

		let params = {
		  index: 'rentals',
		  type: 'default',
		  id: newRental.id,
		  body: newRental
		}

		this.esClient.create(params, callback);
	}

	delete(documentId, callback){
		let params = {
		  index: 'rentals',
		  type: 'default',
		  id: documentId
		}

		this.esClient.delete(params, callback);
	}
}


module.exports = new RentalController();