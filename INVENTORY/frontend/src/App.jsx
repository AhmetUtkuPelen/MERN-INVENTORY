import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ResetPassword from './Pages/Auth/ResetPassword';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import SideBar from './Components/SideBar/SideBar';
import Layout from './Components/Layout/Layout';
import DashBoard from './Pages/DashBoard/DashBoard';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetLoginStatus } from './Services/AuthService';
import { SET_LOGIN } from './Redux/Slices/AuthSlice';
import AddProduct from './Pages/AddProduct/AddProduct';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import EditProduct from './Pages/EditProduct/EditProduct';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';
import Contact from './Pages/Contact/Contact';




axios.defaults.withCredentials = true



function App() {

  const dispatch = useDispatch()

  // ? check if user is logged in or not to display buttons on header ? \\
  useEffect(()=>{
    async function LoginStatus(){
      const status = await GetLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    LoginStatus()
  },[dispatch])

  
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/resetpassword/:resetToken' element={<ResetPassword/>}/>
          <Route path='/forgot' element={<ForgotPassword/>}/>
          <Route path='/dashboard' element={<SideBar><Layout><DashBoard/></Layout></SideBar>}/>
          <Route path='/addProduct' element={<SideBar><Layout><AddProduct/></Layout></SideBar>}/>
          <Route path='/productDetails/:id' element={<SideBar><Layout><ProductDetails/></Layout></SideBar>}/>
          <Route path='/editProduct/:id' element={<SideBar><Layout><EditProduct/></Layout></SideBar>}/>
          <Route path='/profile' element={<SideBar><Layout><Profile/></Layout></SideBar>}/>
          <Route path='/editProfile' element={<SideBar><Layout><EditProfile/></Layout></SideBar>}/>
          <Route path='/contactUs' element={<SideBar><Layout><Contact/></Layout></SideBar>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App