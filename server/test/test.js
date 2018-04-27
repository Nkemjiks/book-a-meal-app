import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';


const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('Meal API', () => {
  describe('/POST Meal', () => {
    it('It should return a JSON response', (done) => {
      chai.request(server)
        .post('/api/v1/meals')
        .send({
          id: '6',
          name: 'Yam and egg',
          price: '500',
          image: 'www.image.com/hjw889w',
          isChecked: 'true',
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res).to.be.json;
          res.body.should.have.property('message').eql('Meal already exist');
          done();
        });
    });
    it('It should return a JSON response', (done) => {
      chai.request(server)
        .post('/api/v1/meals')
        .send({
          id: '11',
          name: 'Potato fries with chicken',
          price: '500',
          image: 'www.image.com/hjw889w',
          isChecked: 'false',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('/GET Meals', () => {
    it('it should GET all the meals', (done) => {
      chai.request(server)
        .get('/api/v1/meals')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('/PUT/:id Meal', () => {
    it('it should return a response 200', (done) => {
      chai.request(server)
        .put('/api/v1/meals/5')
        .send({
          name: 'Potato fries with pepsi',
          price: '1800',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          res.body.should.have.property('message').eql('Meal added successfully');
          done();
        });
    });
    it('it should return a response "No meal content"', (done) => {
      chai.request(server)
        .put('/api/v1/meals/5')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          done();
        });
    });
  });
  describe('/DELETE/:id Meal', () => {
    it('it should return an error if the given meal does not exist', (done) => {
      chai.request(server)
        .delete('/api/v1/meals/8')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          res.body.should.have.property('message').eql('Meal does not exist');
          done();
        });
    });
  });
});
describe('Menu API', () => {
  describe('/POST Menu', () => {
    it('It should return a JSON response and a status of 200', (done) => {
      chai.request(server)
        .post('/api/v1/menu')
        .send({
          id: '6',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          done();
        });
    });
    it('It should return a JSON response and a status of 204', (done) => {
      chai.request(server)
        .post('/api/v1/menu')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
  describe('/GET Menu', () => {
    it('it should GET the menu for the day', (done) => {
      chai.request(server)
        .get('/api/v1/menu')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
describe('Order API', () => {
  describe('/POST Order', () => {
    it('It should return a message and a status of 206', (done) => {
      chai.request(server)
        .post('/api/v1/order')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(206);
          expect(res).to.be.json;
          res.body.should.have.property('message').eql('Order placement data is incomplete');
          done();
        });
    });
    it('It should return a JSON response and a status of 200', (done) => {
      chai.request(server)
        .post('/api/v1/order')
        .send({
          id: '5',
          customerName: 'Hugh Jackman',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('/GET order', () => {
    it('it should GET all order', (done) => {
      chai.request(server)
        .get('/api/v1/order')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('/PUT/:id Order', () => {
    it('it should a status of 200 and an object', (done) => {
      chai.request(server)
        .put('/api/v1/order/5')
        .send({
          add: 'true',
          delete: 'true',
          addMealName: 'Potato fries',
          deleteMealName: 'Yam and fish with vegetable',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
