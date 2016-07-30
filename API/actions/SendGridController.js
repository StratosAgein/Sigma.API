exports.SendBasicEmail = {
  name: 'SendBasicEmail',
  description: 'Send Email to client',
  outputExample: {
    result: "Email sended succesfuly"
  },
  inputs: {
    to_email: { required: true },
    subject_email: {required: true},
    content_body: {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){      
      
      mail = new api.SendGrid.MailHelper.Mail(
          api.SendGrid.from_email,                                                      // From Email
          data.params.subject_email,                                                    // Subject
          new api.SendGrid.MailHelper.Email(data.params.to_email),                      // To Email
          new api.SendGrid.MailHelper.Content("text/plain", data.params.content_body)   // Simple Content Body
          );
      
      var requestBody = mail.toJSON()
      var request = api.SendGrid.Mail.emptyRequest()
      request.method = 'POST'
      request.path = '/v3/mail/send'
      request.body = requestBody
      api.SendGrid.Mail.API(request, function (response) {
          console.log(response.statusCode)
          console.log(response.body)
          console.log(response.headers)
          
          next();
      });
  }
};

exports.SendComposedEmail = {
  name: 'SendComposedEmail',
  description: 'Send Email with HTML template to client',
  outputExample: {
    result: "Email sended succesfuly"
  },
  inputs: {
    app_url: {required: true},
    content_title: {required: true},
    button_url: {required: true},
    to_email: { required: true },
    subject_email: {required: true},
    content_body: {required: true}
  },
  authenticated: false,
  version: 1.0,
  run: function(api, data, next){
    var composedEmailFile = null;
    if(api.SendGrid.CanIUseComposedEmail){
      composedEmailFile = api.SendGrid.ComposedEmailFile;

      var mappper = {
        "{TITLE}":data.params.content_title,
        "{BODY}":data.params.content_body,
        "{APPURL}":data.params.app_url,
        "{BUTTONURL}":data.params.button_url
      };

      var regex = new RegExp(Object.keys(mappper).join("|"),"gi");

      composedEmailFile = composedEmailFile.replace(regex, function(matched){
        return mappper[matched];
      });

      mail = new api.SendGrid.MailHelper.Mail(
          api.SendGrid.from_email,                                                      // From Email
          data.params.subject_email,                                                    // Subject
          new api.SendGrid.MailHelper.Email(data.params.to_email),                      // To Email
          new api.SendGrid.MailHelper.Content("text/html", composedEmailFile)           // Composed Content Body
          );
      
      var requestBody = mail.toJSON()
      var request = api.SendGrid.Mail.emptyRequest()
      request.method = 'POST'
      request.path = '/v3/mail/send'
      request.body = requestBody
      api.SendGrid.Mail.API(request, function (response) {
          console.log(response.statusCode)
          console.log(response.body)
          console.log(response.headers)
          
          next();
      });
    }
    else{
      next(new Error('This API is down, you can\'t use Compose email'));
    }      
  }
};