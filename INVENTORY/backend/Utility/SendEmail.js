const nodemailer = require('nodemailer');

const SendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false, // true for 465, false for 587
            auth:{
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASSWORD,
            },
        });

        const options = {
            from:sent_from,
            to:send_to,
            subject: subject,
            html: message,
            replyTo: reply_to,
        };

        // Send email
        const info = await transporter.sendMail(options);
        return info;
        
    } catch (error) {
        console.error("Email error: ", error);
        throw new Error("Email not sent, please try again");
    }
};

module.exports = SendEmail;