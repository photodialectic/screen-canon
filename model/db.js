var mongoose = require('mongoose')
	,	config   = require('config');

mongoose.connect('mongodb://' + config.get('db_host') + '/' + config.get('db_name'), function(err){
	console.error('tried connecting to mongodb://%s/%s/', config.get('db_host'), config.get('db_name'));
	console.error(err);
});
