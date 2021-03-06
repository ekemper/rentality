'use-strict'

var rp = require('request-promise');
var xmlParser = require('xml2json');

class RssReader{
	constructor(baseUrl){
		this.baseUrl = baseUrl;
	}

	getLatestFromFeed(callback){

		var options = {
		    uri: this.baseUrl,
		    qs: {},
		    headers: {
		        'User-Agent': 'Request-Promise'
		    },
		    json: true, // Automatically parses the JSON string in the response
		    transform: function(responseBody){
		    	var response = JSON.parse(xmlParser.toJson(responseBody));
				var items = response['rdf:RDF']['channel']['items']['rdf:Seq']['rdf:li'];
				return items;
		    }
		};

		rp(options).then(callback).catch(this.handleError);
	}

	handleNewFeed(items){
		console.log('items.length: ' + items.length);
	}

	handleError(err){
		throw new Error(err);
	}
}

module.exports = RssReader;