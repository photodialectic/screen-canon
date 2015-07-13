var express = require('express')
  , app     = express()
  , Pageres = require('pageres')
  , fs      = require('fs')
  , extend  = require('extend')
  , config  = require('config')
  , md5     = require('MD5');

app.get('/:viewport/:url', function (req, res) {
  var viewport    = [req.params.viewport || '1280x1024']
    , url         = req.params.url || 'google.com'
    , options     = req.query.opt
    , defaultOpts = config.get('pageres_options')
    , pageresOpts = {}
    , reqCacheKey = req.params.url + req.params.viewport
    , pageres     = new Pageres()
    , filePath    = config.get('render_path')
    , fileSent    = false
    , fileFull    = filePath;
    
    extend(pageresOpts, defaultOpts, options);
    reqCacheKey += md5(JSON.stringify(pageresOpts));
    pageresOpts.filename = reqCacheKey;
    fileFull += pageresOpts.filename +  '.' + pageresOpts.format;

    //check if we have a file to send back
    //TODO: Lets make this optional to be AWS or Local File system.
    //      If AWS, lets to a 301 redirect to the AWS file
    res.sendFile(fileFull, {}, function(err){
      if(!err) {
        fileSent = true;
      }
    });


    //check if we're in the process of requesting a new file
    if(!app.get(reqCacheKey)) {
      //set our key because we are going to go get a new screenshot
      app.set(reqCacheKey);

      //Setup our pageres request
      pageres.src(url, viewport, pageresOpts).dest(filePath);

      //go and get our screenshot
      pageres.run(function (err, items) {
        //now that we have our screenshot we can unset the app cache
        app.set(reqCacheKey, false);
        if(!fileSent) {
          res.sendFile(fileFull);
        }
      });
    }
});

module.exports = app
