exports.Authenticate = {
  name: 'Authenticate',
  description: 'Authenticate user',
  outputExample: {
    success: true,
    message: 'Welcome to Sigma',
    token: 'token'
  },
  inputs: {
    Email: { required: true },
    Password: {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
      if(data.params.Email != undefined){
        api.MongoDB.User.findOne({Email: data.params.Email}, function(err, user){
            if (err) api.log(err, 'error');

            // Cannot found user
            if (!user) {
              data.response.Message = 'Authentication failed. User not found.';
              data.response.Success = false;
            } 
            else if (user) {

                // Check if password matches
                if (user.Password != data.params.Password) {
                    data.response.Message ='Authentication failed. Wrong password.';
                    data.response.Success = false;
                } 
                else{
                    // Create JSON Web Token with private key
                    var token = api.jwt.sign(user, api.config.jwt.PrivateKey, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    data.response.Success = true;
                    data.response.Message = 'Welcome to Sigma';
                    data.response.Token = token;
                    data.response.UserId = user._id;

                }
            }

            next();
        })
      }      
  }
};