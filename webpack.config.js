const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './client/app.js',
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

        options: {
          presets: ['env', 'react', 'stage-0'],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].main.css',
    }),
  ],

  resolve: {
    extensions: ['js', 'jsx'],
  },
};
