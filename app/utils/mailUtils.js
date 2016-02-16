var Mailgun = require('mailgun-js')
var mailgun = new Mailgun({apiKey: 'key-75a412584b2e5b5fb72adfb4e936eaa5', domain: 'ultimaspb.com'});
var ejs = require('ejs')
var fs = require('fs')
var path = require('path')

// console.log(">>>>>", __dirname)
// console.log(html)
function Mail() {

   this.sendMail = function(subject, user, type, pass) {
     var template = "";

     fs.readFile(path.resolve('app/views/'+type+'.ejs'), 'UTF-8', function(err, data) {
         template = ejs.render(data, {"subject": subject, "user": user, "pass": pass || "."}, null);



        var data = {
        //Specify email data
          from: 'inscricoes@orientacaoparaiba.com.br',
        //The email to contact
          to: "paulo.liraa@gmail.com",
        //Subject and text data
          subject: subject,
          html: template
        }

        mailgun.messages().send(data, function (err, body) {
            //If there is an error, render the error page
            if (err) {
                // res.render('error', { error : err});
                console.log("got an error: ", err);
            }
            //Else we can greet    and leave
            else {
                //Here "submitted.jade" is the view file for this landing page
                //We pass the variable "email" from the url parameter in an object rendered by Jade

                console.log(body);
            }
        });
      });
    }

}
module.exports = Mail;
