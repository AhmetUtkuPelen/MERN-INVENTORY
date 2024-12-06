import './ProductSummary.scss'
import {AiFillDollarCircle} from "react-icons/ai"
import {BsCart4,BsCartX} from "react-icons/bs"
import { BiCategory } from 'react-icons/bi'
import InformationBoxes from '../InformationBoxes/InformationBoxes'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import { CALC_CATEGORY, CALC_OUT_OF_STOCK, CALC_STORE_VALUE, selectCategory, selectOutOfStock, selectTotalStoreValue } from '../../Redux/Slices/ProductSlice'
import { useEffect } from 'react'






// ? icons ? \\
const moneyIcon = <AiFillDollarCircle size={40} color='#fff'/>
const productIcon = <BsCart4 size={40} color='#fff'/>
const categoryIcon = <BiCategory size={40} color='#fff'/>
const NoStockIcon = <BsCartX size={40} color='#fff'/>
// ? icons ? \\




const ProductSummary = ({products}) => {

  const dispatch = useDispatch()

  const totalStoreValue = useSelector((state) => selectTotalStoreValue(state))

  const outOfStock = useSelector(selectOutOfStock)
  const category = useSelector(selectCategory)

  useEffect(()=>{
    dispatch(CALC_STORE_VALUE(products))
    dispatch(CALC_OUT_OF_STOCK(products))
    dispatch(CALC_CATEGORY(products))
  },[dispatch,products])

  return (
    <div className='product-summary'>
      
      <h3 className='--mt'>Inventory Stats</h3>

      <div className='info-summary'>
        <InformationBoxes icon={productIcon} title={"Total Products"} count={products.length} bgColor="card1" />
        <InformationBoxes icon={moneyIcon} title={"Total Store Value"} count={totalStoreValue} bgColor="card2" />
        <InformationBoxes icon={NoStockIcon} title={"Out Of Stock"} count={outOfStock} bgColor="card3" />
        <InformationBoxes icon={categoryIcon} title={"All Categories"} count={category.length} bgColor="card4" />
      </div>

    </div>
  )
}

export default ProductSummary


ProductSummary.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
};