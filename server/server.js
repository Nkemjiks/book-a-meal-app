import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

export default app;
