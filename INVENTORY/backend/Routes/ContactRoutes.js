const express = require('express');
const Protect = require('../Middlewares/AuthMiddleware');
const { ContactUs } = require('../Controller/ContactController');



const ContactRouter = express.Router();


ContactRouter.post("/",Protect,ContactUs)



module.exports = ContactRouter;