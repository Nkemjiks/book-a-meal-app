import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models';
import mockData from './mock/mockData';

/** Test cases for adding a meal
We are testing all input case time to make sure that our validations are working
and that we are getting the desired output
*/

const { expect } = chai;

// Mock data imported from a userMockData
const {
  catererLoginDetailsFirst,
  validUserLoginDetailsFirst,
  customerLoginDetailsFirst,
  firstMeal,
  secondMeal,
  thirdMeal,
  fourthMeal,
  fifthMeal,
} = mockData;

let firstCatererToken;
let newcatererToken;
let customerToken;
chai.use(chaiHttp);

describe('Meal Controller', () => {
  before((done) => {
    chai.request(server)
      .post('/auth/login')
      .send(catererLoginDetailsFirst)
      .end((err, res) => {
        firstCatererToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(server)
      .post('/auth/login')
      .send(validUserLoginDetailsFirst)
      .end((err, res) => {
        newcatererToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(server)
      .post('/auth/login')
      .send(customerLoginDetailsFirst)
      .end((err, res) => {
        customerToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(server)
      .put('/meals/0692eb03-141d-4873-9035-2f4a9502a3cb')
      .set({ authorization: firstCatererToken })
      .send({
        name: 'Akara and pap',
      })
      .end(() => {
        done();
      });
  });
  before((done) => {
    models.meal
      .findById('0692eb03-141d-4873-9035-2f4a9502a3cb')
      .then((meal) => {
        meal
          .update({
            isDeleted: false,
          });
        done();
      });
  });
  describe('Add, modify or delete a new meal', () => {
    it('It should add a new meal and return the message "New meal added successfully"', (done) => {
      chai.request(server)
        .post('/meals/')
        .set({ authorization: firstCatererToken })
        .send(firstMeal)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('New meal added successfully');
          expect(res.body).to.have.property('data');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.name).to.equal('Jollof Rice with salad');
          expect(res.body.data.price).to.equal(200);
          expect(res.body.data.imageURL).to.equal('www.image.com/kdeu8dy');
          expect(res.body.data.userId).to.equal('0b685961-2c2c-4930-ad9a-e0daecce0e37');
          done();
        });
    });
    it(`It should return an error message "You don't have access to use this route"
    when you try to add a meal when you are a customer`, (done) => {
      chai.request(server)
        .post('/meals/')
        .set({ authorization: customerToken })
        .send(firstMeal)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('You don\'t have access to use this route');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return an error message "Please provide a valid meal name"
    when you try to add a meal with an empty name`, (done) => {
      chai.request(server)
        .post('/meals/')
        .set({ authorization: firstCatererToken })
        .send(secondMeal)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid meal name');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return an error message "Meal Name must be between 1 to 40 characters long"
    when you try to add a meal with a name with just 2 characters`, (done) => {
      chai.request(server)
        .post('/meals/')
        .set({ authorization: firstCatererToken })
        .send(thirdMeal)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Meal Name must be between 1 to 40 characters long');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return an error message "Please provide a valid meal price"
    when you try to add a meal with a price that contains alphabets`, (done) => {
      chai.request(server)
        .post('/meals/')
        .set({ authorization: firstCatererToken })
        .send(fourthMeal)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid meal price');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return an error message "Please provide a valid image URL"
    when you try to add a meal with a string as the image url`, (done) => {
      chai.request(server)
        .post('/meals/')
        .set({ authorization: firstCatererToken })
        .send(fifthMeal)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid image URL');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it('It should add a new meal but with a name that is already existing and return the message "Meal already exist"', (done) => {
      chai.request(server)
        .post('/meals/')
        .set({ authorization: firstCatererToken })
        .send(firstMeal)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Meal already exist');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it('It should get all the meals added by a caterer"', (done) => {
      chai.request(server)
        .get('/meals/')
        .set({ authorization: firstCatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[3]).to.equal(undefined);
          expect(res.body.data[0].id).to.be.a('string');
          expect(res.body.data[0].name).to.equal('Rice and Beans');
          expect(res.body.data[0].price).to.equal(450);
          expect(res.body.data[0].imageURL).to.equal('http://dummyimage.com/193x125.png/cc0000/ffffff');
          done();
        });
    });
    it('It should return a message for a caterer that has not added any meal', (done) => {
      chai.request(server)
        .get('/meals/')
        .set({ authorization: newcatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('You have not added any meal');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it('It should modify a meal added by a caterer', (done) => {
      chai.request(server)
        .put('/meals/0692eb03-141d-4873-9035-2f4a9502a3cb')
        .set({ authorization: firstCatererToken })
        .send({
          name: 'Moimoi and pap',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data.name).to.equal('Moimoi and pap');
          expect(res.body.data.price).to.equal(450);
          expect(res.body.data.imageURL).to.equal('http://dummyimage.com/193x125.png/cc0000/ffffff');
          done();
        });
    });
    it('It should not modify a meal added by a caterer if that name already exist', (done) => {
      chai.request(server)
        .put('/meals/0692eb03-141d-4873-9035-2f4a9502a3cb')
        .set({ authorization: firstCatererToken })
        .send({
          name: 'Moimoi and pap',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('A meal with this name already exist');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return 'meal not found' if a 
    caterer sends an id that does not exist in the database`, (done) => {
      chai.request(server)
        .put('/meals/d0b5e9d3-2665-4709-bc5a-b5b7cbd93034')
        .set({ authorization: firstCatererToken })
        .send({
          name: 'Moimoi and pap and milk',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Meal not found');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return 'You can not modify this meal'
    if a caterer trys to modify a meal added by another caterer`, (done) => {
      chai.request(server)
        .put('/meals/0692eb03-141d-4873-9035-2f4a9502a3cb')
        .set({ authorization: newcatererToken })
        .send({
          name: 'Moimoi and pap and milk',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('You can not modify this meal');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return 'This meal does not exist in the database' if a 
    caterer sends an id that does not exist in the database`, (done) => {
      chai.request(server)
        .delete('/meals/d0b5e9d3-2665-4709-bc5a-b5b7cbd93034')
        .set({ authorization: firstCatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('This meal does not exist in the database');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return 'You can not modify this meal'
    if a caterer trys to modify a meal added by another caterer`, (done) => {
      chai.request(server)
        .delete('/meals/0692eb03-141d-4873-9035-2f4a9502a3cb')
        .set({ authorization: newcatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('You are not authorized to delete this meal');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return 'Meal has been deleted successfully'
    if a caterer trys to modify a meal added by another caterer`, (done) => {
      chai.request(server)
        .delete('/meals/0692eb03-141d-4873-9035-2f4a9502a3cb')
        .set({ authorization: firstCatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Meal has been deleted successfully');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
  });
});
