var express = require('express'),
  app = express(),
  config = require('config'),
  md5 = require('MD5'),
  canon = require('../lib/canon'),
  Shot = require('../model/shot');

app.get('/', function(req, res) {
  var limit = req.query.limit || 100,
    page = req.query.page || 1,
    offset = (page - 1) * limit;
  Shot.find(req.query, null, {
    skip: offset,
    limit: limit
  }, function(err, data) {
    res.json(data);
  });
});

app.get('/:id', function(req, res) {
  Shot.findById(req.params.id, function(err, data) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.json(data);
    }
  });
});

module.exports = app
