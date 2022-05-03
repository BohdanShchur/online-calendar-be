const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');
const { EMAIL, EMAIL_PASSWORD } = require('./dotEnv');
const htmlTemplates = require('../emails/email-templates');

const createTransporter = async () => {
    transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    })
    return transporter;
}
const emailTemplates = new EmailTemplates();

const options = {
    from: EMAIL,
    to: 'bodjashchur@gmail.com',
    subject: "Test connection",
    text: "EBAT', vono pratsue!"
}

const sendMail = async (email, token) => {
    const transporter = await createTransporter();
    const verify = await transporter.verify();
    if (!verify) {
        return;
    }
    const html = await emailTemplates.render('email-templates/confirm-email', token);

    await transporter.sendMail({
        from: EMAIL,
        to: 'bodjashchur@gmail.com',
        subject: "Test connection",
        html,
        icalEvant: {
            method: 'request',
            content: "Go na Pivo?"
        }
    })
};

module.exports = sendMail;