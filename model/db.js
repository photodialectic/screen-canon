var mongoose = require('mongoose')
	,	config   = require('config');

mongoose.connect('mongodb://' + config.get('db_host') + '/' + config.get('db_name'));
