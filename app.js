var express = require('express')
  , app     = express()
  , db      = require('./model/db')
  , mustacheExpress = require('mustache-express')
  , bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/static', express.static('public'));
app.use(require('./controllers'));

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Screen-canon listening at http://%s:%s', host, port);

});
