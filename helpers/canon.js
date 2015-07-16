var express = require('express')
  , app     = express()
  , Pageres = require('pageres')
  , extend  = require('extend')
  , config  = require('config')
  , aws     = require('../helpers/aws')
  , debug   = config.get('debug')
  ;
  
module.exports = function(args, res){
    var url     = args.url
      , viewport = [args.viewport]
      , options  = JSON.parse(args.options)
      , pageresOpts = {}
      , defaultOpts = config.get('pageres_options')
      , pageres = new Pageres()
      , filePath    = config.get('render_path')

    extend(pageresOpts, defaultOpts, options);
    pageresOpts.filename = args.id;
    fileFull            = pageresOpts.filename +  '.' + pageresOpts.format;
    
    if("String" == typeof pageresOpts.hide) {
      pageresOpts.hide = pageresOpts.hide.split('~');
    }
    
    //check if we have a file to send back
    if(pageresOpts.fast) {
      if(debug) { console.log('Sending last saved copy'); }
      if(config.get('use_aws')) {
        aws.get_file(pageresOpts.filename, res);
      } else {
        res.sendFile(filePath + fileFull, {}, function(err){});
      }
    }
    
    if(!app.get(args.id) || !pageresOpts.fast) {
      if(debug) { console.log('Fetching a fresh one hoss'); }
      //set our key because we are going to go get a new screenshot
      app.set(args.id, true);

      //Setup our pageres request
      pageres.src(url, viewport, pageresOpts).dest(filePath);

      //go and get our screenshot
      pageres.run(function (err, items) {
        //now that we have our screenshot we can unset the app cache
        app.set(args.id, false);
        if(!err) {
          aws.upload_screenshot({ filename: pageresOpts.filename, fullPath: filePath + fileFull });
          console.log("\t\t Finished fresh fetch");
          if(!res.headersSent) {
            res.sendFile(filePath + fileFull);
          }
        } else {
          console.log("\t\t Fetch failed");
          console.log(err);
        }
      });
    } else {
      if(debug) { console.log("\t Already in the process of fetching one. Move along."); }
    }
};
