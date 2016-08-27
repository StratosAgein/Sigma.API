exports.CreatePerspective = {
  name: 'CreatePerspective',
  description: 'Create Perspective entity',
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

exports.EditPerspective = {
  name: 'EditPerspective',
  description: 'Edit Perspective entity',
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

exports.GetPerspectiveById = {
  name: 'GetPerspectiveById',
  description: 'Get Perspective by Id',
  outputExample: {
    
  },
  inputs: {
    PerspectiveId : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Perspective.findOne({"_id" : data.params.PerspectiveId}, function(err, perspective){
          if (err) console.log(err);

          data.response.Perspective = perspective;
          next();
      })

  }
};

exports.GetAllPerspective = {
  name: 'GetPerspectiveById',
  description: 'Get Perspective by Id',
  outputExample: {
    
  },
  inputs: {
    
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Perspective.find({}, function(err, perspectives){
          if (err) console.log(err);

          data.response.Perspectives = perspectives;
          next();
      })
  }
};

exports.DeletePerspective = {
  name: 'DeletePerspective',
  description: 'Change status of Perspective to disabled',
  outputExample: {
    
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var perspective = new api.MongoDB.Perspective({
              PerspectiveStatus:  api.MongoDB.PerspectiveStatus.Deleted
          });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.Perspective.findOneAndUpdate(query, perspective, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })

  }
};

exports.ForcedRemovalPerspective = {
  name: 'ForcedRemovalPerspective',
  description: 'Forced removal for Perspective, caution, can\'t restore and is needed audit.',
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