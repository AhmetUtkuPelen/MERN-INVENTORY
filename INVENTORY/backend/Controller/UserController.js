const AsyncHandler = require('express-async-handler');
const User = require('../Models/UserModel');
const GenerateToken = require('../Utility/GenerateToken')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('../Models/TokenModel');
const crypto = require('crypto');
const SendEmail = require('../Utility/SendEmail');



// ! REGISTER USER ! \\
const RegisterUser = AsyncHandler (async (req,res) => {

    const {name,email,password} = req.body

    // ? make sure all fields are filled ? \\
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please Fill All Fields !')
    }

    // ? iff password is too short ? \\
    if(password.length < 8){
        res.status(400)
        throw new Error('Password Must Be At Least 8 Characters Long !')
    }

    // ? check if user already exists ? \\
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error(`A User With This Email Already Exists !`)
    }

    // ? create new user ? \\
    const user = await User.create({
        name:name,
        email:email,
        password,
    })

    // ? generate token ? \\
    const token = await GenerateToken(user._id)

    // ? send http-only cookie ? \\
    res.cookie("token",token,{
        path:"/",
        httpOnly:true,
        expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        sameSite:"lax",
        secure:false,
    })

    if(user){
        const {_id,name,email,photo,bio,phone} = user
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            bio,
            phone,
            token
        })
    }else{
        res.status(400)
        throw new Error(`Invalid User Data !`)
    }

})
// ! REGISTER USER ! \\




// ! LOGIN USER ! \\
const LoginUser = AsyncHandler(async(req,res) => {

    const {email,password} = req.body

    // ? validate request ? \\
    if(!email || !password){
        res.status(400)
        throw new Error('Please Fill All Fields !')
    }

    // ? check if user exists ? \\
    const user = await User.findOne({email})

    if(!user){
        res.status(400)
        throw new Error('User Not Found , Please Register First !')
    }

    // ? check if password is correct ? \\
    const passwordCorrect = await bcryptjs.compare(password , user.password)

    // ? generate token ? \\
    const token = await GenerateToken(user._id)

    // ? send http-only cookie ? \\
    if(passwordCorrect){
        res.cookie("token",token,{
            path:"/",
            httpOnly:true,
            expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            sameSite:"lax",
            secure:false,
        })
    }

    if(user && passwordCorrect){
        const {_id,name,email,photo,phone,bio} = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            bio,
            phone,
            token
        })
    }else{
        throw new Error(`Email or Password Is Wrong !`)
    }

})
// ! LOGIN USER ! \\



// ! LOGOUT USER ! \\
const LogOutUser = AsyncHandler(async(req,res) => {
    res.cookie("token","",{
        path:"/",
        httpOnly:true,
        expires:new Date(0), //expire the existing cookie
        sameSite:"lax",
        secure:false,
    })
    return res.status(200).json({
        message:"User Logged Out Successfully !"
    })
})
// ! LOGOUT USER ! \\




// ! GET USER DATA ! \\
const GetUser = AsyncHandler(async(req,res) => {

    const user = await User.findById(req.user._id)

    if(user){
        const {_id,name,email,photo,bio,phone} = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            bio,
            phone,
        })
    }else{
        res.status(400)
        throw new Error(`User Not Found !`)
    }

})
// ! GET USER DATA ! \\





// ! GET LOGIN STATUS ! \\
const LoginStatus = AsyncHandler(async(req,res) => {

    const token = req.cookies.token

    if(!token){
        return res.json(false)
    }

    const verified = jwt.verify(token,process.env.JWT_SECRET)

    if(verified){
        return res.json(true)
    }

    return res.json(false)

})
// ! GET LOGIN STATUS ! \\





// ! UPDATE USER ! \\
const UpdateUser = AsyncHandler(async(req,res) => {

    const user = await User.findById(req.user._id)

    if(user){
        const {name,email,photo,bio,phone} = user
        user.email = email
        user.name = req.body.name || name
        user.phone = req.body.phone || phone
        user.bio = req.body.bio || bio
        user.photo = req.body.photo || photo

        const updatedUser = await user.save()
        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            photo : updatedUser.photo,
            bio : updatedUser.bio,
            phone : updatedUser.phone,
        })
    }else{
        res.status(404)
        throw new Error(`User Not Found !`)
    }

})
// ! UPDATE USER ! \\




// ! CHANGE PASSWORD ! \\
const ChangePassword = AsyncHandler(async(req,res) => {
    
    const user = await User.findById(req.user._id)

    const {oldPassword,password} = req.body

    if(!user){
        res.status(400)
        throw new Error(`User Not Found ! Login Please !`)
    }

    if(!oldPassword || !password){
        res.status(400)
        throw new Error(`Please Add Old and New Password !`)
    }

    // ? check if password and oldPassword matches in DB ? \\
    const passwordCorrect = await bcryptjs.compare(oldPassword,user.password)

    // ? save new password ? \\
    if(user && passwordCorrect){
        user.password = password
        await user.save()
        res.status(200).json({
            message:"Password Changed Successfully !",
        })
    }else{
        res.status(400)
        throw new Error(`Old Password Is Wrong !`)
    }

})
// ! CHANGE PASSWORD ! \\




// ! USER FORGOT PASSWORD ! \\
const ForgotPassword = AsyncHandler(async(req,res) => {

    const {email} = req.body

    const user = await User.findOne({email})

    if(!user){
        res.status(404)
        throw new Error(`User Doesnt Exist !`)
    }

    // ? delete token if exists in db ? \\
    let token = await Token.findOne({userId:user._id})

    if(token){
        await token.deleteOne()
    }

    // ? create reset token ? \\
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id

    // ? hash token before saving it into db ? \\
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // ? save token into db ? \\
    await new Token({
        userId:user._id,
        token:hashedToken,
        createdAt:Date.now(),
        expiresAt:Date.now() + 30 * 60 * 1000, // 30 minutes
    }).save()

    // ? construct reset url ? \\
    const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`

    // ? reset email ? \\
    const message = `
    <h2>Hello ${user.name}</h2>
    <p>This is your URL to reset your password</p>
    <p>This link will be valid for 30 minutes</p>
    
    <a href=${resetUrl} clicktracking="off">${resetUrl}</a>
    <p>Have A Nice Day ${user.name}</p>
    `

    const subject = "Password Reset Request"
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER

    try {
        await SendEmail(subject,message,send_to,sent_from)
        res.status(200).json({success: true, message: "Reset Email Sent !"})
    } catch (error) {
        res.status(500)
        throw new Error("Failed to Send Email !")
    }

})
// ! USER FORGOT PASSWORD ! \\





// ! RESET PASSWORD ! \\
const ResetPassword = AsyncHandler(async(req,res) => {

    const {password} = req.body
    const {resetToken} = req.params

    // ? hash token then compare to token that is in db ? \\
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // ? find the token in db ? \\
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: {$gt: Date.now()},
    })

    if(!userToken){
        res.status(404)
        throw new Error(`Invalid or Expired Token !`)
    }

    // ? find user ? \\
    const user = await User.findOne({_id:userToken.userId})

    user.password = password

    await user.save()

    res.status(200).json({
        message:"Message Reset Successful ! Please Login !"
    })

})
// ! RESET PASSWORD ! \\




module.exports = {RegisterUser,LoginUser,LogOutUser,GetUser,LoginStatus,UpdateUser,ChangePassword,ForgotPassword,ResetPassword}