var express = require('express')
  , app     = express();

app.use(require('./controllers'))

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Screen-canon listening at http://%s:%s', host, port);

});
