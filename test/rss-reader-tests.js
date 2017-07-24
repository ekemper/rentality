process.env.NODE_ENV = 'test';

let chai = require('chai');
let should = chai.should();
let expect = chai.expect;

let rssReader = require('../app/rss-reader.js');

describe('getLatestFromFeed', () => {
	it('should get latest from feed', (done) => {
		rssReader.getLatestFromFeed((items)=>{
		    //console.log('items: ' + JSON.stringify(items,null,4));
			expect(items).to.be.an('array');
			done();
		});
    });
});

