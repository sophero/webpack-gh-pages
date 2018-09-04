var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'faker', 'lodash', 'redux', 'react', 'react-redux', 'react-dom', 'react-input-range', 'redux-form', 'redux-thunk'
]

module.exports = {
  entry: { // listing multiple key-value pairs here means we will have multiple builds each specifying its own entry point
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // [name] is injected with relevant key name specified in entry section. [chunkhash] created on build, unique id/hash based on build output.
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [ // plugins operate on bundled outputs, whereas loaders operate on application files
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendor' // this will look for crossover files between 'vendor' build and default 'bundle' build, and include these only in 'vendor' output. nice!
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({ // adds script tags into optionally user specified html template for all scripts outputted by webpack. script filenames include chunkhash as included in output section.
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
