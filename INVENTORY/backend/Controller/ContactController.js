const AsyncHandler = require('express-async-handler');
const User = require('../Models/UserModel');
const SendEmail = require('../Utility/SendEmail');



// ! CONTACT US ! \\
const ContactUs = AsyncHandler(async(req,res) => {

    const {subject,message} = req.body;

    const user = await User.findById(req.user._id)

    if(!user){
        res.status(400)
        throw new Error('User Not Found ! Login Please !')
    }

    // ? validation ? \\
    if(!subject || !message){
        res.status(400)
        throw new Error('Please Add Subject and Message !')
    }

    const send_to = process.env.EMAIL_USER
    const sent_from = process.env.EMAIL_USER
    const reply_to = user.email

    try {
        await SendEmail(subject,message,send_to,sent_from,reply_to)
        res.status(200).json({success: true, message: "Email Sent !"})
    } catch (error) {
        res.status(500)
        throw new Error("Failed to Send Email !")
    }

})
// ! CONTACT US ! \\





module.exports = {ContactUs}