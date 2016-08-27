exports.CreatePaymentMethod = {
  name: 'CreatePaymentMethod',
  description: 'Create PaymentMethod entity',
  outputExample: {
    
  },
  inputs: {
    Name : {required: true},
    PaymentMethodStatus : {required: true},
    Alias : {required: true},
    PaymentMethodType : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var paymentMethod = new api.MongoDB.PaymentMethod({
          _id : new api.MongoDB.ObjectId(),
          ShortName : data.params.ShortName,
          Name : data.params.Name,
          PaymentMethodStatus : data.params.PaymentMethodStatus,
          Alias : data.params.Alias,
          PaymentMethodType : data.params.PaymentMethodType
      });

      paymentMethod.save(function(err, result){
          if (err) console.log(err);

          data.response.result = result;
          next();
      })
      
  }
};

exports.EditPaymentMethod = {
  name: 'EditPaymentMethod',
  description: 'Edit PaymentMethod entity',
  outputExample: {
    
  },
  inputs: {
    Name : {required: true},
    PaymentMethodStatus : {required: true},
    Alias : {required: true},
    PaymentMethodType : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var paymentMethod = new api.MongoDB.PaymentMethod({
          _id : new api.MongoDB.ObjectId(),
          ShortName : data.params.ShortName,
          Name : data.params.Name,
          PaymentMethodStatus : data.params.PaymentMethodStatus,
          Alias : data.params.Alias,
          PaymentMethodType : data.params.PaymentMethodType
      });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.PaymentMethod.findOneAndUpdate(query, paymentMethod, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
  }
};

exports.GetPaymentMethodById = {
  name: 'GetPaymentMethodById',
  description: 'Get PaymentMethod by Id',
  outputExample: {
    
  },
  inputs: {
    PaymentMethodId : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.PaymentMethod.findOne({"_id" : data.params.PaymentMethodId}, function(err, paymentMethod){
          if (err) console.log(err);

          data.response.PaymentMethod = paymentMethod;
          next();
      })
  }
};

exports.GetAllPaymentMethod = {
  name: 'GetPaymentMethodById',
  description: 'Get PaymentMethod by Id',
  outputExample: {
    
  },
  inputs: {
    
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.PaymentMethod.find({}, function(err, paymentMethods){
          if (err) console.log(err);

          data.response.PaymentMethods = paymentMethods;
          next();
      })
  }
};

exports.DeletePaymentMethod = {
  name: 'DeletePaymentMethod',
  description: 'Change status of PaymentMethod to disabled',
  outputExample: {
    
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var paymentMethod = new api.MongoDB.PaymentMethod({
              PaymentMethodStatus:  api.MongoDB.PaymentMethodStatus.Deleted
          });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.PaymentMethod.findOneAndUpdate(query, paymentMethod, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
  }
};

exports.ForcedRemovalPaymentMethod = {
  name: 'ForcedRemovalPaymentMethod',
  description: 'Forced removal for PaymentMethod, caution, can\'t restore and is needed audit.',
  outputExample: {
    
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.PaymentMethod.findOneAndRemove(data.params.Id, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
  }
};