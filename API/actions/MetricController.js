exports.CreateMetric = {
  name: 'CreateMetric',
  description: 'Create Metric entity',
  outputExample: {
    
  },
  inputs: {
    Alias : {required: true},
    Code : {required: true},
    Description : {required: true},
    Formula : {required: true},
    MeasurementFrequency : {required: true},
    MeasurementEndDate : {required: true},
    MeasurementStartDate : {required: true},
    Goal : {required: true},
    Name : {required: true},
    AssociatedObjectiveId : {required: true},
    ResponsibleConfiguration : {required: true},
    ResponsibleRegistration : {required: true},
    Trend : {required: true},
    UnitOfMeasurement : {required: true},
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
     var metric = new api.MongoDB.Metric({
          _id : new api.MongoDB.ObjectId(),
          Alias : data.params.Alias,
          Code : data.params.Code,
          Description : data.params.Description,
          Formula : data.params.Formula,
          MeasurementFrequency : data.params.MeasurementFrequency,
          MeasurementEndDate : data.params.MeasurementEndDate,
          MeasurementStartDate : data.params.MeasurementStartDate,
          Goal : data.params.Goal,
          Name : data.params.Name,
          AssociatedObjectiveId : data.params.AssociatedObjectiveId,
          ResponsibleConfiguration : data.params.ResponsibleConfiguration,
          ResponsibleRegistration : data.params.ResponsibleRegistration,
          Trend : data.params.Trend,
          UnitOfMeasurement : data.params.UnitOfMeasurement
      });

      metric.save(function(err, result){
          if (err) console.log(err);

          data.response.result = result;
          next();
      })
      
  }
};

exports.EditMetric = {
  name: 'EditMetric',
  description: 'Edit Metric entity',
  outputExample: {
    
  },
  inputs: {
    Alias : {required: true},
    Code : {required: true},
    Description : {required: true},
    Formula : {required: true},
    MeasurementFrequency : {required: true},
    MeasurementEndDate : {required: true},
    MeasurementStartDate : {required: true},
    Goal : {required: true},
    Name : {required: true},
    AssociatedObjectiveId : {required: true},
    ResponsibleConfiguration : {required: true},
    ResponsibleRegistration : {required: true},
    Trend : {required: true},
    UnitOfMeasurement : {required: true},
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var metric = new api.MongoDB.Metric({
          _id : new api.MongoDB.ObjectId(),
          Alias : data.params.Alias,
          Code : data.params.Code,
          Description : data.params.Description,
          Formula : data.params.Formula,
          MeasurementFrequency : data.params.MeasurementFrequency,
          MeasurementEndDate : data.params.MeasurementEndDate,
          MeasurementStartDate : data.params.MeasurementStartDate,
          Goal : data.params.Goal,
          Name : data.params.Name,
          AssociatedObjectiveId : data.params.AssociatedObjectiveId,
          ResponsibleConfiguration : data.params.ResponsibleConfiguration,
          ResponsibleRegistration : data.params.ResponsibleRegistration,
          Trend : data.params.Trend,
          UnitOfMeasurement : data.params.UnitOfMeasurement
      });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.Metric.findOneAndUpdate(query, metric, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
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