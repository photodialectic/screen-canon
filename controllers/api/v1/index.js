var express = require('express'),
  app = express();

app.use('/compare', require('./compare'));

module.exports = app
