const nodemailer = require('nodemailer')

exports.sendMailswithattach = (email, subject, msg, attach) => {
    return new Promise(function(resolve, reject) {

        let transporter = nodeMailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: 'eu-west-1'
            })
        });
        var message = {
            text: "",
            from: "Shippigo <no-reply@shippigo.com>",
            to: email,
            subject: subject,
            html: msg,
            attachments: attach
        };
        transporter.sendMail(message, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })


    })
}