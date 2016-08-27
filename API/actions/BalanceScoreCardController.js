exports.CreateBalanceScoreCard = {
  name: 'CreateBalanceScoreCard',
  description: 'Create BalanceScoreCard entity',
  outputExample: {
    
  },
  inputs: {
    Name : {required: true},
    OrganizationalUnitId : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var balanceScoreCard = new api.MongoDB.BalanceScoreCard({
          _id : new api.MongoDB.ObjectId(),
          Name : data.params.Name,
          OrganizationalUnitId : data.params.OrganizationalUnitId
      });

      company.save(function(err, result){
          if (err) console.log(err);

          data.response.result = result;
          next();
      })
  }
};

exports.EditBalanceScoreCard = {
  name: 'EditBalanceScoreCard',
  description: 'Edit BalanceScoreCard entity',
  outputExample: {
    
  },
  inputs: {
    Name : {required: true},
    OrganizationalUnitId : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var balanceScoreCard = new api.MongoDB.BalanceScoreCard({
          _id : new api.MongoDB.ObjectId(),
          Name : data.params.Name,
          OrganizationalUnitId : data.params.OrganizationalUnitId
      });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.BalanceScoreCard.findOneAndUpdate(query, balanceScoreCard, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
  }
};

exports.GetBalanceScoreCardById = {
  name: 'GetBalanceScoreCardById',
  description: 'Get BalanceScoreCard by Id',
  outputExample: {
    
  },
  inputs: {
     BalanceScoreCardId : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
     api.MongoDB.BalanceScoreCard.findOne({"_id" : data.params.CompanyId}, function(err, balanceScoreCard){
          if (err) console.log(err);

          data.response.BalanceScoreCard = balanceScoreCard;
          next();
      })
  }
};

exports.GetAllBalanceScoreCard = {
  name: 'GetBalanceScoreCardById',
  description: 'Get BalanceScoreCard by Id',
  outputExample: {
    
  },
  inputs: {
    
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.BalanceScoreCard.find({}, function(err, bcss){
          if (err) console.log(err);

          data.response.Balances = bcss;
          next();
      })
  }
};

exports.DeleteBalanceScoreCard = {
  name: 'DeleteBalanceScoreCard',
  description: 'Change status of BalanceScoreCard to disabled',
  outputExample: {
    
  },
  inputs: {
    Id : {required: true}
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var balance = new api.MongoDB.BalanceScoreCard({
          BalanceScoreCardStatus:  api.MongoDB.BalanceScoreCardStatus.Deleted
      });

      var query = {"_id": data.params.Id}; 
      api.MongoDB.BalanceScoreCard.findOneAndUpdate(query, balance, {new: true}, function(err, result){
          if (err) {console.log('Error on update:\n');console.log(err)};

          data.response.result = result;
          next();
      })
  }
};

exports.ForcedRemovalBalanceScoreCard = {
  name: 'ForcedRemovalBalanceScoreCard',
  description: 'Forced removal for BalanceScoreCard, caution, can\'t restore and is needed audit.',
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