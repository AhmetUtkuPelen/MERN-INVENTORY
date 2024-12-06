import { TbPasswordUser } from "react-icons/tb";
import Card from "../../Components/Card/Card"
import styles from "./Auth.module.scss"
import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import { toast } from "react-toastify";
import { ResetPasswordCall } from "../../Services/AuthService";



const initialState = {
    password: "",
    password2:""
}



const ResetPassword = () => {

    const [formData,setFormData] = useState(initialState)

    const {password,password2} = formData

    const {resetToken} = useParams()

    const handleInputChange = (e) => {
        e.preventDefault()
        const {name,value} = e.target
        setFormData({...formData , [name]:value })
    }


    const reset = async (e) => {
        e.preventDefault();

        if(password.length < 8){
            return toast.error(`Password Must Be At Least 8 Characters Long !`)
        }

        if(password !== password2){
            return toast.error(`Passwords Needs To Match !`)
        }

        const userData = {
            password,password2
        }

        try {
            const data = await ResetPasswordCall(userData,resetToken)
            toast.success(data.message)
        } catch (error) {
            toast.error(error.message)
        }

    }


  return (
    <div className={`container ${styles.auth}`}>
      
    <Card>

        <div className={styles.form}>

            <div className="--flex-center">
                <TbPasswordUser size={35} className="text-gray-800"/>
            </div>
        
            <h2 className="text-blue-600 mt-4">RESET PASSWORD</h2>

            <form onSubmit={reset}>
                <input type="password" placeholder="New Password" required name="password" value={password} onChange={handleInputChange}/>
                <input type="password" placeholder="Confirm New Password" required name="password2" value={password2} onChange={handleInputChange}/>
                <button type="submit" className="--btn --btn-primary --btn-block">RESET PASSWORD</button>
            </form>

        <div className="mt-4">
                <div className={styles.register}>
                    <Link to='/' className="text-blue-600">&rarr; Home &nbsp;</Link>
                    <Link to='/login' className="text-blue-600">&nbsp; &rarr;Login</Link>
                </div>
        </div>

        </div>

    </Card>

    </div>
  )
}

export default ResetPassword