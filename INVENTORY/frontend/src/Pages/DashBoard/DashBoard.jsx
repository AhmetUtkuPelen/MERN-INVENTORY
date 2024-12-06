import { useDispatch, useSelector } from "react-redux"
import RedirectLoggedOutUser from "../../Hook/RedirectLoggedOutUser"
import { selectIsLoggedIn } from "../../Redux/Slices/AuthSlice"
import { useEffect } from "react"
import { getProducts } from "../../Redux/Slices/ProductSlice"
import ProductList from "../../Components/ProductList/ProductList"
import ProductSummary from "../../Components/ProductSummary/ProductSummary"



const DashBoard = () => {

  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {products,isLoading,isError,message} = useSelector((state) => state.product)

  useEffect(() => {
    
    if(isLoggedIn === true){
      dispatch(getProducts())
    }

    if(isError){
      console.log("Error fetching products:", message)
    }
  },[isLoggedIn,isError,message,dispatch])

  RedirectLoggedOutUser("/login")

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={Array.isArray(products) ? products : []} isLoading={isLoading}/>
    </div>
  )
}

export default DashBoard