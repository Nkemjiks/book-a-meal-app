import chai from 'chai';
import chaiHttp from 'chai-http';
import timekeeper from 'timekeeper';
import server from '../app';
import models from '../models';
import mockData from './mock/mockData';

/** Test cases for creating the Order for the day
We are testing all input case time to make sure that our validations are working
and that we are getting the desired output
*/
const { expect } = chai;

const {
  customerLoginDetailsFirst,
  customerLoginDetailsSecond,
  catererLoginDetailsSecond,
  placeOrderProd,
  modifyOrderProd,
  placeOrderProdSec,
  placeOrderProdThird,
  placeOrderProdFourth,
} = mockData;

let secondCatererToken;
let firstCustomerToken;
let secondCustomerToken;
let orderId;

chai.use(chaiHttp);

describe('Order Controller', () => {
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
    chai.request(server)
      .post('/auth/login')
      .send(customerLoginDetailsSecond)
      .end((err, res) => {
        secondCustomerToken = res.body.token;
        done();
      });
  });
  before((done) => {
    models.order
      .destroy({
        where: {},
        truncate: true,
      })
      .then(() => {
        done();
      });
  });
  after((done) => {
    timekeeper.reset();
    done();
  });

  describe('Get all Orders - Caterer', () => {
    it(`It should return the message "You don't have any order yet" 
  when a caterer tries to get the order for that day when there is none`, (done) => {
      chai.request(server)
        .get('/orders/caterer')
        .set({ authorization: secondCatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('You don\'t have any order yet');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('totalSales');
          done();
        });
    });
  });
  describe('Get my Orders - Customer', () => {
    it(`It should return the message "You have not placed any order yet" 
  when a customer tries to get all orders without setting one`, (done) => {
      chai.request(server)
        .get('/orders/customer')
        .set({ authorization: secondCustomerToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('You have not placed any order yet');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('totalExpenses');
          done();
        });
    });
  });
  describe('Modify an order', () => {
    it(`It should return the message "Order not found" 
  when a customer wants to modify an order`, (done) => {
      chai.request(server)
        .put('/orders/d65a1b90-ea1c-424c-a0d0-3fe7769a5b54')
        .set({ authorization: secondCustomerToken })
        .send(modifyOrderProd)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Order not found');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
  });
  describe('Place an order', () => {
    it(`It should return the message "Order Placed successfully" 
  when a customer places an order`, (done) => {
      chai.request(server)
        .post('/orders')
        .set({ authorization: secondCustomerToken })
        .send(placeOrderProd)
        .end((err, res) => {
          orderId = res.body.data.id;
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('Order Placed successfully');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.userId).to.equal('1acb0e56-8839-4d05-b9a4-216643a98f35');
          expect(res.body.data.mealIds[0].mealId).to.equal('82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1');
          expect(res.body.data.mealIds[0].quantity).to.equal(5);
          done();
        });
    });
    it(`It should return the message "You have not provided any details" 
  when a customer places an order without sending meals`, (done) => {
      chai.request(server)
        .post('/orders')
        .set({ authorization: secondCustomerToken })
        .send(placeOrderProdSec)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.not.have.property('data');
          expect(res.body.message).to.equal('You have not provided any details');
          done();
        });
    });
    it(`It should return the message "Provide a valid quantity value" 
  when a customer places an order with a quantity that is a string`, (done) => {
      chai.request(server)
        .post('/orders')
        .set({ authorization: secondCustomerToken })
        .send(placeOrderProdThird)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.not.have.property('data');
          expect(res.body.message).to.equal('Provide a valid quantity value');
          done();
        });
    });
    it(`It should return the message "Please select a quantity that is less than or equal to 20" 
  when a customer places an order with a quantity that is above 20`, (done) => {
      chai.request(server)
        .post('/orders')
        .set({ authorization: secondCustomerToken })
        .send(placeOrderProdFourth)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.not.have.property('data');
          expect(res.body.message).to.equal('Please select a quantity that is less than or equal to 20');
          done();
        });
    });
  });
  describe('Get all Orders - Caterer', () => {
    it(`It should return the message "You have the following orders" 
  when a caterer tries to get all orders for the day`, (done) => {
      chai.request(server)
        .get('/orders/caterer')
        .set({ authorization: secondCatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('totalSales');
          expect(res.body.message).to.equal('You have the following orders');
          done();
        });
    });
  });
  describe('Get all Orders - Caterer', () => {
    it(`It should return the message "You have the following orders" 
  when a caterer tries to get all orders that has ever been made`, (done) => {
      chai.request(server)
        .get('/orders/caterer/all')
        .set({ authorization: secondCatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('totalSales');
          expect(res.body.message).to.equal('You have the following orders');
          expect(res.body.data[0].id).to.be.a('string');
          expect(res.body.data[0].userId).to.equal('1acb0e56-8839-4d05-b9a4-216643a98f35');
          done();
        });
    });
  });
  describe('Get all Orders - Customer', () => {
    it(`It should return the message "You have placed the following orders" 
  when a customer tries to get all orders`, (done) => {
      chai.request(server)
        .get('/orders/customer')
        .set({ authorization: secondCustomerToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('totalExpenses');
          expect(res.body.message).to.equal('You have placed the following orders');
          expect(res.body.data[0].id).to.be.a('string');
          expect(res.body.data[0].userId).to.equal('1acb0e56-8839-4d05-b9a4-216643a98f35');
          expect(res.body.data[0].meals).to.be.a('array');
          expect(res.body.data[0].deliveryAddress).to.equal(null);
          done();
        });
    });
  });
  describe('Modify an order', () => {
    it(`It should return the message "Order Modified successfully" 
  when a customer wants to modify an order`, (done) => {
      chai.request(server)
        .put(`/orders/${orderId}`)
        .set({ authorization: secondCustomerToken })
        .send(modifyOrderProd)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('Order Modified successfully');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.userId).to.equal('1acb0e56-8839-4d05-b9a4-216643a98f35');
          expect(res.body.data.mealIds[0].mealId).to.equal('82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1');
          expect(res.body.data.mealIds[0].quantity).to.equal(8);
          done();
        });
    });
  });
  describe('Modify an order', () => {
    it(`It should return the message "You can not modify this order" 
  when a customer wants to modify another customer's order`, (done) => {
      chai.request(server)
        .put(`/orders/${orderId}`)
        .set({ authorization: firstCustomerToken })
        .send(modifyOrderProd)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('You can not modify this order');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
  });
});
