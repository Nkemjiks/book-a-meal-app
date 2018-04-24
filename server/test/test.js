const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHTTP);

describe('Server', () => {
  it('It should return a status of 200', () => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });
  it('It should return a JSON response', () => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.be.json;
      });
  });
});
