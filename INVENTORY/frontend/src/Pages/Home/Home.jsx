import './Home.scss'
import { IoLogoJavascript } from "react-icons/io5";
import {Link} from "react-router-dom"
import HeroImage from "../../Assets/warehouse.png"
import { ShowLinksOnLogin, ShowLinksOnLogOut } from '../../Components/Protect/ShowLinksOnLogin';



const Home = () => {
  return (
    <div className='home'>
      
      {/* ? NAV ? */}
      <nav className='container --flex-between'>

        <div className='logo'>
          <Link to='/'><IoLogoJavascript size={54} color='yellow'/></Link>
        </div>

        <ul className='home-links'>
        
        <ShowLinksOnLogOut>
          <li><button className='--btn --btn-primary'><Link to='/register'>REGISTER</Link></button></li>
        </ShowLinksOnLogOut>
        
        <ShowLinksOnLogOut>
          <li><button className='--btn --btn-primary'><Link to='/login'>LOGIN</Link></button></li>
        </ShowLinksOnLogOut>

        <ShowLinksOnLogin>
          <li><button className='--btn --btn-primary'><Link to='/dashboard'>DASHBOARD</Link></button></li>
        </ShowLinksOnLogin>
        </ul>

      </nav>
      {/* ? NAV ?  */}


      {/* ? HERO ?  */}

      <section className='container hero'>
        
        <div className='hero-text'>
          <h2 className='font-bold text-center'>Inventory Management System</h2>
          <p className='text-center'>Inventory system to control and manage your products in the warehouse</p>
        </div>

        <div className='hero-image'>
          <img src={HeroImage} className='rounded border-white border-[3px]'/>
        </div>
      
      </section>

      {/* ? HERO ?  */}


    </div>
  )
}

export default Home