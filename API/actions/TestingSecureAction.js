exports.TestingSecureAction = {
  name: 'TestingSecureAction',
  description: 'This Action is for secure API using JWT, is necessary use x-access-token header into request',
  outputExample: {
    result: "Hello, this is secure API"
  },
  inputs: {
    
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      data.response.Message = "Hello, this is secure API";

      next();
  }
};