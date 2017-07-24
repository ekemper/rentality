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

		this.esClient.create(params, (error, response)=>{

			if(error){
				// console.log('document create error: ' +error);
				var str = "version conflict, document already exists";

				if(JSON.stringify(error).indexOf(str) !== -1){
					response = "document already exists";
					error = null;
				}
			}

			callback(error, response)
		});
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