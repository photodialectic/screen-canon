var express = require('express');
var app = express();

var Pageres = require('pageres');
var fs = require('fs');


app.get('/', function (req, res) {
 	var filename = req.query.url + req.query.selector;
  var dirname = __dirname + '/shots';
  var fullPath = dirname + '/' + filename + '.png';
  var pageres = new Pageres({delay: 2})
    .src(req.query.url, [req.param('viewport', '1280x1024')], {
    	crop: true, 
    	selector: req.query.selector, 
    	filename: filename
    })
    .dest(dirname);

  res.sendFile(fullPath, {}, function(err){
  	if(!err) {
  		fileSent = true;
  	}
  });

  if(!app.get(fullPath)) {
	  app.set(fullPath, true);
		pageres.run(function (err, items) {
			app.set(fullPath, false);
			if(!fileSent) {
				res.sendFile(__dirname + '/' + items[0].filename);
			}
		});
  }

});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
