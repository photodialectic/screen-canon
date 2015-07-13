var express = require('express')
  , app     = express()
  , mustacheExpress = require('mustache-express');


app.use('/static', express.static('public'));
app.use(require('./controllers'))

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Screen-canon listening at http://%s:%s', host, port);

});
