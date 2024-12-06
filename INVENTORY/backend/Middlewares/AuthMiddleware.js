const AsyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');


const Protect = AsyncHandler(async(req,res,next) => {


    try {
        
        const token = req.cookies.token

        if(!token){
            res.status(401)
            throw new Error('Not Authorized, Login Is Required !')
        }

        // ? verify token ? \\
        const verified = jwt.verify(token,process.env.JWT_SECRET)

        // ? get user id from token ? \\
        const user = await User.findById(verified.id).select("-password")
        if(!user){
            res.status(401)
            throw new Error(`User Not Found !`)
        }

        req.user = user

        next()

    } catch (error) {
        res.status(401)
        throw new Error('Not Authorized, Login Is Required !')
    }

})

module.exports = Protect