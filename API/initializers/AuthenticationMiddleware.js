module.exports = {
  initialize: function(api, next){
    var AuthenticationMiddleware = {
      name: 'Check if request has token',
      global: true,
      preProcessor: function(data, next){
        if(data.actionTemplate.authenticated === true){
          if(!data.connection.rawConnection.req.headers['x-access-token']){
            next(new Error('All actions require Token for authentication') );
          }else{
            api.jwt.verify(data.connection.rawConnection.req.headers['x-access-token'], api.config.jwt.PrivateKey, function(err, decoded) {      
              if (err) { 
                next(new Error('Failed to authenticate token.') );   
              } else {    
                next();
              }
            });
          }
        }
        else{
          next();
        }
      },
      postProcessor: function(data, next){
        next();
      }
    }

    api.actions.addMiddleware(AuthenticationMiddleware);

    next();
  }
};