const AsyncHandler = require('express-async-handler');
const Product = require('../Models/ProductModel');
const { fileSizeFormatter } = require('../Utility/UploadFile');
const cloudinary = require('cloudinary').v2;



// ! CREATE PRODUCT ! \\
const CreateProduct = AsyncHandler(async(req,res) => {

    const {name,sku,category,quantity,price,description} = req.body

    // ? validation ? \\
    if(!name || !description || !category || !quantity || !price){
        res.status(400)
        throw new Error('All Fields Are Required ! ')
    }

    // ? image upload ? \\
    let fileData = {}
    if(req.file){
        // ? save image into cloudinary
        let uploadedFile;

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path,{folder:"INVENTORY",resource_type:"image"})
        } catch (error) {
            res.status(500)
            throw new Error('Failed To Upload Image, Please Try Again !')
        }

        fileData = {
            fileName:req.file.originalname,
            filePath:uploadedFile.secure_url,
            fileType:req.file.mimetype,
            fileSize:fileSizeFormatter(req.file.size,2),
        }
    }

    // ? create product ? \\
    const product = await Product.create({
        user:req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image:fileData,
    })

    res.status(201).json(product)

})
// ! CREATE PRODUCT ! \\




// ! GET ALL PRODUCTS ! \
const GetAllProducts = AsyncHandler(async(req,res) => {

    const products = await Product.find({user:req.user.id}).sort("-createdAt")

    res.status(200).json({products})

})
// ! GET ALL PRODUCTS ! \




// ! GET SINGLE PRODUCT ! \\
const GetSingleProduct = AsyncHandler(async(req,res) => {

    const product = await Product.findById(req.params.id)

    // ? check if product exists ? \\
    if(!product){
        res.status(404)
        throw new Error('Product Not Found !')
    }

    // ? match product to its user ? \\
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized To View This Product !')
    }

    res.status(200).json(product)

})
// ! GET SINGLE PRODUCT ! \\




// ! DELETE PRODUCT ! \\
const DeleteProduct = AsyncHandler(async(req,res) => {

    const product = await Product.findById(req.params.id)

    // ? check if product exists ? \\
    if(!product){
        res.status(404)
        throw new Error('Product Not Found !')
    }

    // ? match product to its user ? \\
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized To Delete This Product !')
    }

    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({message:"Product Deleted Successfully !"})

})
// ! DELETE PRODUCT ! \\




// ! UPDATE PRODUCT ! \\
const UpdateProduct = AsyncHandler(async(req,res) => {

    const {name,category,quantity,price,description} = req.body    

    const {id} = req.params

    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(404)
        throw new Error('Product Not Found !')
    }

    // ? match product to its user ? \\
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized To Delete This Product !')
    }

    // ? image upload ? \\
    let fileData = {}
    if(req.file){
        // ? save image into cloudinary
        let uploadedFile;
    
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path,{folder:"INVENTORY",resource_type:"image"})
        } catch (error) {
            res.status(500)
            throw new Error('Failed To Upload Image, Please Try Again !')
        }
    
        fileData = {
            fileName:req.file.originalname,
            filePath:uploadedFile.secure_url,
            fileType:req.file.mimetype,
            fileSize:fileSizeFormatter(req.file.size,2),
                }
        }

    // ? update product ? \\
    const updatedProduct = await Product.findByIdAndUpdate(
        {_id:id},
        {name,category,quantity,price,description,image:Object.keys(fileData).length === 0 ? product?.image : fileData},
        {new:true,runValidators:true}
    )

    res.status(200).json(updatedProduct)

})
// ! UPDATE PRODUCT ! \\





module.exports = {CreateProduct,GetAllProducts,GetSingleProduct,DeleteProduct,UpdateProduct}