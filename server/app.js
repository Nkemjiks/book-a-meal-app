import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev';
import router from './routes';


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/_webpack_hmr',
    heartbeat: 20000,
  }));
}

app.use(express.static('client/public'));

router(app);

export default app;
