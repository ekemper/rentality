//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = require('chai').expect

chai.use(chaiHttp);
 
describe('api root:', () => {
    it('it should return a simple message', (done) => {
      chai.request(server)
          .get('/')
          .end((err, res) => {
              if(err) throw new Error(err);
              let text = JSON.parse(res.text);
              //console.log('res: ' + JSON.stringify(res,null,4));
              res.status.should.equal(200);
              text.message.should.equal("you have been routed to the root route. they are coming to get you!");
          
              done();
          });

    });
});

  