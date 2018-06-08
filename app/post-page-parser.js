'use-strict'
var rp = require('request-promise');
var cheerio = require('cheerio');

class PostParser {
	constructor(){}

	getRawHtml(url, callback){

		var options = {
		    uri: url,
		    transform:(body)=>{
		        return cheerio.load(body);
		    }
		};

		rp(options)
		    .then(($)=>{
		        callback($);
		    })
		    .catch((err)=>{
		        throw new Error(err);
		    });
	}

	async parse(url){

		this.getRawHtml(url, ($)=>{

			var rentalPostData = {
		    	url: url,
		    	id: this.getPostIdFromUrl(url),
		    	price:$('.price').html(),
		        title:$("#titletextonly").text(),
		        images:[],
		        body:$("#postingbody").text(),
		        attributes:[],
		        crawldate: Date.now(),
		        latitude: $('#map').attr('data-latitude'),
		        longitude: $('#map').attr('data-longitude')
		    };

		    $('#thumbs').children().each((index, elem)=>{

		    	var imgSrc = $(elem).attr('href');

		        rentalPostData.images.push( imgSrc ) ;
		    })

		    $('.attrgroup').children().each((index, elem)=>{

		        var text = $(elem).text();

		        if(text.length>0){

		            rentalPostData.attributes.push( text ) ;
		        }
		    })

			return rentalPostData;
		});
	}


	getPostIdFromUrl(postUrl){

		var chunks = postUrl.split("/");

		var lastChunk = chunks[chunks.length-1];

		var postId = lastChunk.split('.')[0];

		return postId;
	}

}

module.exports = new PostParser();