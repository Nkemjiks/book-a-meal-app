import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect';
import server from '../app';
import models from '../models';
import userMockData from './mock/userMockData';
import mealMockData from './mock/mealMockData';

/** Test cases for adding a meal
We are testing all input case time to make sure that our validations are working
and that we are getting the desired output
*/

// Mock data imported from a userMockData
const {
  catererLoginDetailsFirst,
  catererLoginDetailsSecond,
  validUserLoginDetailsFirst,
} = userMockData;

const {
  firstMeal,
} = mealMockData;

let firstCatererToken;
let secondCatererToken;
let newcatererToken;
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
      .send(catererLoginDetailsSecond)
      .end((err, res) => {
        secondCatererToken = res.body.token;
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
    models.meal
      .destroy({
        where: {
          name: 'Jollof Rice with salad',
        },
      })
      .then(() => {
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
      .end((err, res) => {
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
  describe('Add a new meal', () => {
    // This will delete these to email addresses so we can save the information afresh
    it('It should add a new meal and return the message "New meal added successfully"', (done) => {
      chai.request(server)
        .post('/meals/')
        .set({ authorization: firstCatererToken })
        .send(firstMeal)
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('data');
          expect(res.body.message).toEqual('New meal added successfully');
          done();
        });
    });
    it('It should add a new meal but with a name that is already existing and return the message "Meal already exist"', (done) => {
      chai.request(server)
        .post('/meals/')
        .set({ authorization: firstCatererToken })
        .send(firstMeal)
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.message).toEqual('Meal already exist');
          done();
        });
    });
    it('It should get all the meals added by a caterer"', (done) => {
      chai.request(server)
        .get('/meals/caterer')
        .set({ authorization: firstCatererToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('data');
          done();
        });
    });
    it('It should return a message for a caterer that has not added any meal', (done) => {
      chai.request(server)
        .get('/meals/caterer')
        .set({ authorization: newcatererToken })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('You have not added any meal');
          done();
        });
    });
    it('It should get all the meals added by all caterers in the database', (done) => {
      chai.request(server)
        .get('/meals/')
        .set({ authorization: newcatererToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('data');
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
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('data');
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
          expect(res.status).toEqual(409);
          expect(res.body.message).toEqual('A meal with this name already exist');
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
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('Meal not found');
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
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual('You can not modify this meal');
          done();
        });
    });
    it(`It should return 'This meal does not exist in the database' if a 
    caterer sends an id that does not exist in the database`, (done) => {
      chai.request(server)
        .delete('/meals/d0b5e9d3-2665-4709-bc5a-b5b7cbd93034')
        .set({ authorization: firstCatererToken })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('This meal does not exist in the database');
          done();
        });
    });
    it(`It should return 'You can not modify this meal'
    if a caterer trys to modify a meal added by another caterer`, (done) => {
      chai.request(server)
        .delete('/meals/0692eb03-141d-4873-9035-2f4a9502a3cb')
        .set({ authorization: newcatererToken })
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.message).toEqual('You are not authorized to delete this meal');
          done();
        });
    });
    it(`It should return 'Meal has been deleted successfully'
    if a caterer trys to modify a meal added by another caterer`, (done) => {
      chai.request(server)
        .delete('/meals/0692eb03-141d-4873-9035-2f4a9502a3cb')
        .set({ authorization: firstCatererToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Meal has been deleted successfully');
          done();
        });
    });
  });
});