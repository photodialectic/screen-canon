var express = require('express')
  , app     = express()
  , config  = require('config');

app.get('/', function (req, res) {
	res.render('dashboard', { 'options' : config.get('pageres_options') } );
});

module.exports = app
