import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import router from './routes';


dotenv.config();
const app = express();

app.use(cors());
app.use(history());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client/public'));

router(app);

export default app;
