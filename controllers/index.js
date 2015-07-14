var express = require('express')
  , app     = express();

app.use('/', require('./dashboard'));
app.use('/shot', require('./shot'));

module.exports = app
