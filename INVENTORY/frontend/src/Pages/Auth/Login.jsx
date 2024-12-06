import { Link, useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import styles from "./Auth.module.scss"
import { IoIosLogIn } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoginUser, ValidateEmail } from "../../Services/AuthService";
import { SET_LOGIN, SET_NAME } from "../../Redux/Slices/AuthSlice";
import Loader from "../../Components/Loader/Loader";




const initialState = {
    email: "",
    password: "",
}



const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading,setIsLoading] = useState(false)
    const [formData,setFormData] = useState(initialState)

    const {email,password} = formData

    const handleInputChange = (e) => {
        e.preventDefault()
        const {name,value} = e.target
        setFormData({...formData , [name]:value })
    }

    const login = async (e) => {
        e.preventDefault()
        
        if(!email || !password){
            return toast.error(`Please Fill All Fields !`)
        }

        if(!ValidateEmail(email)){
            return toast.error(`Please Write A Valid Email !`)
        }
    
        if(password.length < 8){
            return toast.error(`Password Must Be At Least 8 Characters Long !`)
        }

        const userData = {
            email,password
        }

        setIsLoading(true)

        try {
            const data = await LoginUser(userData)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.name))
            navigate('/dashboard')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }

    }


  return (
    <div className={`container ${styles.auth}`}>
      
      {isLoading && <Loader/>}

    <Card>

        <div className={styles.form}>

            <div className="--flex-center">
                <IoIosLogIn size={35} className="text-gray-800"/>
            </div>
        
            <h2 className="text-blue-600 mt-4">LOGIN</h2>

            <form onSubmit={login}>
                <input type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange}/>
                <input type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange}/>
                <button type="submit" className="--btn --btn-primary --btn-block">LOGIN</button>
            </form>

        <div className="text-center mt-4">
            <Link to='/forgot' className="text-red-700 text-center">Forgot Password</Link>
                <span className={styles.register}>
                    <Link to='/' className="text-blue-600 underline">&rarr;Home</Link>
                    <p>&nbsp; Dont Have Account ? &nbsp; </p>
            <Link to='/register' className="text-blue-600 underline">&rarr;Register</Link>
                </span>
        </div>

        </div>

    </Card>

    </div>
  )
}

export default Login
