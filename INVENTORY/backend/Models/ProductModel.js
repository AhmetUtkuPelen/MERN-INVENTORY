const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Add A Name !"],
        minlength: 3,
        maxlength: 50,
        trim:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User',
    },
    sku:{
        type: String,
        required: true,
        trim:true,
        default :'SKU',
    },
    category:{
        type: String,
        required: [true,"Please Add A Category !"],
        trim:true,
    },
    quantity:{
        type: String,
        required: [true,"Please Add A Quantity !"],
        min: 0,
    },
    price:{
        type: Number,
        required: [true,"Please Add A Price !"],
        min: 0,
    },
    description:{
        type: String,
        required: [true,"Please Add A Description !"],
        maxlength: 2000,
        trim:true,
    },
    image:{
        type:Object,
        default:{},
    },
},{timestamps:true})


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;