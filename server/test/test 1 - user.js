import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models';
import mockData from './mock/mockData';

/** Test cases for user signup
We are testing all input case time to make sure that our validations are working
and that we are getting the desired output
*/

const { expect } = chai;

// Mock data imported from a userMockData
const {
  validUserDetailFirst,
  invalidUserDetailEmailSecond,
  invalidUserDetailEmailThird,
  emptyUserDetail,
  invalidUserDetailNameThird,
  invalidUserDetailPhoneNumberFirst,
  invalidUserDetailPhoneNumberSecond,
  invalidUserDetailPasswordFirst,
  invalidUserDetailPasswordSecond,
  invalidUserDetailAddressSecond,
  invalidUserDetailAddressThird,
  validUserLoginDetailsFirst,
  invalidUserLoginPasswordSecond,
  invalidUserLoginDetailPasswordFirst,
  invalidUserLoginDetailsThird,
  nonExistingUserFirst,
  updateRoleFirst,
  updateRoleSecond,
  updateRoleThird,
  updateRoleFourth,
} = mockData;

let firstCustomerToken;
let catererToken;
chai.use(chaiHttp);

describe('User Controller', () => {
  describe('User Signup', () => {
    // This will delete the account with this email addresses so we can save the information afresh
    before((done) => {
      models.user
        .destroy({
          where: {
            email: 'rebeccadeo@gmail.com',
          },
        })
        .then(() => {
        });
      done();
    });
    it('It should signup a user and return the message "User successfully created"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(validUserDetailFirst)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User successfully created');
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.fullName).to.equal('Rebecca Deo');
          expect(res.body.data.email).to.equal('rebeccadeo@gmail.com');
          expect(res.body.data.phoneNumber).to.equal('078920839');
          expect(res.body.data.address).to.equal('43, Agege Road, Lagos');
          expect(res.body.data.role).to.equal('customer');
          expect(res.body.data.businessName).to.equal(null);
          expect(res.body.data.logoURL).to.equal(null);
          expect(res.body.data.businessAddress).to.equal(null);
          done();
        });
    });
    it(`It should return a message "A User already exist with this email address" 
    when you signup with an existing email address`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(validUserDetailFirst)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('A User already exist with this email address');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return a message "Please provide a valid name" 
    when you signup with empty input fields`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(emptyUserDetail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid name');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid name" 
    when you signup with a name that conatins numbers`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailNameThird)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid name');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid email address" 
    when the @ character isn't present`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailEmailSecond)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid email address');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid email address" 
    when '.com' is missing`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailEmailThird)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid email address');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid phone number" 
    when you pass a phone number with alphabets in it`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPhoneNumberFirst)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid phone number');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid phone number"
     when the number contains special characters`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPhoneNumberSecond)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid phone number');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid password" 
    if password contains '<>'`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPasswordFirst)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid password');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid password"
     if the password contains spaces`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPasswordSecond)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid password');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid address"
     if address contains '<>'`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailAddressSecond)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid address');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid address" 
    if address contains '='`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailAddressThird)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid address');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
  });

  describe('User Signin', () => {
    it(`It should return a message "Signin successful" 
    when you signin with a valid information`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(validUserLoginDetailsFirst)
        .end((err, res) => {
          firstCustomerToken = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Signin successful');
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.fullName).to.equal('Rebecca Deo');
          expect(res.body.data.email).to.equal('rebeccadeo@gmail.com');
          expect(res.body.data.phoneNumber).to.equal('078920839');
          expect(res.body.data.address).to.equal('43, Agege Road, Lagos');
          expect(res.body.data.role).to.equal('customer');
          expect(res.body.data.businessName).to.equal(null);
          expect(res.body.data.logoURL).to.equal(null);
          expect(res.body.data.businessAddress).to.equal(null);
          done();
        });
    });
    it(`It should return a message "Email or password is incorrect"
     if you input an incorrect password`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginPasswordSecond)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Email or password is incorrect');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Account does not exist. Please signup to continue" 
    if you input an email address that does not exist in the database`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(nonExistingUserFirst)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Account does not exist. Please signup to continue');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid email address"
     if the email does not contain @ or .com`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailsThird)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid email address');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid password"
     if the password contains <>`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailPasswordFirst)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid password');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
  });

  describe('User Role Update', () => {
    afterEach((done) => {
      chai.request(server)
        .post('/auth/login')
        .send(validUserLoginDetailsFirst)
        .end((err, res) => {
          catererToken = res.body.token;
          done();
        });
    });
    it(`It should update the role of a user to caterer and return a message
     "Update successful"`, (done) => {
      chai.request(server)
        .put('/auth/update')
        .set({ authorization: firstCustomerToken })
        .send(updateRoleFirst)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Update successful');
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          expect(res.body.data.id).to.be.a('string');
          expect(res.body.data.fullName).to.equal('Rebecca Deo');
          expect(res.body.data.email).to.equal('rebeccadeo@gmail.com');
          expect(res.body.data.phoneNumber).to.equal('078920839');
          expect(res.body.data.address).to.equal('43, Agege Road, Lagos');
          expect(res.body.data.role).to.equal('caterer');
          expect(res.body.data.businessName).to.equal('Best Food');
          expect(res.body.data.logoURL).to.equal('www.image.com/jdjd');
          expect(res.body.data.businessAddress).to.equal('12B, Agege Road');
          done();
        });
    });
    it(`It should return a message saying 'You are already a caterer'
     if you try to update when you already one`, (done) => {
      chai.request(server)
        .put('/auth/update')
        .set({ authorization: catererToken })
        .send(updateRoleFirst)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('You are already a caterer');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid business name"
     when the business name is empty`, (done) => {
      chai.request(server)
        .put('/auth/update')
        .set({ authorization: catererToken })
        .send(updateRoleSecond)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid business name');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid logo URL"
     when the url to the logo isn't provided is empty`, (done) => {
      chai.request(server)
        .put('/auth/update')
        .set({ authorization: catererToken })
        .send(updateRoleThird)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid logo URL');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Please provide a valid address"
     when the business address is empty`, (done) => {
      chai.request(server)
        .put('/auth/update')
        .set({ authorization: catererToken })
        .send(updateRoleFourth)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid address');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
  });
  describe('Refresh Token', () => {
    it(`It should return a message saying '
    Token refreshed successfully`, (done) => {
      chai.request(server)
        .post('/auth/token')
        .set({ authorization: catererToken })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Token refreshed successfully');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          expect(res.body).to.not.have.property('data');
          done();
        });
    });
    it(`It should return a message "Please provide a valid token"
     when you don't send a token`, (done) => {
      chai.request(server)
        .post('/auth/token')
        .set({})
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Please provide a valid token');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
    it(`It should return a message "Invalid Token"
     when you don't send a token`, (done) => {
      chai.request(server)
        .post('/auth/token')
        .set({ authorization: '8273hyfd77e7gucu' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Invalid Token');
          expect(res.body).to.not.have.property('data');
          expect(res.body).to.not.have.property('token');
          done();
        });
    });
  });
});
