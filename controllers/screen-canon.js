var express = require('express')
  , app     = express()
  , Pageres = require('pageres')
  , fs      = require('fs')
  , config  = require('config');

app.get('/', function (req, res) {
 	var filename = req.query.url + req.query.selector
 		, fileSent = false
	  , dirname  = config.get('render_path')
	  , fullPath = dirname + '/' + filename + '.png'
	  , pageres  = new Pageres({delay: 2})
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
				res.sendFile(fullPath);
			}
		});
  }

});

module.exports = app
