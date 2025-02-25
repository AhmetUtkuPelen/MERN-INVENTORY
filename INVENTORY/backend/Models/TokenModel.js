const mongoose = require('mongoose');



const TokenSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    token:{
        type:String,
        required:true,
        unique:true,
    },
    createdAt:{
        type:Date,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
    },
})


const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;