var express = require('express')
  , app     = express()
  , Pageres = require('pageres')
  , extend  = require('extend')
  , process = require('process')
  , config  = require('config')
  , aws     = require('../lib/aws')
  , debug   = config.get('debug')
  ;

// process.setMaxListeners(0); //this is probably a bad thing to do. 

module.exports = function(args, res){
    var url     = args.get('url')
      , viewport = [args.get('viewport')]
      , options  = JSON.parse(args.get('options'))
      , pageresOpts = {}
      , defaultOpts = config.get('pageres_options')
      , pageres     = new Pageres()
      , filePath    = config.get('render_path')

    extend(pageresOpts, defaultOpts, options);
    pageresOpts.filename = args.get('id');
    fileFull             = pageresOpts.filename +  '.' + pageresOpts.format;
    //check if we have a file to send back
    if(pageresOpts.fast) {
      if(debug) { console.log('Sending last saved copy'); }
      if(config.get('use_aws')) {
        aws.get_file(args.get('id'), res);
      } else {
        res.sendFile(filePath + fileFull, {}, function(err){});
      }
    }

    if(!app.get(args.id) || !pageresOpts.fast) {
      if(debug) { console.log('Fetching a fresh one'); }
      //set our key because we are going to go get a new screenshot
      app.set(args.get('id'), true);

      //Setup our pageres request
      pageres.src(url, viewport, pageresOpts).dest(filePath);

      //go and get our screenshot
      pageres.run(function (err, items) {
        //now that we have our screenshot we can unset the app cache
        app.set(args.get('id'), false);
        if(!err) {
          aws.upload_screenshot({ 
            filename: pageresOpts.filename, 
            fullPath: filePath +  pageresOpts.filename + '.' + pageresOpts.format
          });
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
