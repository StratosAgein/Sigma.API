exports.CreateObjective = {
  name: 'CreateObjective',
  description: 'Create Objective entity',
  outputExample: {
    
  },
  inputs: {
    Name : {required: true},
    Alias: {required: true},
    Description : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      
      var objective = new api.MongoDB.Objecive({
          _id : new api.MongoDB.ObjectId(),
          Name : data.params.Name,
          Alias: data.params.Alias,
          Description : data.params.Description
      });

      objective.save(function(err, result){
          if (err) console.log(err);

          data.response.result = result;
          next();
      })
      
  }
};

exports.EditObjective = {
  name: 'EditObjective',
  description: 'Edit Objective entity',
  outputExample: {
    
  },
  inputs: {
    Name : {required: true},
    Alias: {required: true},
    Description : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var objective = new api.MongoDB.Objecive({
          _id : new api.MongoDB.ObjectId(),
          Name : data.params.Name,
          Alias: data.params.Alias,
          Description : data.params.Description
      });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.Objecive.findOneAndUpdate(query, objective, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
  }
};

exports.GetObjectiveById = {
  name: 'GetObjectiveById',
  description: 'Get Objective by Id',
  outputExample: {
    
  },
  inputs: {
    ObjectiveId : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Objective.findOne({"_id" : data.params.ObjectiveId}, function(err, objective){
          if (err) console.log(err);

          data.response.Objective = objective;
          next();
      })

  }
};

exports.GetAllObjectives = {
  name: 'GetAllObjectives',
  description: 'Get Objective by Id',
  outputExample: {
    
  },
  inputs: {
    
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Objective.find({}, function(err, objectives){
          if (err) console.log(err);

          data.response.Objective = objectives;
          next();
      })
  }
};

exports.DeleteObjective = {
  name: 'DeleteObjective',
  description: 'Change status of Objective to disabled',
  outputExample: {
    
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var objective = new api.MongoDB.Objecive({
              ObjectiveStatus:  api.MongoDB.ObjectiveStatus.Deleted
          });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.Objecive.findOneAndUpdate(query, objective, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })

  }
};

exports.ForcedRemovalObjective = {
  name: 'ForcedRemovalObjective',
  description: 'Forced removal for Objective, caution, can\'t restore and is needed audit.',
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