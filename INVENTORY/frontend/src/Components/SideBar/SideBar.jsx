import { useNavigate } from 'react-router-dom';
import './Sidebar.scss'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import SideBarItem from './SideBarItem';
import menu from '../Data/SideBarData';
import { IoLogoJavascript } from "react-icons/io5";



const SideBar = ({children}) => {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
  
    const GoHome = () => {
      navigate("/");
    };

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <IoLogoJavascript
              size={45}
              style={{ cursor: "pointer" }}
              onClick={GoHome}
            />
          </div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SideBarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  )
}

export default SideBar


SideBar.propTypes = {
    children: PropTypes.node.isRequired,
  };