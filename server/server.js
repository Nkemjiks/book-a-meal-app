import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
