const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = [
{
  entry: ['babel-polyfill', './server.js'],
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'server.bundle.js',
  },
  devServer: {
    inline: false,
    contentBase: './dist',
  },
  module: {
    loaders: [
    {
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }, {
      test: /\.css/,
      exclude: /node_modules/,
      use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        }
      },
      {
        loader: 'postcss-loader'
      }
      ]
    }
    ]
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default) 
      safe: false // load .env.example (defaults to "false" which does not use dotenv-safe) 
    })
  ]
},
  {
    entry: ['babel-polyfill', './views/index.js'],
    output: {
      path: path.resolve(__dirname, './bin'),
      filename: 'app.bundle.js',
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }]
    },
    plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default) 
      safe: false // load .env.example (defaults to "false" which does not use dotenv-safe) 
    })
  ],
  },

];
