import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models';
import { validUserDetail } from './mock/userMockData';

const { expect } = chai;

chai.use(chaiHttp);

describe('User APIs', () => {
  describe('User Signup', () => {
    it('It should return a message "User successfully created"', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(validUserDetail)
        .end((err, res) => {
          expect(res).to.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('token');
          res.body.should.have.property('message').eql('User successfully created');
          done();
        });
    });
    // it('It should return a message "A user is already registered with this email address"', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/user/signup')
    //     .send(user)
    //     .end((err, res) => {
    //       expect(res).to.have.status(409);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('message').eql('A user is already registered with this email address');
    //       done();
    //     });
    // });
    // it('It should return a message "Please provide a valid name"', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/user/signup')
    //     .send({
    //       fullName: '',
    //       email: 'rebeccasmith@gmail.com',
    //       phoneNumber: '078920839',
    //       password: 'testing',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('message').eql('Please provide a valid name');
    //       done();
    //     });
    // });
    // it('It should return a message "Please provide a valid email address"', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/user/signup')
    //     .send({
    //       fullName: 'Anita Joseph',
    //       email: '',
    //       phoneNumber: '078920839',
    //       password: 'testing',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('message').eql('Please provide a valid email address');
    //       done();
    //     });
    // });
    // it('It should return a message "Please provide a valid phone number"', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/user/signup')
    //     .send({
    //       fullName: 'Anita Joseph',
    //       email: 'anitajo@gmail.com',
    //       phoneNumber: '',
    //       password: 'testing',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('message').eql('Please provide a valid phone number');
    //       done();
    //     });
    // });
    // it('It should return a message "Please provide a valid password"', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/user/signup')
    //     .send({
    //       fullName: 'Anita Joseph',
    //       email: 'anitajo@gmail.com',
    //       phoneNumber: '234566',
    //       password: '',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('message').eql('Please provide a valid password');
    //       done();
    //     });
    // });
  });
  // describe('User Signin', () => {
  //   const validUserDetail = {
  //     email: 'bobsmith@gmail.com',
  //     password: 'testing1',
  //   };
  //   it('It should return a message "Login successful"', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/user/signin')
  //       .send(validUserDetail)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Login successful');
  //         res.body.data.should.a('object');
  //         done();
  //       });
  //   });
  //   it('It should return a message "Login unsuccessful. Please enter correct email address and password"', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/user/signin')
  //       .send({
  //         email: 'bpubsmith@gmail.com',
  //         password: 'testing1',
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(401);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Login unsuccessful. Please enter correct email address and password');
  //         done();
  //       });
  //   });
  //   it('It should return a message "Please provide a valid email address"', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/user/signin')
  //       .send({
  //         email: '',
  //         phoneNumber: '234566',
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(400);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Please provide a valid email address');
  //         done();
  //       });
  //   });
  //   it('It should return a message "Please provide a password"', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/user/signin')
  //       .send({
  //         email: 'anitajo@gmail.com',
  //         phoneNumber: '',
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(400);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Please provide a password');
  //         done();
  //       });
  //   });
  // });
});