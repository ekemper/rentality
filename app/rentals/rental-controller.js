'use strict'

const RssReader = require('../rss-reader.js');
const baseUrl = 'https://boulder.craigslist.org/search/apa?format=rss';
const rssReader = new RssReader(baseUrl);

const postParser = require('../post-page-parser.js');

const elasticSearch = require('elasticSearch');
const esClient = new elasticSearch.Client({
      host: 'localhost:9200',
      log: 'error'
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

		// we put this in a set timeout to avoid hitting craigslist too hard
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
						console.log('all done! : ' + Date.now());
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

			// once we have the latest post urls from
			// the rss feed, go scrape the pages
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

		this.esClient.create(params, (error, response) => {

			const str = "version conflict, document already exists";
			const documentExistsAlready = JSON.stringify(error).indexOf(str) !== -1;

			if(error && documentExistsAlready){
				response = "document already exists";
				error = null;
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

	getAllRentals(callback){

		this.esClient.search({
		  index: 'rentals'
		  /*q: query*/
		}, (error, response)=>{

			if(error){
				throw new Error(error);
			}

			callback(response);
		});
	}
}


module.exports = new RentalController();