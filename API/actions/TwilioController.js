exports.SendSMS = {
  name: 'SendSMS',
  description: 'Send international SMS',
  outputExample: {
    result: "Message sent from Twilio"
  },
  inputs: {
    smsBody: { required: true }
  },
  run: function(api, data, next){
      
      api.Twilio.Client.messages.create({ 
        to: "+573103494806", 
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