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