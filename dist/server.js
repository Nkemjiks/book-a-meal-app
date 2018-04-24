'use strict';

var express = require('express');

var app = express();
var port = 3000;

app.get('/', function (req, res) {
  res.send('Hello World, how are you all doing');
});

app.listen(port, function () {
  console.log('Hello world');
});