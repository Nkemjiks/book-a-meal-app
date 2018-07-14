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
} = userMockData;

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
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual('User successfully created');
          done();
        });
    });
    it(`It should return a message "A User already exist with this email address" 
    when you signup with an existing email address`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(validUserDetailFirst)
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.message).toEqual('A User already exist with this email address');
          done();
        });
    });
    it(`It should return a message "Please provide a valid name" 
    when you signup with empty input fields`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(emptyUserDetail)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid name');
          done();
        });
    });
    it(`It should return a message "Please provide a valid name" 
    when you signup with a name that conatins numbers`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailNameThird)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid name');
          done();
        });
    });
    it(`It should return a message "Please provide a valid email address" 
    when the @ character isn't present`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailEmailSecond)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid email address');
          done();
        });
    });
    it(`It should return a message "Please provide a valid email address" 
    when '.com' is missing`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailEmailThird)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid email address');
          done();
        });
    });
    it(`It should return a message "Please provide a valid phone number" 
    when you pass a phone number with alphabets in it`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPhoneNumberFirst)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid phone number');
          done();
        });
    });
    it(`It should return a message "Please provide a valid phone number"
     when the number contains special characters`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPhoneNumberSecond)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid phone number');
          done();
        });
    });
    it(`It should return a message "Please provide a valid password" 
    if password contains '<>'`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPasswordFirst)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid password');
          done();
        });
    });
    it(`It should return a message "Please provide a valid password"
     if the password contains spaces`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailPasswordSecond)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid password');
          done();
        });
    });
    it(`It should return a message "Please provide a valid address"
     if address contains '<>'`, (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(invalidUserDetailAddressSecond)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid address');
          done();
        });
    });
    it(`It should return a message "Please provide a valid address" 
    if address contains '='`, (done) => {
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
    it(`It should return a message "Signin successful" 
    when you signin with a valid information`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(validUserLoginDetailsFirst)
        .end((err, res) => {
          firstCustomerToken = res.body.token;
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Signin successful');
          done();
        });
    });
    it(`It should return a message "Email or password is incorrect"
     if you input an incorrect password`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginPasswordSecond)
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual('Email or password is incorrect');
          done();
        });
    });
    it(`It should return a message "Account does not exist. Please signup to continue" 
    if you input an email address that does not exist in the database`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(nonExistingUserFirst)
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual('Account does not exist. Please signup to continue');
          done();
        });
    });
    it(`It should return a message "Please provide a valid email address"
     if the email does not contain @ or .com`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailsThird)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid email address');
          done();
        });
    });
    it(`It should return a message "Please provide a valid password"
     if the password contains <>`, (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailPasswordFirst)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Please provide a valid password');
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
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Update successful');
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
          expect(res.status).toEqual(409);
          expect(res.body.message).toEqual('You are already a caterer');
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
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual('Token refreshed successfully');
          expect(res.body).toHaveProperty('token');
          done();
        });
    });
  });
});
