import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Welcome to book-a-meal-app'));

router(app);

export default app;