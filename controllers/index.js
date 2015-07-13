var express = require('express')
  , app     = express();

app.use('/', require('./screen-canon'));

module.exports = app
