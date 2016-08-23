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
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Company.find({}, function(err, companies){
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
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Company.findOne({"_id" : ObjectId(data.params.CompanyId)}, function(err, company){
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
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.Company.findOne({ShortName : data.params.CompanyShortName}, function(err, company){
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
  authenticated: true,
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
    Company : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var company = new api.MongoDB.Company({
          ShortName : data.params.Company.ShortName,
          LongName : data.params.Company.LongName,
          OwnerClient : null,
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
    Company : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var company = new api.MongoDB.Company({
          ShortName : data.params.Company.ShortName,
          LongName : data.params.Company.LongName,
          OwnerClient : null,
          CompanyStatus: data.params.Company.CompanyStatus
      });

      company.save(function(err, result){
          if (err) console.log(err);
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
    CompanyId : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var company = new api.MongoDB.Company({
          ShortName : data.params.Company.ShortName,
          LongName : data.params.Company.LongName,
          OwnerClient : null,
          CompanyStatus: api.MongoDB.CompanyStatus.Deleted
      });

      api.MongoDB.Company.findOne({"_id" : ObjectId(data.params.CompanyId)}, function(err, companySearched){

          var company = new api.MongoDB.Company({
            ShortName : companySearched.ShortName,
            LongName : companySearched.LongName,
            OwnerClient : companySearched.OwnerClient,
            CompanyStatus: api.MongoDB.CompanyStatus.Deleted
            });

          api.MongoDB.Company.update({_id: data.params.CompanyId}, company, function(err, result){
            if (err) console.log(err);

            data.response.result = result;
            next();
        })
      })

      
      
  }
};