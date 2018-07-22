import chai from 'chai';
import chaiHttp from 'chai-http';
import timekeeper from 'timekeeper';
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
  addMealProd,
  updateMealProd,
  placeOrderDev,
  removeMealProd,
} = otherMockData;

let secondCatererToken;
let secondCatererId;
let firstCustomerToken;

const date = new Date().toDateString();

chai.use(chaiHttp);

describe('Menu Controller', () => {
  before((done) => {
    const time = new Date(Date.now()).setHours(12);
    timekeeper.freeze(time);
    done();
  });
  before((done) => {
    chai.request(server)
      .post('/auth/login')
      .send(catererLoginDetailsSecond)
      .end((err, res) => {
        secondCatererToken = res.body.token;
        secondCatererId = res.body.data.id;
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
        truncate: { cascade: true },
      })
      .then(() => {
        done();
      });
  });
  after((done) => {
    timekeeper.reset();
    done();
  });

  describe('Get menu when when none has been created yet', () => {
    it(`It should return the message "The menu for today has not been set yet" 
  when a caterer tries to get the menu without creating one`, (done) => {
      chai.request(server)
        .get('/menu/caterer')
        .set({ authorization: secondCatererToken })
        .send(addMealProd)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('You have not created a menu yet');
          done();
        });
    });
    it(`It should return the message "The menu for today has not been set yet" 
  when a customer tries to get the menu when it has not been set`, (done) => {
      chai.request(server)
        .get('/menu/0')
        .set({ authorization: firstCustomerToken })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('No menu available');
          done();
        });
    });
    it(`It should return the message "Menu does not exist" 
  when a caterer tries to remove a meal from the menu when it has not been set`, (done) => {
      chai.request(server)
        .put(`/menu/${removeMealProd.meals[0]}`)
        .set({ authorization: secondCatererToken })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('Menu does not exist');
          done();
        });
    });
    it(`It should return the message "There are no meals in the menu" 
    when a customer tries to get the meals in an empty menu`, (done) => {
      chai.request(server)
        .get(`/menu/meal/${secondCatererId}`)
        .set({ authorization: firstCustomerToken })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('There are no meals in the menu');
          done();
        });
    });
    it(`It should return the message "The menu for today has not been set yet" 
  when a customer tries to place an order when the menu has not been set`, (done) => {
      chai.request(server)
        .post('/orders')
        .set({ authorization: firstCustomerToken })
        .send(placeOrderDev)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('No menu has been created yet');
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
  describe('Remove meal from menu', () => {
    it(`It should return the message "Menu has been updated" 
  when a caterer tries to remove a meal from the menu`, (done) => {
      chai.request(server)
        .put(`/menu/${removeMealProd.meals[0]}`)
        .set({ authorization: secondCatererToken })
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
        .get('/menu/0')
        .set({ authorization: firstCustomerToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('data');
          done();
        });
    });
  });
  describe('Get meals in a caterer menu for the day - Customer', () => {
    it(`It should return an object 
  containing the menu set for the day`, (done) => {
      chai.request(server)
        .get(`/menu/meal/${secondCatererId}`)
        .set({ authorization: firstCustomerToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('data');
          done();
        });
    });
  });
});
