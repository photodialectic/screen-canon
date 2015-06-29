var express = require('express');
var app = express();

var Pageres = require('pageres');
var fs = require('fs');


app.get('/', function (req, res) {
  var pageres = new Pageres({delay: 2})
    .src(req.param('url'), ['iphone 5s'], {crop: true, selector: req.param('selector')})
    .dest(__dirname);

	pageres.run(function (err, items) {
		res.sendFile(__dirname + '/' + items[0].filename);
	});

});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
