import { useDispatch, useSelector } from 'react-redux'
import RedirectLoggedOutUser from '../../Hook/RedirectLoggedOutUser'
import './ProductDetails.scss'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getSingleProduct } from '../../Redux/Slices/ProductSlice'
import { selectIsLoggedIn } from '../../Redux/Slices/AuthSlice'
import Card from '../Card/Card'
import { SpinnerImage } from '../Loader/Loader'
import DOMPurify from "dompurify"



const ProductDetails = () => {

  RedirectLoggedOutUser("/login")

  const dispatch = useDispatch()

  const {id} = useParams()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {product,isLoading,isError,message} = useSelector((state) => state.product)


  const stockStatus = (quantity) => {
    if(quantity > 0){
      return <span className='text-green-500'>IN STOCK</span>
    }
    return <span className='text-red-600'>OUT OF STOCK</span>
  }


  useEffect(() => {
    
    if(isLoggedIn === true){
      dispatch(getSingleProduct(id))
    }

    if(isError){
      console.log("Error fetching products:", message)
    }
  },[isLoggedIn,isError,message,dispatch])


  return (
    <div className='product-detail'>

      <h3 className='--mt'>PRODUCT DETAILS</h3>

      <Card cardClass="card">

        {isLoading && <SpinnerImage/>}

        {product && (
          <div className='detail'>
            <Card cardClass="group">
              {product?.image ? (
                <img src={product.image.filePath}/>
              ) : (
                <p>No Image Found For This Product</p>
              )}
            </Card>
            <h4>Product Availability : {stockStatus(product.quantity)}</h4>
            <hr/>
            <h4>
              <span className='bg-blue-600 text-white rounded'>&nbsp; NAME : &nbsp;</span> &nbsp;{product.name}
            </h4>

            <p className='bg-amber-400 text-white p-3 rounded-full'>
              <span className='text-blue-700 font-bold'>&nbsp; SKU :&nbsp; &nbsp;</span><span className='font-semibold text-2xl'>{product.sku}</span>
            </p>

            <p className='bg-amber-400 text-white p-3 rounded-full'>
              <span className='text-blue-700 font-bold'>&nbsp; CATEGORY :&nbsp; &nbsp;</span><span className='font-semibold text-2xl'>{product.category}</span>
            </p>

            <p className='bg-amber-400 text-white p-3 rounded-full'>
              <span className='text-blue-700 font-bold'>&nbsp; PRICE :&nbsp; &nbsp;</span><span className='font-semibold text-2xl'>{product.price}</span>
            </p>

            <p className='bg-amber-400 text-white p-3 rounded-full'>
              <span className='text-blue-700 font-bold'>&nbsp; IN STOCK :&nbsp; &nbsp;</span><span className='font-semibold text-2xl'>{product.quantity}</span>
            </p>

            <p className='bg-amber-400 text-white p-3 rounded-full'>
              <span className='text-blue-700 font-bold'>&nbsp; TOTAL VALUE IN STOCK :&nbsp; &nbsp;</span><span className='font-semibold text-2xl'>{product.quantity * product.price}</span>
            </p>

              <hr/>

              <div dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(product.description)}}>
              </div>

              <hr/>

                <code className='--color-dark text-2xl'>Created At : {product.createdAt.toLocaleString("en-US")}</code>
                <br/>
                <code className='--color-dark text-2xl'>Last Updated : {product.updatedAt.toLocaleString("en-US")}</code>

          </div>
        )}

      </Card>

    </div>
  )
}

export default ProductDetails