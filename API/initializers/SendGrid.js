var sendgrid = require('sendgrid').mail

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    api.SendGrid = {};

    next();
  },
  start: function(api, next){

      api.SendGrid.from_email = new sendgrid.Email("<no-reply@sigma.com>","Sigma");
      api.SendGrid.MailHelper = sendgrid;
      api.SendGrid.Mail = require('sendgrid').SendGrid(api.config.sendgrid.SENDGRID_API_KEYSID)

      api.log('SenGrid API initialized', 'notice');

      next();
  },
  stop: function(api, next){
    // disconnect from server
    next();
  }
}