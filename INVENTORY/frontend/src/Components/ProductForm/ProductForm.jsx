import './ProductForm.scss'
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../Card/Card';

const ProductForm = ({
  product = {},
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct
}) => {
  return (
    <div className='add-product'>
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct} className='text-center'>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className='--color-dark'>Only jpg, png, and jpeg</code>
            <input 
              type='file' 
              name='image' 
              onChange={handleImageChange}
              accept=".jpg,.jpeg,.png"
            />
            {imagePreview ? (
              <div className='image-preview'>
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No Image For This Product</p>
            )}
          </Card>

          <label>Product Name</label>
          <input
            type='text'
            placeholder='Product Name'
            name='name'
            value={product.name || ""}
            onChange={handleInputChange}
          />

          <label>Product Category</label>
          <input
            type='text'
            placeholder='Product Category'
            name='category'
            value={product.category || ""}
            onChange={handleInputChange}
          />

          <label>Product Price</label>
          <input
            type='number'
            placeholder='Product Price'
            name='price'
            value={product.price || ""}
            onChange={handleInputChange}
          />

          <label>Product Quantity</label>
          <input
            type='number'
            placeholder='Product Quantity'
            name='quantity'
            value={product.quantity || ""}
            onChange={handleInputChange}
          />

          <label>Product Description</label>
          <ReactQuill
            theme='snow'
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className='--my'>
            <button className='--btn --btn-primary --btn-block' type='submit'>
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sku: PropTypes.string
  }),
  productImage: PropTypes.any,
  imagePreview: PropTypes.string,
  description: PropTypes.string,
  setDescription: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired
}

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm