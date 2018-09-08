const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3050;

// Server routes go here... before webpack configuration stuff! Otherwise app.get('*'...) below will take precedence, since express set up depends on order in which route handlers are defined.
app.get('/hello', (req, res) => res.send({ hi: 'there!' }))

// Run webpack.
if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  app.use(webpackMiddleware(webpack(webpackConfig)));
  // PORT = 3050;
} else {
  app.use(express.static('dist'));

  // send index.html in response to any get request; this allows react-router browser history to work.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));