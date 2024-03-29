const nodemailer = require("nodemailer");
const { FRONTEND_CONFIRMATION_URL, BASE_URL, EMAIL_USER, EMAIL_PASS } = require('./config')
const logger = require('../../common/util/logger')

// https://betterprogramming.pub/how-to-create-a-signup-confirmation-email-with-node-js-c2fea602872a

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  logger.info(`Sending account confirmation email to ${email}`)
  transport.sendMail({
    from: EMAIL_USER,
    to: email,
    subject: "Please confirm your Msgs account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${FRONTEND_CONFIRMATION_URL}/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};

module.exports.sendPasswordResetEmail = (name, email, confirmationCode) => {
  logger.info(`Sending password reset email to ${email}`)
  transport.sendMail({
    from: EMAIL_USER,
    to: email,
    subject: "Password reset requested",
    html: `<h1>Reset password</h1>
        <h2>Hello ${name}</h2>
        <p>A request for resetting your Msgs password was submitted. If you didn't send the request, please remove this message.</p>
        <p>You can proceed resetting the password by clicking the following link:</p>
        <a href=${BASE_URL}/api/users/resetpassword/${confirmationCode}>${BASE_URL}/api/users/resetpassword/${confirmationCode}</a>
        </div>`,
  }).catch(err => console.log(err));
};
