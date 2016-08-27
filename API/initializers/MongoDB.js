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
        
        // MongoDB useful properties
        api.MongoDB.db = mongoose.connection;
        api.MongoDB.Schema = mongoose.Schema;
        api.MongoDB.Schema.Types = mongoose.Schema.Types;
        api.MongoDB.ObjectId = mongoose.Types.ObjectId;
        api.DriverName = 'Mongoose';

        // Schema Entity Models definition
        api.MongoDB.User = mongoose.model('User', new api.MongoDB.Schema({
            _id : mongoose.Schema.Types.ObjectId,
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
            _id : mongoose.Schema.Types.ObjectId,
            RegisterTime : Date,
            ShortName : String,
            LongName : String,
            OwnerClient: String,
            CompanyStatus: Number
        },
        { 
            collection : 'Company' 
        }
        ));

        api.MongoDB.BalanceScoreCard = mongoose.model('BalanceScoreCard', new api.MongoDB.Schema({
            _id : mongoose.Schema.Types.ObjectId,
            RegisterTime : Date,
            Name : String,
            OrganizationalUnitId : String
        },
        { 
            collection : 'BalanceScoreCard' 
        }
        ));

        api.MongoDB.Client = mongoose.model('Client', new api.MongoDB.Schema({
            _id : mongoose.Schema.Types.ObjectId,
            Email : String,
            Address : String, 
            ClientStatus : Number,
            PaymentMethod : mongoose.Schema.Types.Mixed,
            DocumentNumber : String,
            DocumentType : Number,
            PhoneNumber : String
        },
        { 
            collection : 'Client' 
        }
        ));

        api.MongoDB.Metric = mongoose.model('Metric', new api.MongoDB.Schema({
            _id : mongoose.Schema.Types.ObjectId,
            Alias : String,
            Code : String,
            Description : String,
            Formula : String,
            MeasurementFrequency : Number,
            MeasurementEndDate : Date,
            MeasurementStartDate : Date,
            Goal : String,
            Name : String,
            AssociatedObjectiveId : String,
            ResponsibleConfiguration : String,
            ResponsibleRegistration : String,
            Trend : String,
            UnitOfMeasurement : Number,
        },
        { 
            collection : 'Metric' 
        }
        ));

        api.MongoDB.Objective = mongoose.model('Objective', new api.MongoDB.Schema({
            _id : mongoose.Schema.Types.ObjectId,
            Name : String,
            Alias: String,
            Description : String
        },
        { 
            collection : 'Objective' 
        }
        ));

        api.MongoDB.Perspective = mongoose.model('Perspective', new api.MongoDB.Schema({
            _id : mongoose.Schema.Types.ObjectId,
            Name : String,
            Weight : Number,
            RegisterTime : Date,
            PerspectiveStatus : Number
        },
        { 
            collection : 'Perspective' 
        }
        ));

        api.MongoDB.PaymentMethod = mongoose.model('PaymentMethod', new api.MongoDB.Schema({
            _id : mongoose.Schema.Types.ObjectId,
            Name : String,
            PaymentMethodStatus : Number,
            Alias : String,
            PaymentMethodType : Number
        },
        { 
            collection : 'PaymentMethod' 
        }
        ));


        // Schema Enum Models definition
        api.MongoDB.CompanyStatus = {
          Inactive : 0,
          Active : 1,
          Deleted : 2,
        };

        api.MongoDB.AuthenticateStatus = {

        };

        api.MongoDB.BalanceScoreCardStatus = {

        };

        api.MongoDB.ClientStatus = {

        };

        api.MongoDB.MetricStatus = {

        };

        api.MongoDB.ObjectiveStatus = {

        };

        api.MongoDB.PerspectiveStatus = {

        };

        api.MongoDB.UserStatus = {

        };

        api.MongoDB.PaymentMethodStatus = {

        };

        api.MongoDB.PaymentMethodType = {
          CreditCard : 0,
          PSE : 1,
          DaviPlata : 2,
          Nequi : 3
        };
          
        next();
    });


    
  },
  stop: function(api, next){
    // disconnect from server
    next();
  }
}