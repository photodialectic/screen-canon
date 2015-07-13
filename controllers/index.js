var express = require('express')
  , app     = express();

app.use('/', require('./screen-canon'));
app.use('/dashboard', require('./dashboard'));

module.exports = app
