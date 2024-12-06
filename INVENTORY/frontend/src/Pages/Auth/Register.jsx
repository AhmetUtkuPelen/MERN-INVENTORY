import { Link, useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import styles from "./Auth.module.scss"
import { TiUserAdd } from "react-icons/ti";
import { useState } from "react";
import { toast } from "react-toastify";
import { RegisterUser, ValidateEmail } from "../../Services/AuthService";
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME } from "../../Redux/Slices/AuthSlice";
import Loader from "../../Components/Loader/Loader";



const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
}


const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading,setIsLoading] = useState(false)
    const [formData,setFormData] = useState(initialState)

    const {name,email,password,password2} = formData

    const handleInputChange = (e) => {
        e.preventDefault()
        const {name,value} = e.target
        setFormData({...formData , [name]:value })
    }



    // ? REGISTER USER FUNCTION ? \\
    const register = async (e) => {
        e.preventDefault()

        if(!name || !email || !password){
            return toast.error(`Please Fill All Fields !`)
        }

        if(!ValidateEmail(email)){
            return toast.error(`Please Write A Valid Email !`)
        }

        if(password !== password2){
            return toast.error(`Passwords Dont Match !`)
        }

        if(password.length < 8){
            return toast.error(`Password Must Be At Least 8 Characters Long !`)
        }

        const userData = {
            name,email,password
        }

        setIsLoading(true)

        try {
            const data = await RegisterUser(userData)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.name))
            navigate('/login')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }

    }
    // ? REGISTER USER FUNCTION ? \\




  return (
    <div className={`container ${styles.auth}`}>
      
        {isLoading && <Loader/>}

    <Card>

        <div className={styles.form}>

            <div className="--flex-center">
                <TiUserAdd size={35} className="text-gray-800"/>
            </div>
        
            <h2 className="text-blue-600 mt-4">REGISTER</h2>

            <form onSubmit={register}>
                <input type="text" placeholder="Name" required name="name" value={name} onChange={handleInputChange}/>
                <input type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange}/>
                <input type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange}/>
                <input type="password" placeholder="RePassword" required name="password2" value={password2} onChange={handleInputChange}/>
                <button type="submit" className="--btn --btn-primary --btn-block">REGISTER</button>
            </form>

        <div className="text-center mt-4">
                <span className={styles.register}>
                    <Link to='/' className="text-blue-600 underline">&rarr;Home</Link>
                    <p>&nbsp; Already Have Account ? &nbsp; </p>
            <Link to='/login' className="text-blue-600 underline">&rarr;Login</Link>
                </span>
        </div>

        </div>

    </Card>

    </div>
  )
}

export default Register