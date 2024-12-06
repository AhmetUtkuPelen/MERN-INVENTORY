import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GetLoginStatus } from "../Services/AuthService"
import { SET_LOGIN } from "../Redux/Slices/AuthSlice"
import { toast } from "react-toastify"




const RedirectLoggedOutUser = (path) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(()=>{
        
        const LoggedOutUserRedirect = async () => {
            const isLoggedIn = await GetLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))
            if(!isLoggedIn){
                toast.info(`Session Expired , Please Login To Continue`)
                navigate(path)
                return
            }
        }
        LoggedOutUserRedirect()
    },[navigate,path,dispatch])

}

export default RedirectLoggedOutUser