'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../server');
var should = chai.should();

describe('Server', function () {
  it('It should return a response - Hello world, how are you all doing', function () {
    chai.request(server).get('/').end(function (err, res) {
      if(err) {
        res.send(err);
      }
      res.should.have.status(200);
      done();
    });
  });
});