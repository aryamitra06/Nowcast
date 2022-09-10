import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'caryamitra@gmail.com',
    pass: process.env.EMAILER_PASS
  }
});

export const sendWelcomeMail = (recieverEmail, firstName, lastName) => {

  const mailOptions = {
    from: 'caryamitra@gmail.com',
    to: recieverEmail,
    subject: 'Welcome to Nowcast 🚀',
    html: `
        <p>Hi ${firstName + " " + lastName},</p>
        <p>We are happy to see you in our community! 😍</p>
        <br>
        <p>Regards,</p>
        <p>Aryamitra Chaudhuri</p>
        <p><b>Founder, Nowcast</b></p>
        `
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

