import axios from "axios"

// ! BACKEND URL ! \\
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const API_URL = `${BACKEND_URL}/api/products/`

// ! CREATE NEW PRODUCT ! \\
const CreateProduct = async (formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Session Expired, Please Login To Continue");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    };

    try {
        const response = await axios.post(API_URL, formData, config);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        if (error.response?.status === 401) {
            throw new Error("Session Expired, Please Login To Continue");
        }
        throw error;
    }
}

// ! CREATE NEW PRODUCT ! \\





// ! GET ALL PRODUCTS ! \\
const GetProducts = async() => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Session Expired, Please Login To Continue");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await axios.get(API_URL, config);
        
        if (response.data) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error("API Error:", error);
        if (error.response?.status === 401) {
            throw new Error("Session Expired, Please Login To Continue");
        }
        throw error;
    }
}
// ! GET ALL PRODUCTS ! \\





// ! DELETE A PRODUCT ! \\
const DeleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Session Expired, Please Login To Continue");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(API_URL+id, config)
    return response.data
}
// ! DELETE A PRODUCT ! \\





// ! GET SINGLE PRODUCT ! \\
const GetSingleProduct = async(id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Session Expired, Please Login To Continue");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await axios.get(`${API_URL}${id}`, config);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        if (error.response?.status === 401) {
            throw new Error("Session Expired, Please Login To Continue");
        }
        throw error;
    }
}

// ! UPDATE PRODUCT ! \\
const UpdateProduct = async (id, formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Session Expired, Please Login To Continue");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    };

    try {
        const response = await axios.patch(`${API_URL}${id}`, formData, config);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        if (error.response?.status === 401) {
            throw new Error("Session Expired, Please Login To Continue");
        }
        throw error;
    }
}
// ! UPDATE PRODUCT ! \\






const productService = {
    CreateProduct, GetProducts, DeleteProduct, UpdateProduct, GetSingleProduct
}

export default productService