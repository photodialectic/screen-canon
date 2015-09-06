var watch = require('node-watch')
	, process = require('process')
	, sys = require('sys')
	, exec = require('child_process').exec
	;


watch('www', function(filename) {
	console.log(filename, ' changed. Build and uglify JS');
  exec("npm run build:js && npm run clean:js:www").stdout.on('data', function (data) {
	  console.log(data);
	});

});

watch('scss', function(filename) {
  console.log(filename, ' changed. Build and minify CSS');
  exec("npm run build:css && npm run build:css-min").stdout.on('data', function (data) {
	  console.log(data);
	});;
});

function puts(error, stdout, stderr) { sys.puts(stdout) }
