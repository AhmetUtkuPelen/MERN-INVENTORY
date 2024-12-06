import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import productService from '../../Services/ProductServices';
import { toast } from 'react-toastify';

const initialState = {
    product:null,
    products:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
    totalStoreValue:0,
    outOfStock:0,
    category:"",
}



// ? create new product ? \\
export const createProduct = createAsyncThunk(
    "products/create",
    async (formData,thunkAPI) => {
        try {
            const data = await productService.CreateProduct(formData);
            return data;
        } catch (error) {
            console.error("Thunk error:", error);
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// ? create new product ? \\





// ? get all products ? \\
export const getProducts = createAsyncThunk(
    "products/getAll",
    async (_,thunkAPI) => {
        try {
            const data = await productService.GetProducts();
            return data;
        } catch (error) {
            console.error("Thunk error:", error);
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// ? get all products ? \\






// ? delete a products ? \\
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id,thunkAPI) => {
        try {
            const data = await productService.DeleteProduct(id);
            return data;
        } catch (error) {
            console.error("Thunk error:", error);
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// ? delete a products ? \\





// ? update product ? \\
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({id,formData},thunkAPI) => {
        try {
            return await productService.UpdateProduct(id,formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// ? update product ? \\





// ? get single product ? \\
export const getSingleProduct = createAsyncThunk(
    "products/getSingle",
    async (id, thunkAPI) => {
        try {
            const data = await productService.GetSingleProduct(id);
            return data;
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// ? get single product ? \\








const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state,action){
        const products = action.payload
        const array = []
        products.map((item) => {
            const {price,quantity} = item
            const productValue = price * quantity
            return array.push(productValue)
        })
        const totalValue = array.reduce((a,b) => {
            return a + b
        },0)
        state.totalStoreValue = totalValue
    },
    CALC_OUT_OF_STOCK(state,action){
        const products = action.payload
        const array = []
        products.map((item) => {
            const { quantity } = item
            return array.push(quantity)
        })
        let count= 0
        array.forEach((number) => {
            if(number === 0 || number === "0"){
                count += 1
            }
        })
        state.outOfStock = count
    },
    CALC_CATEGORY(state,action){
        const products = action.payload
        const array = []
        products.map((item) => {
            const { category } = item
            return array.push(category)
        })
        const uniqueCategories = [...new Set(array)];
        state.category = uniqueCategories
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending,(state) => {
        state.isLoading = true
    })
    .addCase(createProduct.fulfilled,(state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Ensure products is an array before pushing
        if (!Array.isArray(state.products)) {
            state.products = [];
        }
        state.products = [...state.products, action.payload];
        toast.success("Product Created Successfully !")
    })
    .addCase(createProduct.rejected,(state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
    })
    .addCase(getProducts.pending,(state) => {
        state.isLoading = true
    })
    .addCase(getProducts.fulfilled,(state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // Extract products array from the payload
        state.products = action.payload?.products || [];
    })
    .addCase(getProducts.rejected,(state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
    })
    .addCase(deleteProduct.pending,(state) => {
        state.isLoading = true
    })
    .addCase(deleteProduct.fulfilled,(state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // Extract products array from the payload
        state.products = action.payload?.products || [];
        toast.success("Product Deleted Successfully !")
    })
    .addCase(deleteProduct.rejected,(state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
    })
    .addCase(updateProduct.pending,(state) => {
        state.isLoading = true
    })
    .addCase(updateProduct.fulfilled,(state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product Updated Successfully!")
        console.log(action.payload);
    })
    .addCase(updateProduct.rejected,(state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
    })
    .addCase(getSingleProduct.pending,(state) => {
        state.isLoading = true
    })
    .addCase(getSingleProduct.fulfilled,(state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
    })
    .addCase(getSingleProduct.rejected,(state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
    })
  },
});

export const {CALC_STORE_VALUE,CALC_OUT_OF_STOCK,CALC_CATEGORY} = ProductSlice.actions

export const selectIsLoading = (state) => state.product?.isLoading;

export const selectProduct = (state) => state.product?.product

export const selectTotalStoreValue = (state) => state.product?.totalStoreValue || 0;

export const selectOutOfStock = (state) => state.product?.outOfStock || 0;

export const selectCategory = (state) => state.product?.category

export default ProductSlice.reducer