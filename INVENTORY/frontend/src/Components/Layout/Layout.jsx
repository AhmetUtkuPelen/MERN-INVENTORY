import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import PropTypes from 'prop-types';


const Layout = ({children}) => {
  return (
    <div>
      <Header/>
      <div style={{minHeight:"80vh"}} className="--pad">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout


Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };