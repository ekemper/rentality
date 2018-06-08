process.env.NODE_ENV = 'test';

let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let assert = chai.assert;

let postParser = require('../app/post-page-parser.js');
let testPostUrl = 'https://flagstaff.craigslist.org/apa/d/brand-new-renovation-house/6609763258.html';

describe('post-page-parser', () => {
	it('should extract post data (json) for a given a url', (done) => {

		postParser.parse(testPostUrl, (rentalPostData)=>{

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