exports.SecureAction = {
  name: 'SecureAction',
  description: 'This Action is for secure API using JWT',
  outputExample: {
    result: "Hello, this is secure API"
  },
  inputs: {
    
  },
  run: function(api, data, next){
      data.response.Message = "Hello, this is secure API";

      next();
  }
};