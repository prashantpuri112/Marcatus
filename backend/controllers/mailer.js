import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';


// https://ethereal.email/create
let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.EMAIL, // generated ethereal user
        pass: ENV.PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res) => {
    const { username, email, text, subject } = req.body;
    console.log(email)
    // body of the email
    var emailS = {
        body: {
            name: username,
            intro: text || 'Welcome to Marcatus! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(emailS);

    let message = {
        from: ENV.EMAIL,
        to: email,
        subject: subject || "Signup Successful",
        html: emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us." })
        })
        .catch(error => res.status(500).send({ error }))

}