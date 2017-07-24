process.env.NODE_ENV = 'test';

let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let assert = chai.assert;

let PostParser = require('../app/post-page-parser.js');
let testPostUrl = 'http://flagstaff.craigslist.org/apa/6217100852.html';
let parser = new PostParser(testPostUrl);

describe('post-page-parser', () => {
	it('should extract post data (json) for a given a url', (done) => {
      
		parser.parse((rentalPostData)=>{
			// console.log('rentalPostData : ' + JSON.stringify(rentalPostData,null,4));

			assert.exists(rentalPostData.url, 'url is neither `null` nor `undefined`');
			assert.exists(rentalPostData.id, 'id is neither `null` nor `undefined`');
			assert.exists(rentalPostData.price, 'price is neither `null` nor `undefined`');
			assert.exists(rentalPostData.title, 'title is neither `null` nor `undefined`');

			expect(rentalPostData.images).to.be.an('array');
			assert.exists(rentalPostData.body, 'body is neither `null` nor `undefined`');

			expect(rentalPostData.attributes).to.be.an('array');

			assert.exists(rentalPostData.crawldate, 'crawldate is neither `null` nor `undefined`');

			done();
		});
    });
});