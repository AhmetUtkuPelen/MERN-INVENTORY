const express = require('express');
const { CreateProduct, GetAllProducts, GetSingleProduct, DeleteProduct, UpdateProduct } = require('../Controller/ProductController');
const Protect = require('../Middlewares/AuthMiddleware');
const {upload} = require('../Utility/UploadFile');



const ProductRouter = express.Router();



ProductRouter.post("/",Protect,upload.single("image"),CreateProduct)
ProductRouter.get("/",Protect,GetAllProducts)
ProductRouter.get("/:id",Protect,GetSingleProduct)
ProductRouter.delete("/:id",Protect,DeleteProduct)
ProductRouter.patch("/:id",Protect,upload.single("image"),UpdateProduct)





module.exports = ProductRouter;