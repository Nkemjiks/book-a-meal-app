const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = {
  ...webpackConfig,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    webpackConfig.plugins[0],
    webpackConfig.plugins[1],
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'client', 'public'),
    port: 8080,
    historyApiFallback: true,
    hot: true,
  },
  mode: 'development',
};
