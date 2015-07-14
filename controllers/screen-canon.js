var express = require('express')
  , app     = express()
  , Pageres = require('pageres')
  , fs      = require('fs')
  , extend  = require('extend')
  , config  = require('config')
  , aws     = require('../helpers/aws')
  , md5     = require('MD5')
  , AWS     = require('aws-sdk');

app.disable('etag');
app.get('/:viewport/:url', function (req, res) {
  var viewport    = [req.params.viewport || '1280x1024']
    , url         = req.params.url || 'google.com'
    , options     = req.query.opt
    , defaultOpts = config.get('pageres_options')
    , pageresOpts = {}
    , reqCacheKey = req.params.url + req.params.viewport + '_'
    , pageres     = new Pageres()
    , filePath    = config.get('render_path')
    , fileFull    = filePath;
    
    extend(pageresOpts, defaultOpts, options);
    reqCacheKey         += md5(JSON.stringify(pageresOpts));
    pageresOpts.filename = reqCacheKey;
    fileFull            += pageresOpts.filename +  '.' + pageresOpts.format;

    //check if we have a file to send back
    if(config.get('use_aws')) {
      aws.get_file(pageresOpts.filename, res);
    } else {
      res.sendFile(fileFull, {}, function(err){});
    }
    
    if(!app.get(reqCacheKey)) {

      //set our key because we are going to go get a new screenshot
      app.set(reqCacheKey, true);

      //Setup our pageres request
      pageres.src(url, viewport, pageresOpts).dest(filePath);

      //go and get our screenshot
      pageres.run(function (err, items) {
        //now that we have our screenshot we can unset the app cache
        app.set(reqCacheKey, false);
        aws.upload_screenshot({ filename: pageresOpts.filename, fullPath: fileFull });
        if(!res.headersSent) {
          res.sendFile(fileFull);
        }
      });
    }
});

module.exports = app
