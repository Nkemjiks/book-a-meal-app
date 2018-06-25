import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect';
import server from '../app';
import models from '../models';
import userMockData from './mock/userMockData';
import otherMockData from './mock/otherMockData';

/** Test cases for creating the menu for the day
We are testing all input case time to make sure that our validations are working
and that we are getting the desired output
*/

const {
  customerLoginDetailsFirst,
  catererLoginDetailsSecond,
} = userMockData;

const {
  addMealDev,
  addMealProd,
  updateMealDev,
  updateMealProd,
  removeMealDev,
  removeMealProd,
  placeOrderDev,
} = otherMockData;

let secondCatererToken;
let firstCustomerToken;

const date = new Date().toDateString();

chai.use(chaiHttp);

describe('Menu Controller', () => {
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
      .send(customerLoginDetailsFirst)
      .end((err, res) => {
        firstCustomerToken = res.body.token;
        done();
      });
  });
  before((done) => {
    models.menu
      .destroy({
        where: {
          date,
        },
      })
      .then(() => {
        done();
      });
  });
  describe('Get menu and delete meal from the menu when it has not been set', () => {
    it(`It should return the message "The menu for today has not been set yet" 
  when a caterer tries to get the menu without creating one`, (done) => {
      chai.request(server)
        .get('/menu/caterer')
        .set({ authorization: secondCatererToken })
        .send(addMealProd)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('The menu for today has not been set yet');
          done();
        });
    });
    it(`It should return the message "The menu for today has not been set yet" 
  when a customer tries to get the menu when it has not been set`, (done) => {
      chai.request(server)
        .get('/menu/customer')
        .set({ authorization: firstCustomerToken })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('The menu for today has not been set yet');
          done();
        });
    });
    it(`It should return the message "The menu for today has not been set yet" 
  when a customer tries to place an order when the menu has not been set`, (done) => {
      chai.request(server)
        .post('/orders/')
        .set({ authorization: firstCustomerToken })
        .send(placeOrderDev)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('The menu for today has not been set yet');
          done();
        });
    });
  });
  describe('Add meal to the menu', () => {
    it('It should add a new meal and return the message "Menu created"', (done) => {
      chai.request(server)
        .post('/menu/')
        .set({ authorization: secondCatererToken })
        .send(addMealProd)
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('data');
          expect(res.body.message).toEqual('Menu created');
          done();
        });
    });
  });
  describe('Update the menu', () => {
    it('It should update the exisiting menu and return the message "Menu has been updated"', (done) => {
      chai.request(server)
        .post('/menu/')
        .set({ authorization: secondCatererToken })
        .send(updateMealProd)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('data');
          expect(res.body.message).toEqual('Menu has been updated');
          done();
        });
    });
  });
  describe('Get menu for the day - Caterer', () => {
    it(`It should return an object 
  containing the menu set for the day by the caterer`, (done) => {
      chai.request(server)
        .get('/menu/caterer')
        .set({ authorization: secondCatererToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('data');
          done();
        });
    });
  });
  describe('Get menu for the day - Customer', () => {
    it(`It should return an object 
  containing the menu set for the day`, (done) => {
      chai.request(server)
        .get('/menu/customer')
        .set({ authorization: firstCustomerToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('data');
          done();
        });
    });
  });
});
