var AWS = require('aws-sdk')
	, s3 = new AWS.S3()
	, config = require('config')
	, process = require('process')
	, fs = require('fs');

var screen_canon_s3 = {
	get_file : function(filename, res) {
		var s3 = new AWS.S3({params: {Bucket: config.get('AWS.bucket')}});
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
			var s3bucket = new AWS.S3({params: {Bucket: config.get('AWS.bucket')}});
			s3bucket.createBucket(function () {
					var params = {
						Key: args.filename,
						Body: data,
						ACL: "public-read",
						ContentType: "image/" + config.get('pageres_options.format')
					};
					s3bucket.upload(params, function (err, data) {
            // console.log(data);
          });
			});
		});
	}
}

process.env['AWS_ACCESS_KEY_ID']     = config.get('AWS.access_key');
process.env['AWS_SECRET_ACCESS_KEY'] = config.get('AWS.secret_key');
module.exports = screen_canon_s3;
