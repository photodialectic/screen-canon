var express = require('express')
  , app     = express()
  , Pageres = require('pageres')
  , fs      = require('fs')
  , extend  = require('extend')
  , config  = require('config')
  , aws     = require('../helpers/aws')
  , md5     = require('MD5')
  , AWS     = require('aws-sdk');

app.get('/:viewport/:url', function (req, res) {
  var viewport    = [req.params.viewport || '1280x1024']
    , url         = req.params.url || 'google.com'
    , options     = req.query.opt
    , defaultOpts = config.get('pageres_options')
    , pageresOpts = {}
    , reqCacheKey = req.params.url + req.params.viewport + '_'
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
    // res.sendFile(fileFull, {}, function(err){
    //   if(!err) {
    //     fileSent = true;
    //   }
    // });

    var s3 = new AWS.S3({params: {Bucket: config.get('AWS.bucket')}});
    s3.headObject({Key: pageresOpts.filename}, function(err, data){
      if(!err) {
        fileSent = true;
        res.redirect(301, 'https://s3.amazonaws.com/' + config.get('AWS.bucket') + '/' + pageresOpts.filename);
      }

      if(!app.get(reqCacheKey)) {
        console.log('going out mom!');

        //set our key because we are going to go get a new screenshot
        app.set(reqCacheKey);

        //Setup our pageres request
        pageres.src(url, viewport, pageresOpts).dest(filePath);

        //go and get our screenshot
        pageres.run(function (err, items) {
          //now that we have our screenshot we can unset the app cache
          app.set(reqCacheKey, false);
          aws.upload_screenshot({ filename: pageresOpts.filename, fullPath: fileFull });
          if(!fileSent) {
            res.sendFile(fileFull);
          }
        });
      }

    });


    //check if we're in the process of requesting a new file
});

module.exports = app
