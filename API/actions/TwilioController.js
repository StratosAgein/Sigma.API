exports.SendSMS = {
  name: 'SendSMS',
  description: 'Send international SMS',
  outputExample: {
    result: "Message sent from Twilio"
  },
  inputs: {
    smsBody: { required: true },
    messageTo: {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
      
      api.Twilio.Client.messages.create({ 
        to: data.params.messageTo, 
        from: api.config.twilio.PHONE, 
        body: data.params.smsBody,   
        }, function(err, message) { 
            if(err){
                console.log(err)
            }
            else{
                api.log('Message sent from Twilio', 'notice');
            }
        });

      next();
  }
};

exports.GenerateRandomSMSPin = {
  name: 'GenerateRandomSMSPin',
  description: 'Generate random pin for SMS service',
  outputExample: {
    pin: "300-799"
  },
  inputs: {
    SMSTo: {required: true},
    UserId: { required: true }
  },
  authenticated: true,
  version: 1.0,
  run: function(api, data, next){
      
      var pin = Math.floor((Math.random() * 999) + 100) + '-' + Math.floor((Math.random() * 999) + 100);

      api.Twilio.Client.messages.create({ 
        to: '+' + data.params.SMSTo, 
        from: api.config.twilio.PHONE, 
        body: 'Tu pin es ' + pin,   
        }, function(err, message) { 
            if(err){
                console.log(err)
                data.response.Message = err;
            }
            else{
                api.log('Message sent from Twilio', 'notice');
                data.response.Message = 'Pin sent from Twilio';

                api.MongoDB.User.findByIdAndUpdate(data.params.UserId, { $set: { TwoFactorPin: pin }}, function (err, user) {
                  if (err) {console.log(err); next();}
                  
                  data.response.Result = 'Changed user pin'; 

                    next();
                });

            }            
            
        });


  }
};