import { SpinnerImage } from '../Loader/Loader'
import './ProductList.scss'
import PropTypes from 'prop-types';
import {FaEdit,FaTrashAlt} from "react-icons/fa"
import {AiOutlineEye} from "react-icons/ai"
import { useEffect, useState } from 'react';
import Search from '../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../Redux/Slices/FilterSlice';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteProduct, getProducts } from '../../Redux/Slices/ProductSlice';
import { Link } from 'react-router-dom';




const ProductList = ({products = [],isLoading}) => {

    const [search,setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage] = useState(5) // You can adjust this number

    const filteredProducts = useSelector(selectFilteredProducts)

    const dispatch = useDispatch()

    /**
     * Shortens a given text to a specified length.
     * 
     * @param {string} text - The text to be shortened.
     * @param {number} n - The length to which the text should be shortened.
     * @returns {string} The shortened text.
     */
    const shortenText = (text,n) => {
        if(text.length > n){
            const shortenedText = text.substring(0,n).concat("...")
            return shortenedText
        }
        return text
    }

    const delProduct = async (id) => {
        await dispatch(deleteProduct(id))
        await dispatch(getProducts())
    }


    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete Product',
            message: 'You sure you want to delete this product ?',
            buttons: [
              {
                label: 'Delete',
                onClick: () => delProduct(id)
              },
              {
                label: 'No',
                // onClick: () => alert('Click No')
              }
            ]
          });
        };

    // const submit = () => {
    //     confirmAlert({
    //       title: 'Confirm to submit',
    //       message: 'Are you sure to do this.',
    //       buttons: [
    //         {
    //           label: 'Yes',
    //           onClick: () => alert('Click Yes')
    //         },
    //         {
    //           label: 'No',
    //           onClick: () => alert('Click No')
    //         }
    //       ]
    //     });
    //   };

    // Calculate the products to display for the current page
    const offset = currentPage * itemsPerPage;
    const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

    // Handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    useEffect(()=>{
        dispatch(FILTER_PRODUCTS({products,search}))
    },[products,search,dispatch])


  return (
    <div className='product-list'>

        <hr/>

        <div className='table'>
            <div className='--flex-between --flex-dir-column'>
                <span>
                    <h3>Inventory Items</h3>
                </span>
                <span>
                    <Search value={search} onChange={(e)=>setSearch(e.target.value)} />
                </span>
            </div>

            {isLoading && <SpinnerImage/>}

            <div className='table'>
                {!isLoading && (!Array.isArray(products) || products.length === 0)  ? (
                    <p className='text-center'>No products found</p>
                ) : (
                    <>
                    <table>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Value</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentProducts.map((product,index) => {
                                const {_id,name,category} = product;
                                // Convert quantity and price to numbers
                                const quantity = Number(product.quantity);
                                const price = Number(product.price);
                                const value = quantity * price;
                                
                                return (
                                    <tr key={_id}>
                                        <td>{index + 1 + offset}</td>
                                        <td>{shortenText(name,16)}</td>
                                        <td>{category}</td>
                                        <td>{"$"}{price}</td>
                                        <td>{quantity}</td>
                                        <td>{"$"}{value.toFixed(2)}</td>
                                        <td className='icons'>
                                            <span>
                                                <Link to={`/productDetails/${_id}`}>
                                                    <AiOutlineEye size={25} color={"purple"}/>
                                                </Link>
                                            </span>
                                            <span>
                                                <Link to={`/editProduct/${_id}`}>
                                                    <FaEdit size={20} color={"green"}/>
                                                </Link>
                                            </span>
                                            <span>
                                                <Link>
                                                    <FaTrashAlt size={20} color={"red"} onClick={()=>confirmDelete(_id)}/>
                                                </Link>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={"← Prev"}
                        nextLabel={"Next →"}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        previousLinkClassName={"page-num"}
                        nextLinkClassName={"page-num"}
                        disabledClassName={"disabled"}
                        activeClassName={"activePage"}
                        pageClassName={"page-num"}
                    />
                    </>
                )}
            </div>

        </div>

        {/* <div className='container'>
            <button onClick={submit}>Confirm dialog</button>
        </div> */}

    </div>
  )
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default ProductList