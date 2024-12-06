const express = require('express');
const { RegisterUser, LoginUser, LogOutUser, GetUser, LoginStatus, UpdateUser, ChangePassword, ForgotPassword, ResetPassword } = require('../Controller/UserController');
const Protect = require('../Middlewares/AuthMiddleware');


const UserRouter = express.Router();




UserRouter.post("/register",RegisterUser)
UserRouter.post("/login",LoginUser)
UserRouter.get("/logout",LogOutUser)
UserRouter.get("/getUser",Protect,GetUser)
UserRouter.get("/loggedIn",LoginStatus)
UserRouter.patch("/updateUser",Protect,UpdateUser)
UserRouter.patch("/changePassword",Protect,ChangePassword)
UserRouter.post("/forgotPassword",Protect,ForgotPassword)
UserRouter.put("/resetPassword/:resetToken",Protect,ResetPassword)




module.exports = UserRouter;