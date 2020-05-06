const nodemailer = require('nodemailer');
const config = require('../config');

var transporter = nodemailer.createTransport(config.mailConfig);
module.exports = options => {
  transporter.sendMail(
    {
      from: config.orgName,
      replyTo: options.replyTo,
      to: options.to,
      subject: options.subject,
      cc: options.cc,
      bcc: options.bcc,
      text: options.text,
      html: options.html,
      attachments: options.attachments
    },
    function (err, info) {
      if (err && options.onError) {
        options.onError(err);
      } else if (options.onSuccess) {
        options.onSuccess(info);
      }
    }
  );
};
