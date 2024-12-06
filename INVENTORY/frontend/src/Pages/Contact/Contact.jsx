import { useState } from 'react'
import './Contact.scss'
import Card from '../../Components/Card/Card'
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../Services/AuthService';



const Contact = () => {

    const [subject,setSubject] = useState("")
    const [message,setMessage] = useState("")

    const data = {subject,message}

    const sendEmail = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/api/contactUs`, data, {
                withCredentials: true
            })
            setSubject("")
            setMessage("")
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

  return (
    <div className='contact'>
      
        <h3 className='--mt text-amber-500'>CONTACT US</h3>

        <div className='section'>
            
            <form onSubmit={sendEmail}>
                <Card cardClass="card">
                    <label className='text-blue-600'>SUBJECT</label>
                    <input type='text'placeholder='Subject' required value={subject} onChange={(e)=>setSubject(e.target.value)}/>
                    <label className='text-blue-600'>MESSAGE</label>
                    <textarea name='message' placeholder='Your Message' required value={message} onChange={(e)=>setMessage(e.target.value)} cols="30" rows="10"></textarea>
                    <button className='--btn --btn-primary --btn-block'>SEND</button>
                </Card>
            </form>
        
            <div className='details'>
                <Card cardClass={"card2"}>
                    <h3>CONTACT INFO</h3>
                    <p>If you want to contact us via other ways</p>
                    <div className='icons'>
                        <span className='mt-8'>
                            <FaPhone size={20}/>
                            <p>312312313</p>
                        </span>
                        <span className='mt-8'>
                            <MdEmail size={20}/>
                            <p>ahmetutkupelen@gmail.com</p>
                        </span>
                        <span className='mt-8'>
                            <FaLocationDot size={20}/>
                            <p>Izmir / Turkey</p>
                        </span>
                        <span className='mt-8'>
                            <FaGithub size={20}/>
                            <Link to='https://github.com/AhmetUtkuPelen' target='_blank' className='hover:text-amber-400'>Click Me</Link>
                        </span>
                    </div>
                </Card>
            </div>
        
        </div>

    </div>
  )
}

export default Contact