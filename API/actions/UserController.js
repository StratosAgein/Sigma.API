exports.GetAllUsers = {
  name: 'GetAllUsers',
  description: 'Get all users',
  outputExample: {
    Users : [
      {
        "_id" :     "51e0373c6f35bd826f47e9a1",
        Name:       'Camilo Rodriguez',
        Lastname:   'Rodriguez',
        Email:      'camiepisode@outlook.com',
        Password:   'CAMILO',
        Status:     1,
        Phone:      '+573103494806',
        Roles:
        [
                    {
                        Group:      'superadmin',
                        IsPrimary: true
                    },
                    {
                        Group:      'buyer',
                        IsPrimary: false
                    }
        ],
        age: 23
    }
    ]
  },
  inputs: {
    
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      api.MongoDB.User.find({}, function(err, users){
          data.response.Users = users;
          next();
      })
      
  }
};