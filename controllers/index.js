var express = require('express'),
  app = express();

app.use('/', require('./dashboard'));
app.use('/api/v1', require('./api/v1'));
app.use('/api', require('./api/v1'));
app.use('/shot', require('./shot'));
app.use('/shoot', require('./shoot'));

module.exports = app
