var express = require('express'),
  app = express(),
  config = require('config');

app.get('/', function(req, res) {
  res.render('index', {
    'options': config.get('pageres_options')
  });
});

app.get('/compare', function(req, res) {
  res.render('index', {
    'platforms': require('../lib/compare').platforms
  });
});

module.exports = app
