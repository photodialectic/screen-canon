var mongoose = require('mongoose')
  , shotSchema = new mongoose.Schema({  
        options  : String,
        url      : String,
        viewport : String,
        _id      : String,
      });

module.exports = mongoose.model('Shot', shotSchema);
