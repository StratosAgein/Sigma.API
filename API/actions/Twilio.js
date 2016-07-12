exports.SendSMS = {
  name: 'SendSMS',
  description: 'Send an International SMS',
  outputExample: {
    result: true
  },

  run: function(api, data, next){
      console.log(data.params.smsBody)
      api.Twilio.Client.messages.create({ 
        to: "+573103494806", 
        from: api.config.twilio.PHONE, 
        body: data.params.smsBody,   
        }, function(err, message) { 
            if(err){
                console.log("==========")
                console.log(err)
                api.log(message, 'error');
                console.log("==========")
            }
            else{
                api.log('Message sent from Twilio', 'notice');
            }
        });
      //("Sigma Two-Factor test")

      data.response.randomNumber = Math.random();
      next();
  }

};