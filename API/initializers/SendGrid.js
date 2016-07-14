var sendgrid = require('sendgrid').mail
var fs       = require('fs');

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
      
      fs.readFile('public/assets/ConfirmationEmail.html', 'utf8', function (err,data) {
            if (err) {
              api.SendGrid.CanIUseComposedEmail = false;
              api.log(err, 'error');
              api.log('SenGrid API initialized without ComposedEmail', 'notice');
              next();
            }
            else{
              api.SendGrid.CanIUseComposedEmail = true;
              api.SendGrid.ComposedEmailFile = data;
              api.log('SenGrid API initialized', 'notice');
              next();
            }
        });

      
  },
  stop: function(api, next){
    // disconnect from server
    next();
  }
}