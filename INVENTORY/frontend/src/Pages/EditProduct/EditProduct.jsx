import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleProduct, selectIsLoading, selectProduct, updateProduct } from "../../Redux/Slices/ProductSlice"
import { useEffect, useState } from "react"
import Loader from "../../Components/Loader/Loader"
import ProductForm from "../../Components/ProductForm/ProductForm"

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  sku: ""
}

const EditProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const isLoading = useSelector(selectIsLoading)
  const productEdit = useSelector(selectProduct)
  
  const [product, setProduct] = useState(initialState)
  const [productImage, setProductImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState("")

  useEffect(() => {
    dispatch(getSingleProduct(id))
  }, [dispatch, id])

  useEffect(() => {
    if (productEdit) {
      setProduct({
        name: productEdit.name || "",
        category: productEdit.category || "",
        quantity: productEdit.quantity || "",
        price: productEdit.price || "",
        sku: productEdit.sku || ""
      })
      setImagePreview(
        productEdit.image ? `${productEdit.image.filePath}` : null
      )
      setDescription(
        productEdit.description || ""
      )
    }
  }, [productEdit])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProductImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", product?.name)
    formData.append("sku", product?.sku)
    formData.append("category", product?.category)
    formData.append("quantity", product?.quantity)
    formData.append("price", product?.price)
    formData.append("description", description)
    if (productImage) {
      formData.append("image", productImage)
    }

    await dispatch(updateProduct({ id, formData }))
    navigate("/dashboard")
  }

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt2">Edit Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  )
}

export default EditProduct
