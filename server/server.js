// import express from 'express';
const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello World, how are you all doing?' });
});

app.listen(port, () => {
  console.log('Hello world');
});

module.exports = app;
