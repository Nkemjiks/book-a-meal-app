const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/app.jsx',
  },

  output: {
    path: path.resolve(__dirname, 'client', 'public', 'js'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['absolute/path/a', 'absolute/path/b'],
          },
        }],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    // new UglifyJSPlugin(),
    // new ExtractTextWebpackPlugin({
    //   filename: 'css/[name].main.css',
    // }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'client', 'public'),
    port: 8000,
    open: true,
    historyApiFallback: true,
    hot: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  mode: 'none',
};
