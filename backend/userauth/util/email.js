const nodemailer = require("nodemailer");
const { BASE_URL, EMAIL_USER, EMAIL_PASS } = require('./config')

// https://betterprogramming.pub/how-to-create-a-signup-confirmation-email-with-node-js-c2fea602872a

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});


module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport.sendMail({
    from: EMAIL_USER,
    to: email,
    subject: "Please confirm your msgs account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${BASE_URL}/api/users/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};
