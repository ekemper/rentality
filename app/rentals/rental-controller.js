'use strict'
let rssReader = require('../rss-reader.js');
let postParser = require('../post-page-parser.js');


var elasticSearch = require('elasticSearch');
var esClient = new elasticSearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });

class RentalController{
	constructor(){
		this.esClient = esClient;
	    this.postPageQueue = [];
	    this.newDocs = [];
	}

    //http://mikelam.azurewebsites.net/how-to-make-synchronous-http-requests-in-node-js/

	synchronousScrape() {

		var url = this.postPageQueue.pop()["rdf:resource"];

		setTimeout(()=>{

			postParser.parse(url, (postPageData)=>{

				this.newDocs.push(postPageData); 

				this.create(postPageData, (error, response)=>{

					if(error){
						throw Error(error);
					}

					if(this.postPageQueue.length){

						this.synchronousScrape();

					} else {
						console.log('all done!');
						this.updateIndexCallback(this.newDocs);
					}
				});
			});

		},500); 
	}

	updateIndex(callback){

		this.updateIndexCallback = callback;

		rssReader.getLatestFromFeed((items)=>{
			this.postPageQueue = items;
			this.synchronousScrape();
		});
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

			callback(error, response);
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