var AWS     = require('aws-sdk')
  , s3      = new AWS.S3()
  , config  = require('config')
  , process = require('process')
  , fs      = require('fs')
  , debug   = config.get('debug');

AWS.config.update({accessKeyId: config.get('aws.access_key'), secretAccessKey: config.get('aws.secret_key')});

module.exports = {
 
  get_file : function(filename, res) {
    var s3 = new AWS.S3({params: {Bucket: config.get('aws.bucket')}});
    s3.getObject({Key: filename}, function(err, data){
      if(!err) {
        res.set({
          'Content-Type'   : data.ContentType,
          'ETag'           : data.ETag ,
          'Content-Length' : data.ContentLength,
          'Last-Modified'  : data.LastModified
        });
        res.send(new Buffer(data.Body));
      }
    });
  },

  upload_screenshot: function(args) {
    fs.readFile(args.fullPath, function (err, data){
      if(!err) {
        var s3bucket = new AWS.S3({params: {Bucket: config.get('aws.bucket')}});
        s3bucket.createBucket(function () {
            var params = {
              Key: args.filename,
              Body: data,
              ACL: "public-read",
              ContentType: "image/" + config.get('pageres_options.format')
            };
            s3bucket.upload(params, function (err, data) {
              if(debug) {
                if(err) {
                  console.log(err)
                } else {
                  console.log("\t\t " + data.Location);
                }
              }
            });
        });
      }
    });
  }

}

