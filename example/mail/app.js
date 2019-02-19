"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "email-smtp.us-west-2.amazonaws.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Fred Foo 👻" <foo@www.training-benchmark.com>', // sender address
    to: "mohamed.sahad@experionglobal.com, mohamedsahadkp@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
