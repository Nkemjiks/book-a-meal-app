import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import userMockData from './mock/userSigninMockData';

/** Test cases for user signin
We are testing all input case time to make sure that our validations are working
and that we are getting the desired output
*/

const {
  validUserLoginDetailsFirst,
  validUserLoginDetailsSecond,
  invalidUserLoginDetailsFirst,
  invalidUserLoginDetailsSecond,
  invalidUserLoginDetailsThird,
  invalidUserLoginDetailPasswordFirst,
  invalidUserLoginDetailPasswordSecond,
  invalidUserLoginDetailPasswordThird,
  invalidUserLoginPasswordFirst,
  invalidUserLoginPasswordSecond,
  invalidUserLoginPasswordThird,
  nonExistingUserFirst,
  nonExistingUserSecond,
  nonExistingUserThird,
} = userMockData;

const { expect } = chai;

chai.use(chaiHttp);

describe('User APIs', () => {
  describe('User Signin', () => {
    // Sign in with valid input information
    it('It should return a message "Signin successful"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(validUserLoginDetailsFirst)
        .end((err, res) => {
          expect(res.status).to.eql(401);
          res.body.should.have.property('data');
          res.body.should.have.property('token');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Signin successful');
        });
      done();
    });
    // Sign in with another valid input information
    it('It should return a message "Signin successful"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(validUserLoginDetailsSecond)
        .end((err, res) => {
          expect(res.status).to.eql(401);
          res.body.should.have.property('data');
          res.body.should.have.property('token');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Signin successful');
        });
      done();
    });
    // Sign in with an email address that doesn't contain '@'
    it('It should return a message "Please provide a valid email address"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailsFirst)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Please provide a valid email address');
        });
      done();
    });
    // Sign in with an email address that doesn't contain '.com'
    it('It should return a message "Please provide a valid email address"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailsSecond)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Please provide a valid email address');
        });
      done();
    });
    // Sign in with an email address that doesn't contain '@' and '.com'
    it('It should return a message "Please provide a valid email address"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailsThird)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Please provide a valid email address');
        });
      done();
    });
    // Signin with a password conatining '<>'
    it('It should return a message "Please provide a valid password"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailPasswordFirst)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Please provide a valid password');
        });
      done();
    });
    // Signin with a password conatining '='
    it('It should return a message "Please provide a valid password"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailPasswordSecond)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Please provide a valid password');
        });
      done();
    });
    // Signin with a password conatining spaces
    it('It should return a message "Please provide a valid password"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginDetailPasswordThird)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.eql('Please provide a valid password');
        });
      done();
    });
    // Signin with an incorrect password
    it('It should return a message "Email or password is incorrect"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginPasswordFirst)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.eql('Email or password is incorrect');
        });
      done();
    });
    // Signin with another incorrect password
    it('It should return a message "Email or password is incorrect"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginPasswordSecond)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.eql('Email or password is incorrect');
        });
      done();
    });
    // Signin with yet another incorrect password
    it('It should return a message "Email or password is incorrect"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(invalidUserLoginPasswordThird)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.eql('Email or password is incorrect');
        });
      done();
    });
    // Signin with a non-existent user account
    it('It should return a message "Account does not exist. Please signup to continue"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(nonExistingUserFirst)
        .end((err, res) => {
          expect(res).to.have.status(401);
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Account does not exist. Please signup to continue');
        });
      done();
    });
    // Signin with another non-existent user account
    it('It should return a message "Account does not exist. Please signup to continue"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(nonExistingUserSecond)
        .end((err, res) => {
          expect(res).to.have.status(401);
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Account does not exist. Please signup to continue');
        });
      done();
    });
    // Signin with yet another non-existent user account
    it('It should return a message "Account does not exist. Please signup to continue"', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(nonExistingUserThird)
        .end((err, res) => {
          expect(res).to.have.status(401);
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Account does not exist. Please signup to continue');
        });
      done();
    });
  });
});
