exports.CreateClient = {
  name: 'CreateClient',
  description: 'Create Client entity',
  outputExample: {
    
  },
  inputs: {
    
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      // Do something...
      next();
  }
};

exports.EditClient = {
  name: 'EditClient',
  description: 'Edit Client entity',
  outputExample: {
    
  },
  inputs: {
    
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      // Do something...
      next();
  }
};

exports.GetClientById = {
  name: 'GetClientById',
  description: 'Get Client by Id',
  outputExample: {
    
  },
  inputs: {
    ClientId : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Client.findOne({"_id" : data.params.ClientId}, function(err, client){
          if (err) console.log(err);

          data.response.Client = client;
          next();
      })

  }
};

exports.GetAllClient = {
  name: 'GetClientById',
  description: 'Get Client by Id',
  outputExample: {
    
  },
  inputs: {
    
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Client.find({}, function(err, clients){
          if (err) console.log(err);

          data.response.Clients = clients;
          next();
      })
  }
};

exports.DeleteClient = {
  name: 'DeleteClient',
  description: 'Change status of Client to disabled',
  outputExample: {
    
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var client = new api.MongoDB.Client({
          ClientStatus:  api.MongoDB.ClientStatus.Deleted
      });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.Client.findOneAndUpdate(query, client, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
  }
};

exports.ForcedRemovalClient = {
  name: 'ForcedRemovalClient',
  description: 'Forced removal for Client, caution, can\'t restore and is needed audit.',
  outputExample: {
    
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Company.findOneAndRemove(data.params.Id, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
  }
};