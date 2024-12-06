import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import styles from "./Auth.module.scss"
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { ValidateEmail } from "../../Services/AuthService";
import { toast } from "react-toastify";
import { ForgotPasswordCall } from "../../Services/AuthService";




const ForgotPassword = () => {

    const [email,setEmail] = useState("")

    const forgot = async (e) => {
        e.preventDefault();

        if(!email){
            return toast.error(`Please Type An Email !`)
        }

        if(!ValidateEmail(email)){
            return toast.error(`Please Write A Valid Email !`)
        }

        const userData = {
            email
        }

        await ForgotPasswordCall(userData)

        setEmail("")

    }

  return (
    <div className={`container ${styles.auth}`}>
      
    <Card>

        <div className={styles.form}>

            <div className="--flex-center">
                <MdEmail size={35} className="text-gray-800"/>
            </div>
        
            <h2 className="text-blue-600 mt-4">FORGOT PASSWORD</h2>

            <form onSubmit={forgot}>
                <input type="email" placeholder="Email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <button type="submit" className="--btn --btn-primary --btn-block">GET RESET EMAIL</button>
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

export default ForgotPassword
