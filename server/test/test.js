import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const expect = chai.expect;
chai.use(chaiHttp);

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
