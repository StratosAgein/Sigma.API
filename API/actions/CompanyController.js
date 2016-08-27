exports.GetAllCompanies = {
  name: 'GetAllCompanies',
  description: 'Get all companies',
  outputExample: {
    Companies : [
      {
        "_id" :         "51e0373c6f35bd826f47e9a3",
        ShortName:      'Positiva',
        LongName:       'Positiva compañía de seguros',
        OwnerClient:    null,
      }
    ]
  },
  inputs: {
    
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Company.find({}, function(err, companies){
          if (err) console.log(err);

          data.response.Companies = companies;
          next();
      })
      
  }
};

exports.GetCompanyById = {
  name: 'GetCompanyById',
  description: 'Get company by Id',
  outputExample: {
    Companies : 
      {
        "_id" :         "51e0373c6f35bd826f47e9a3",
        ShortName:      'Positiva',
        LongName:       'Positiva compañía de seguros',
        OwnerClient:    null,
      }    
  },
  inputs: {
    CompanyId : {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Company.findOne({"_id" : data.params.CompanyId}, function(err, company){
          if (err) console.log(err);

          data.response.Company = company;
          next();
      })
      
  }
};

exports.GetCompanyByShortName = {
  name: 'GetCompanyByShortName',
  description: 'Get company by short name',
  outputExample: {
    Companies : 
      {
        "_id" :         "51e0373c6f35bd826f47e9a3",
        ShortName:      'Positiva',
        LongName:       'Positiva compañía de seguros',
        OwnerClient:    null,
      }    
  },
  inputs: {
    CompanyShortName : {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Company.findOne({ShortName : data.params.CompanyShortName}, function(err, company){
          if (err) console.log(err);

          data.response.Company = company;
          next();
      })
      
  }
};

exports.GetCompanyByLongName = {
  name: 'GetCompanyByLongName',
  description: 'Get company by long name',
  outputExample: {
    Companies : 
      {
        "_id" :         "51e0373c6f35bd826f47e9a3",
        ShortName:      'Positiva',
        LongName:       'Positiva compañía de seguros',
        OwnerClient:    null,
      }    
  },
  inputs: {
    CompanyLongName : {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Company.findOne({LongName : data.params.CompanyLongName}, function(err, company){
          data.response.Company = company;
          next();
      })
      
  }
};

exports.CreateCompany = {
  name: 'CreateCompany',
  description: 'Create a company',
  outputExample: {
    result :
    {
        Status : true,
        Message : 'Created succesfuly'
    }
  },
  inputs: {
    ShortName : {required: true},
    LongName : {required: true},
    OwnerClient: {required: false}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
      
      var company = new api.MongoDB.Company({
          _id : new api.MongoDB.ObjectId(),
          ShortName : data.params.ShortName,
          LongName : data.params.LongName,
          OwnerClient : data.params.OwnerClient,
          CompanyStatus: api.MongoDB.CompanyStatus.Inactive
      });

      company.save(function(err, result){
          if (err) console.log(err);

          data.response.result = result;
          next();
      })
      
  }
};

exports.EditCompany = {
  name: 'EditCompany',
  description: 'Edit a company',
  outputExample: {
    result :
    {
        Status : true,
        Message : 'Edited succesfuly'
    }
  },
  inputs: {
    Id : {required: true},
    ShortName : {required: true},
    LongName : {required: true},
    OwnerClient: {required: false},
    CompanyStatus: {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){

      var company = new api.MongoDB.Company({
              ShortName : data.params.ShortName,
              LongName : data.params.LongName,
              OwnerClient : data.params.OwnerClient,
              CompanyStatus: data.params.CompanyStatus
          });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.Company.findOneAndUpdate(query, company, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
      
  }
};

exports.DeleteCompany = {
  name: 'DeleteCompany',
  description: 'Delete a company',
  outputExample: {
    result :
    {
        Status : true,
        Message : 'Deleted succesfuly'
    }
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
     
      var company = new api.MongoDB.Company({
              CompanyStatus:  api.MongoDB.CompanyStatus.Deleted
          });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.Company.findOneAndUpdate(query, company, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
      
  }
};

exports.ForcedRemovalCompany = {
  name: 'ForcedRemovalCompany',
  description: 'Forced removal a company',
  outputExample: {
    result :
    {
        Status : true,
        Message : 'Deleted succesfuly'
    }
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
     
      api.MongoDB.Company.findOneAndRemove(data.params.Id, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
      
  }
};