var twilio = require('twilio');

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    api.Twilio = {};

    next();
  },
  start: function(api, next){

    var client = new twilio.RestClient(api.config.twilio.SID, api.config.twilio.AUTHTOKEN);

    api.log('Twilio API connected', 'notice');

    api.Twilio.Client = client;

    next();
  },
  stop: function(api, next){
    // disconnect from server
    next();
  }
}