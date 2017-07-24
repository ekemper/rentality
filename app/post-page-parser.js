'use-strict'
var rp = require('request-promise');
var cheerio = require('cheerio');

class PostParser {
	constructor(url){
		this.url = url;
		this.rentalPostData = {};
	}

	getRawHtml(callback){

		var options = {
		    uri: this.url,
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

	parse(callback){

		this.getRawHtml(($)=>{

			this.rentalPostData = {
		    	url: this.url,
		    	id: this.getPostIdFromUrl(this.url),
		    	price:$('.price').html(),
		        title:$("#titletextonly").text(),
		        images:[],
		        body:$("#postingbody").text(),
		        attributes:[],
		        crawldate: Date.now()
		    };

		    $('#thumbs').children().each((index, elem)=>{

		    	var imgSrc = $(elem).attr('href');

		        this.rentalPostData.images.push( imgSrc ) ;
		    })

		    $('.attrgroup').children().each((index, elem)=>{

		        var text = $(elem).text();

		        if(text.length>0){

		            this.rentalPostData.attributes.push( text ) ;                    
		        }
		    })

			callback(this.rentalPostData);
		})
	}


	getPostIdFromUrl(postUrl){

		var chunks = postUrl.split("/");

		var lastChunk = chunks[chunks.length-1];

		var postId = lastChunk.split('.')[0];

		return postId;
	}

}

module.exports = PostParser;