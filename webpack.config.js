const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/app.jsx',
  },

  output: {
    path: path.resolve(__dirname, 'client', 'public', 'js'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
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
