// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// let chai = require('chai');
// let should = chai.should();
// let expect = require('chai').expect;

// var elasticsearch = require('elasticsearch');
// esClient = new elasticsearch.Client({
//       host: 'localhost:9200',
//       log: 'trace'
//     });

// describe('elastic search', () => {

//     it('it should be able to ping the ES cluster', (done) => {
//       esClient.ping({requestTimeout: 30000}).then((response)=>{
//           response.should.equal(true);
//           done();
//         }, (error)=>{throw Error(error)});
//     });

//     it('the cluster should have an index called rentals', (done)=>{
//       var params = {
//         index:'rentals'
//       };
//       esClient.indices.exists(params).then((response)=>{
//         response.should.equal(true);
//         done();
//       }, (error)=>{throw Error(error)});
//     });

//     // it('should be able to index a new document', (done)=>{

//     //     var newDoc = {
//     //       index: 'myindex',
//     //       type: 'mytype',
//     //       id: '1',
//     //       body: {
//     //         title: 'Test 1',
//     //         tags: ['y', 'z'],
//     //         published: true,
//     //         published_at: '2013-01-01',
//     //         counter: 1
//     //       }
//     //     }

//     //     client.create(newDoc, function (error, response) {
//     //       // ...
//     //     });
//     // });
// });