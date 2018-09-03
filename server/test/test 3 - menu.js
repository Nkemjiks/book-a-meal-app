import chai from 'chai';
import chaiHttp from 'chai-http';
import timekeeper from 'timekeeper';
import server from '../app';
import mockData from './mock/mockData';

/** Test cases for creating the menu for the day
We are testing all input case time to make sure that our validations are working
and that we are getting the desired output
*/
const { expect } = chai;

const {
  customerLoginDetailsFirst,
  catererLoginDetailsSecond,
  addMealProd,
  addMealProdSec,
  addMealProdThird,
  updateMealProd,
  placeOrderDev,
  removeMealProd,
} = mockData;

let secondCatererToken;
let secondCatererId;
let firstCustomerToken;

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
  after((done) => {
    timekeeper.reset();
    done();
  });

  describe('Get menu when none has been created yet', () => {
    it(`It should return the message "The menu for today has not been set yet" 
  when a caterer tries to get the menu without creating one`, (done) => {
      chai.request(server)
        .get('/menu/caterer')
        .set({ authorization: secondCatererToken })
        .send(addMealProd)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('You have not created a menu yet');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return the message "The menu for today has not been set yet" 
  when a customer tries to get the menu when it has not been set`, (done) => {
      chai.request(server)
        .get('/menu')
        .set({ authorization: firstCustomerToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No menu available');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return the message "Menu does not exist" 
  when a caterer tries to remove a meal from the menu when it has not been set`, (done) => {
      chai.request(server)
        .put(`/menu/${removeMealProd.meals[0]}`)
        .set({ authorization: secondCatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Menu does not exist');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return the message "There are no meals in the menu" 
    when a customer tries to get the meals in an empty menu`, (done) => {
      chai.request(server)
        .get(`/menu/meal/${secondCatererId}`)
        .set({ authorization: firstCustomerToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('There are no meals in the menu');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return the message "No menu has been created yet" 
  when a customer tries to place an order when the menu has not been set`, (done) => {
      chai.request(server)
        .post('/orders')
        .set({ authorization: firstCustomerToken })
        .send(placeOrderDev)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No menu has been created yet');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
  });
  describe('Add meal to the menu', () => {
    it(`It should not create a menu if no meal is sent and 
    return the message "You have not provided any details"`, (done) => {
      chai.request(server)
        .post('/menu/')
        .set({ authorization: secondCatererToken })
        .send(addMealProdThird)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('You have not provided any details');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should not create a menu if a meal does not exist and 
    return the message "Some selected meals does not exist"`, (done) => {
      chai.request(server)
        .post('/menu/')
        .set({ authorization: secondCatererToken })
        .send(addMealProdSec)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Some selected meals does not exist');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it('It should add a new meal and return the message "Menu created"', (done) => {
      chai.request(server)
        .post('/menu/')
        .set({ authorization: secondCatererToken })
        .send(addMealProd)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('Menu created');
          expect(res.body).to.have.property('meals');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.meals[0]).to.equal('82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1');
          expect(res.body.meals[1]).to.equal(undefined);
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
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('Menu has been updated');
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('meals');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.meals[0]).to.equal('82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1');
          expect(res.body.meals[1]).to.equal('91f77b21-56ed-4260-a935-7dfed583bc4b');
          done();
        });
    });
  });
  describe('Remove meal from menu', () => {
    it(`It should return the message "This meal does not exist" 
  when a caterer tries to remove a meal that he didn't add from the menu`, (done) => {
      chai.request(server)
        .put(`/menu/${removeMealProd.meals[1]}`)
        .set({ authorization: secondCatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.not.have.property('data');
          expect(res.body.message).to.equal('This meal does not exist');
          done();
        });
    });
    it(`It should return the message "Menu has been updated" 
  when a caterer tries to remove a meal from the menu`, (done) => {
      chai.request(server)
        .put(`/menu/${removeMealProd.meals[0]}`)
        .set({ authorization: secondCatererToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('Menu has been updated');
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('meals');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.meals[0]).to.equal('82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1');
          expect(res.body.meals[1]).to.equal(undefined);
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
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.userId).to.equal('dcb5c503-ba35-4aed-810e-685b57a6c82b');
          expect(res.body.data.meals[0].name).to.equal('Potato Chips');
          expect(res.body.data.meals[0].price).to.equal(450);
          expect(res.body.data.meals[0].imageURL).to.equal('http://dummyimage.com/193x125.png/cc0000/ffffff');
          expect(res.body.data.meals[0].mealId).to.equal('82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1');
          expect(res.body.data.meals[1]).to.equal(undefined);
          done();
        });
    });
  });
  describe('Get menu for the day - Customer', () => {
    it(`It should return an object 
  containing the all menu that has been set`, (done) => {
      chai.request(server)
        .get('/menu')
        .set({ authorization: firstCustomerToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('count');
          expect(res.body.data[0].meals).to.equal(undefined);
          expect(res.body.data[0].catererId).to.equal('dcb5c503-ba35-4aed-810e-685b57a6c82b');
          expect(res.body.data[0].caterer.businessName).to.equal('Alex Meals');
          expect(res.body.data[0].caterer.businessAddress).to.equal('69977 Corscot Terrace');
          expect(res.body.data[0].caterer.logoURL).to.equal('https://res.cloudinary.com/dqsmurjpg/image/upload/v1527250018/hr2qcmm3pff6zlskxtnc.jpg');
          expect(res.body.data[1]).to.equal(undefined);
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
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('caterer');
          expect(res.body.data[0].name).to.equal('Potato Chips');
          expect(res.body.data[0].price).to.equal(450);
          expect(res.body.data[0].menuId).to.be.a('string');
          expect(res.body.data[0].mealId).to.equal('82a712ab-fd6e-4b68-bc63-c34f5f1ba7f1');
          expect(res.body.data[1]).to.equal(undefined);
          done();
        });
    });
  });
});
