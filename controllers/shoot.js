var express = require('express')
  , app     = express()
  , config  = require('config')
  , md5     = require('MD5')
  , canon   = require('../lib/canon')
  , Shot    = require('../model/shot');


app.post('/', function(req, res){
  var id            = md5(req.body.url + req.body.viewport + JSON.stringify(req.body))
    , shot          = new Shot();

      shot.url      = req.body.url;
      shot.viewport = req.body.viewport;
      shot.options  = JSON.stringify(req.body); 
      shot._id      = id;

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

app.get('/:id', function (req, res) {
  Shot.findById(req.params.id, function(err, data){
    if(err) {
      res.status(404).json(err);
    } else {
      canon(data, res, app);
    }
  });
});

module.exports = app
