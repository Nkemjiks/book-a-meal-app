import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const  { expect } = chai.expect;
chai.use(chaiHttp);

describe('Server', () => {
  it('It should return a JSON response', () => {
    chai.request(server)
      .post('/api/v1/meals')
      .send({
        id: 5,
        name: 'Yam and egg',
        price: 500,
        image: 'www.image.com/hjw889w',
        isChecked: true,
      })
      .end((err, res) => {
        expect(res).to.be.json;
      });
  });
});
