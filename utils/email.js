const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transPorter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Naresh Rajbanshi<naresh@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transPorter.sendMail(mailOptions);
};

module.exports = sendEmail;
