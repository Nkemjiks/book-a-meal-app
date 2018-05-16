import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect';
import server from '../app';
import models from '../models';
import userMockData from './mock/userMockData';

/** Test cases for user signup
We are testing all input case time to make sure that our validations are working
and that we are getting the desired output
*/

// Mock data imported from a userMockData
const {
  validUserDetailFirst,
  validUserDetailSecond,
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
  validUserLoginDetailsSecond,
  invalidUserLoginPasswordSecond,
  invalidUserLoginDetailPasswordFirst,
  invalidUserLoginDetailsThird,
  nonExistingUserFirst,
} = userMockData;

chai.use(chaiHttp);

describe('User Controller', () => {
  // This will empty the database so we can save the information afresh
  describe('User Signup', () => {
    before((done) => {
      models.user
        .destroy({ truncate: true })
        .then(() => {
          done();
        });
    });
    // Signup with valid user details
    it('It should return a message "User successfully created"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(validUserDetailFirst)
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual('User successfully created');
        });
      done();
    });
    // Signup with valid user details but contains multiple spaces in the full name both in the beginning, middle and end
    it('It should return a message "User successfully created"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(validUserDetailSecond)
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual('User successfully created');
        });
      done();
    });
    // Signup with an email address that has already been registered
    it('It should return a message "A User already exist with this email address"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(validUserDetailFirst)
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.message).toEqual('A User already exist with this email address');
        });
      done();
    });
    // Signup with input fields that are completely empty
    it('It should return a message "Please provide a valid name"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(emptyUserDetail)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid name');
          done();
        });
    });
    // Signing up with a fullname input field that contains numbers
    it('It should return a message "Please provide a valid name"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailNameThird)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid name');
          done();
        });
    });
    // Signup with an email address that doesn't contain the @ special character
    it('It should return a message "Please provide a valid email address"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailEmailSecond)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid email address');
          done();
        });
    });
    // Signup with an email address that doesn't contain the '.com'
    it('It should return a message "Please provide a valid email address"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailEmailThird)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid email address');
          done();
        });
    });
    // Signup with a phone number that has letters in it
    it('It should return a message "Please provide a valid phone number"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPhoneNumberFirst)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid phone number');
          done();
        });
    });
    // Signup with a phone number that has special characters
    it('It should return a message "Please provide a valid phone number"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPhoneNumberSecond)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid phone number');
          done();
        });
    });
    // Signup with a password that contains '<>'
    it('It should return a message "Please provide a valid password" if password is a script', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPasswordFirst)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid password');
          done();
        });
    });
    // Signup with a password that contains spaces
    it('It should return a message "Please provide a valid password"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPasswordSecond)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid password');
          done();
        });
    });
    // Signup with the address input field containing '<>'
    it('It should return a message "Please provide a valid address"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailAddressSecond)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid address');
          done();
        });
    });
    // Signup with the address input field containing '='
    it('It should return a message "Please provide a valid address"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailAddressThird)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid address');
          done();
        });
    });
  });
  describe('User Signin', () => {
    // Sign in with valid input information
    it('It should return a message "Signin successful"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(validUserLoginDetailsFirst)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Signin successful');
        });
      done();
    });
    // Sign in with another valid input information
    it('It should return a message "Signin successful"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(validUserLoginDetailsSecond)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Signin successful');
        });
      done();
    });
    // Signin with another incorrect password
    it('It should return a message "Email or password is incorrect"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginPasswordSecond)
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual('Email or password is incorrect');
        });
      done();
    });
    // Signin with a non-existent user account
    it('It should return a message "Account does not exist. Please signup to continue"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(nonExistingUserFirst)
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual('Account does not exist. Please signup to continue');
        });
      done();
    });
    // Sign in with an email address that doesn't contain '@' and '.com'
    it('It should return a message "Please provide a valid email address"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailsThird)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid email address');
        });
      done();
    });
    // Signin with a password conatining '<>'
    it('It should return a message "Please provide a valid password"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailPasswordFirst)
        .end((err, res) => {expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid password');
        });
      done();
    });
  });
});
