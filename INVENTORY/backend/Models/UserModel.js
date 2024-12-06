const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please Write A Name'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        required: [true,'Please Write A Email'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please Enter A Valid Email"],
        trim:true,
    },
    password:{
        type: String,
        required: [true,'Please Write A Password'],
        minlength: 8,
        maxlength: 100,
    },
    photo:{
        type:String,
        required:[true,"Please Add A Photo"],
        default:"https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg",
    },
    phone:{
        type:String,
    },
    bio:{
        type: String,
        maxlength: 500,
        default: "This is a default bio. You can update it.",
    },
},{timestamps:true})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        return next()
    }

    // ? bcrypt password - encrypt password before saving into db ? \\
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(this.password, salt)
    this.password =hashedPassword

})

const User = mongoose.model('User', userSchema);

module.exports = User;