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
          api.log('MongoDB Database connected to ' + api.config.mongodb.ConnectionString, 'notice');
          
          api.MongoDB.db = mongoose.connection;
          api.MongoDB.Schema = mongoose.Schema;
          api.MongoDB.Types = mongoose.Schema.Types;
          api.DriverName = 'Mongoose';
          api.MongoDB.User = mongoose.model('User', new api.MongoDB.Schema({
              Name : String,
              Lastname: String,
              Email: String, 
              Password: String,
              Status: Number,
              Phone: String, 
              TwoFactorPin: String,
              Roles: [api.MongoDB.Schema.Types.Mixed]
          },
          { 
             collection : 'User' 
          }
          ));

          api.MongoDB.Company = mongoose.model('Company', new api.MongoDB.Schema({
            _id : ObjectId,
            ShortName : String,
            LongName : String,
            OwnerClient: String,
            CompanyStatus: Number
          },
          { 
             collection : 'Company' 
          }
          ));

          api.MongoDB.CompanyStatus = {
            Inactive : 0,
            Active : 1,
            Deleted : 2,
          }
           
          next();
      });


    
  },
  stop: function(api, next){
    // disconnect from server
    next();
  }
}