const nodemailer = require('nodemailer');
const cron = require('cron');
const EmailTemplates = require('email-templates');
const path = require('path');
const { EMAIL, EMAIL_PASSWORD } = require('./dotEnv');
const htmlTemplates = require('../emails/email-templates');
const { CONFIRM_EMAIL, NOTIFY_EMAIL } = require('../consts/consts');
const RuleError = require('../errors/ruleError');

const transporterOptions = {
    service: "hotmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
}
const createTransporter = async () => {
    transporter = nodemailer.createTransport(transporterOptions)
    return transporter;
}

const emailTemplates = new EmailTemplates();

const sendMail = async (email, subject, html) => {
    const transporter = await createTransporter();
    const verify = await transporter.verify();
    if (!verify) {
        return;
    }

    return transporter.sendMail({
        from: EMAIL,
        to: email,
        subject,
        html
    }, (error, info) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Message sent');
        transporter.close();
    });
};

const sendConfirmEmail = async (email, token) => {
    const html = await emailTemplates.render('email-templates/confirm-email', {token});
    await sendMail(email, CONFIRM_EMAIL, html);

}

const sendNotification = async (date, email) => {
    try {
        const job = cron.job(date, async () => {
            const html = await emailTemplates.render('email-templates/notification-email');
            await sendMail(email, NOTIFY_EMAIL, html);
        });
    
        job.start();
    } catch (e) {
        throw e
    }
    
}

module.exports = {
    sendConfirmEmail,
    sendNotification
};