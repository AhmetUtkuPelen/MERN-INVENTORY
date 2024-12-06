import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice"
import productReducer from "./Slices/ProductSlice"
import filterReducer from "./Slices/FilterSlice"



export const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        filter:filterReducer,
    }
})