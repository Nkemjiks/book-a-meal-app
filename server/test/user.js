import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models';
import userMockData from './mock/userMockData';

// Test cases for user signup
const {
  validUserDetail,
  validUserLoginDetails,
  invalidUserLoginDetails,
  invalidUserLoginDetailPassword,
  invalidUserLoginPassword,
  nonExistingUser,
  invalidUserDetailEmail,
  emptyUserDetail,
  invalidUserDetailName,
  invalidUserDetailPhoneNumber,
  invalidUserDetailPassword,
  invalidUserDetailAddress,
} = userMockData;

const { expect } = chai;

chai.use(chaiHttp);

describe('User APIs', () => {
  before((done) => {
    models.user.destroy({
      where: {},
      truncate: true,
    });
    done();
  });
  describe('User All', () => {
    describe('User Signup', () => {
      it('It should return a message "User successfully created"', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(validUserDetail)
          .end((err, res) => {
            expect(res).to.have.status(201);
            res.body.should.have.property('data');
            res.body.should.have.property('token');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('User successfully created');
          });
        done();
      });
      it('It should return a message "Please provide a valid name" if an empty object is sent', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(emptyUserDetail)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.eql('Please provide a valid name');
          });
        done();
      });
      it('It should return a message "Please provide a valid name"', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(invalidUserDetailName)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.eql('Please provide a valid name');
          });
        done();
      });
      it('It should return a message "Please provide a valid email address"', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(invalidUserDetailEmail)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.eql('Please provide a valid email address');
          });
        done();
      });
      it('It should return a message "Please provide a valid phone number"', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(invalidUserDetailPhoneNumber)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.eql('Please provide a valid phone number');
          });
        done();
      });
      it('It should return a message "Please provide a valid password"', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(invalidUserDetailPassword)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.eql('Please provide a valid password');
          });
        done();
      });
      it('It should return a message "Please provide a valid address"', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(invalidUserDetailAddress)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.eql('Please provide a valid address');
          });
        done();
      });
      it('It should return a message "A User already exist with this email address"', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(validUserDetail)
          .end((err, res) => {
            expect(res).to.have.status(409);
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('A User already exist with this email address');
          });
        done();
      });
    });

    describe('User Signin', () => {
      it('It should return a message "Signin successful"', (done) => {
        chai.request(server)
          .post('/auth/login')
          .send(validUserLoginDetails)
          .end((err, res) => {
            expect(res).to.have.status(200);
            res.body.should.have.property('data');
            res.body.should.have.property('token');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Signin successful');
          });
        done();
      });
      it('It should return a message "Please provide a valid email address"', (done) => {
        chai.request(server)
          .post('/auth/login')
          .send(invalidUserLoginDetails)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.eql('Please provide a valid email address');
          });
        done();
      });
      it('It should return a message "Please provide a valid password"', (done) => {
        chai.request(server)
          .post('/auth/login')
          .send(invalidUserLoginDetailPassword)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.eql('Please provide a valid password');
          });
        done();
      });
      it('It should return a message "Email or password is incorrect"', (done) => {
        chai.request(server)
          .post('/auth/login')
          .send(invalidUserLoginPassword)
          .end((err, res) => {
            expect(res).to.have.status(401);
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Email or password is incorrect');
          });
        done();
      });
      it('It should return a message "Account does not exist. Please signup to continue"', (done) => {
        chai.request(server)
          .post('/auth/login')
          .send(nonExistingUser)
          .end((err, res) => {
            expect(res).to.have.status(401);
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Account does not exist. Please signup to continue');
          });
        done();
      });
    });
  });
});
