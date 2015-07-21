var express = require('express')
  , app     = express();

app.use('/', require('./dashboard'));
app.use('/shot', require('./shot'));
app.use('/shoot', require('./shoot'));

module.exports = app
