import { useState } from "react"
import ProductForm from "../../Components/ProductForm/ProductForm"
import { useDispatch, useSelector } from "react-redux"
import { createProduct, selectIsLoading } from "../../Redux/Slices/ProductSlice"
import { useNavigate } from "react-router-dom"
import Loader from "../../Components/Loader/Loader"



const initialState = {
    name:"",
    category:"",
    price:"",
    quantity:""
}



const AddProduct = () => {

    const [product,setProduct] = useState(initialState)
    const [productImage,setProductImage] = useState("")
    const [imagePreview,setImagePreview] = useState(null)
    const [description,setDescription] = useState("")

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const isLoading = useSelector(selectIsLoading)

    const {name,category,price,quantity} = product

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setProduct({...product,[name]:value})
    }

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const generateSKU = (category) => {
        const letter = category.slice(0,3).toUpperCase()
        const number = Date.now()
        const sku = letter+"-"+number
        return sku
    }


    const saveProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name",name)
        formData.append("sku",generateSKU(category))
        formData.append("category",category)
        formData.append("quantity",quantity)
        formData.append("price",price)
        formData.append("description",description)
        formData.append("image",productImage)
        await dispatch(createProduct(formData))
        navigate("/dashboard")
    }


  return (
    <div>
    {isLoading && <Loader/>}
      <h3 className="--mt">ADD NEW PRODUCT</h3>
      <ProductForm product={product} productImage={productImage} imagePreview={imagePreview} description={description} setDescription={setDescription} handleInputChange={handleInputChange} handleImageChange={handleImageChange} saveProduct={saveProduct} />
    </div>
  )
}

export default AddProduct
