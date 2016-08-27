exports.CreateMetric = {
  name: 'CreateMetric',
  description: 'Create Metric entity',
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

exports.EditMetric = {
  name: 'EditMetric',
  description: 'Edit Metric entity',
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

exports.GetMetricById = {
  name: 'GetMetricById',
  description: 'Get Metric by Id',
  outputExample: {
    
  },
  inputs: {
    MetricId : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Metric.findOne({"_id" : data.params.MetricId}, function(err, metric){
          if (err) console.log(err);

          data.response.Metric = metric;
          next();
      })

  }
};

exports.GetAllMetric = {
  name: 'GetMetricById',
  description: 'Get Metric by Id',
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

exports.DeleteMetric = {
  name: 'DeleteMetric',
  description: 'Change status of Metric to disabled',
  outputExample: {
    
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var metric = new api.MongoDB.Metric({
              MetricStatus:  api.MongoDB.MetricStatus.Deleted
          });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.Metric.findOneAndUpdate(query, metric, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
  }
};

exports.ForcedRemovalMetric = {
  name: 'ForcedRemovalMetric',
  description: 'Forced removal for Metric, caution, can\'t restore and is needed audit.',
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