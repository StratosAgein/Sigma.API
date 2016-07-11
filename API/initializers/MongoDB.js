var mongoose   = require('mongoose');

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    api.Mongoose = {};

    next();
  },
  start: function(api, next){
    api.Mongoose = {};

    mongoose.connect(api.config.mongodb.ConnectionString);

    var db = mongoose.connection;
    var Schema = mongoose.Schema;
    var Types = mongoose.Schema.Types;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        api.log('MongoDB Database connected', 'notice');
    });

    api.MongoDB.db = db;
    api.MongoDB.Schema = Schema;
    api.MongoDB.Types = Types;
    api.DriverName = 'Mongoose';

    next();
  },
  stop: function(api, next){
    // disconnect from server
    next();
  }
}