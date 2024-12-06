import { useState } from 'react'
import './ChangePassword.scss'
import { toast } from 'react-toastify'
import { ChangeUserPassword } from './../../Services/AuthService';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';


const initialState = {
    oldPassword:"",
    password:"",
    password2:""       
}


const ChangePassword = () => {

    const [formData,setFormData] = useState(initialState)

    const {oldPassword,password,password2} = formData

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
    }


    const changePassword = async (e) => {
        e.preventDefault()
        if(password !== password2){
            return toast.error(`Passwords Do Not Match !`)
        }

        const formData = {oldPassword,password}

        const data = await ChangeUserPassword(formData)

        toast.success(data)

        navigate('/profile')

    }


  return (
    <div className='change-password'>
      
        <Card cardClass={"password-card"}>
            <h3 className='text-blue-600'>Change Password</h3>
            <form onSubmit={changePassword} className='--form-control'>
                <input type='password' placeholder='Old Password' required name='oldPassword' value={oldPassword} onChange={handleInputChange}/>
                <input type='password' placeholder='New Password' required name='password' value={password} onChange={handleInputChange}/>
                <input type='password' placeholder='Confirm New Password' required name='password2' value={password2} onChange={handleInputChange}/>
                <button type='submit' className='--btn --btn-primary    '>RESET PASSWORD</button>
            </form>
        </Card>

    </div>
  )
}

export default ChangePassword