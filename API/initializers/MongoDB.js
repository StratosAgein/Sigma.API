var mongoose   = require('mongoose');

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    api.MongoDB = {};

    next();
  },
  start: function(api, next){
    api.MongoDB = {};

    mongoose.connect(api.config.mongodb.ConnectionString);

    var db = mongoose.connection;
    
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function callback() {
          api.log('MongoDB Database connected', 'notice');
          
          api.MongoDB.db = mongoose.connection;
          api.MongoDB.Schema = mongoose.Schema;
          api.MongoDB.Types = mongoose.Schema.Types;
          api.DriverName = 'Mongoose';

          next();
      });


    
  },
  stop: function(api, next){
    // disconnect from server
    next();
  }
}