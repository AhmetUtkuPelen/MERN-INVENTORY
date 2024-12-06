import axios from "axios"
import {toast} from "react-toastify"




export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL




export const ValidateEmail = (email) => {

    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

}




// ! REGISTER USER ! \\
export const RegisterUser = async (userData) => {

    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`,userData,
            {withCredentials:true})
            if(response.statusText === "OK"){
                toast.success("User Registered Successfully !")
            }
            return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString()
        toast.error(message)
    }

}
// ! REGISTER USER ! \\




// ! LOGIN USER ! \\
export const LoginUser = async (userData) => {

    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`,userData,
            {withCredentials:true})
            if(response.statusText === "OK"){
                toast.success("User Logged In Successfully !")
            }
            return response.data
    } catch (error) {
        const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }

}
// ! LOGIN USER ! \\




// ! LOGOUT USER ! \\
export const LogoutUser = async () => {

    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`,
            {withCredentials:true})
    } catch (error) {
        const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }

}
// ! LOGOUT USER ! \\




// ! FORGOT PASSWORD ! \\
export const ForgotPasswordCall = async (userData) => {

    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotPassword`,userData,
            {withCredentials:true})
            toast.success(response.data.message)
    } catch (error) {
        const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }

}
// ! FORGOT PASSWORD ! \\




// ! RESET PASSWORD ! \\
export const ResetPasswordCall = async (userData,resetToken) => {

    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/resetPassword/${resetToken}`,userData,
            {withCredentials:true})
            return response.data
    } catch (error) {
        const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }

}
// ! RESET PASSWORD ! \\




// ! GET LOGIN STATUS ! \\
export const GetLoginStatus = async () => {

    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedIn`,
            {withCredentials:true})
            return response.data
    } catch (error) {
        const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }

}
// ! GET LOGIN STATUS  ! \\





// ! GET USER PROFILE ! \\
export const GetUser = async () => {

    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getUser`,
            {withCredentials:true})
            return response.data
    } catch (error) {
        const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }

}
// ! GET USER PROFILE ! \\




// ! UPDATE PROFILE ! \\
export const UpdateProfile = async (formData) => {

    try {
        const response = await axios.patch(`${BACKEND_URL}/api/users/updateUser`,formData,
            {withCredentials:true})
            return response.data
    } catch (error) {
        const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }

}
// ! UPDATE PROFILE ! \\






// ! CHANGE PASSWORD ! \\
export const ChangeUserPassword = async (formData) => {

    try {
        const response = await axios.patch(`${BACKEND_URL}/api/users/changePassword`,formData,
            {withCredentials:true})
            return response.data
    } catch (error) {
        const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }

}
// ! CHANGE PASSWORD ! \\
