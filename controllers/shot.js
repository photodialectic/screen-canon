var express = require('express')
  , app     = express()
  , config  = require('config')
  , md5     = require('MD5')
  , canon   = require('../helpers/canon')
  , Shot    = require('../model/shot');

app.get('/', function(req, res){
  var limit = req.query.limit || 100
    , page = req.query.page || 1
    , offset = (page - 1) * limit;
  Shot.find({}, null, { skip: offset, limit: limit }, function(err, data){
    res.json(data);
  });
});

app.get('/images', function(req, res){
  var limit = req.query.limit || 100
    , page = req.query.page || 1
    , offset = (page - 1) * limit;
  Shot.find({}, null, { skip: offset, limit: limit }, function(err, data){
    res.render('images', {data:data} );
  });
});

app.get('/:id', function (req, res) {
  Shot.findById(req.params.id, function(err, data){
    if(err) {
      res.send(err)
    } else {
      canon(data, res, app);
      // res.json(data);
    }
  });
});

app.post('/', function(req, res){
  var id            = md5(req.body.url + req.body.viewport + JSON.stringify(req.body))
    , shot          = new Shot();

      shot.url      = req.body.url;
      shot.viewport = req.body.viewport;
      shot.options  = JSON.stringify(req.body); 
      shot._id      = md5(shot.url + shot.viewport + shot.options);

      shot.save(function(err, data){
        if(err) {
          Shot.findById(id, function(err, data){
            if(!err) {
              res.json(data);
            } else {
              res.json(err);
            }
          });
        } else {
          res.json(data);
        }
      });
});

module.exports = app
