import React, { useEffect, useRef, useContext, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';
import { AuthContext } from './../../context/AuthContext';
import Logout from '../Logout/Logout'

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [logout,setLogout] = useState(0);

  // Dropdown state
  const [dropdown, setDropdown] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const nav_links = [
    { path: '/home', display: 'Home' },
    { path: '/pricing',display: 'Pricing'}
  ];

  if (user) {
    nav_links.push({
      path: '/profile',
      display: 'Profile'
    });
  }


  return (
    <header className="flex justify-between items-center header" >
        {/* Logo */}
        <div className="header_logo">
            <img src={logo} alt="logo-image" />
        </div>

        {/* Navigation menu */}
        <div className="gap-8 header_nav_links">
            {nav_links.map((item, index) => (
                <NavLink to={item.path} className={(navClass) => (navClass.isActive ? "header_nav_link active" : "header_nav_link")}>
                    {item.display}
                </NavLink>
            ))}
        </div>

        {/* User actions */}
        <div className="header_right">
            {user ? (
            <button className="text-white bg-black header_logout_bttn" onClick={()=>setLogout(1)}>Logout</button>
            ) : (
            <>
                <button className="text-black bg-white header_login_bttn" >
                    <Link to='/login'>Login</Link>
                </button>
                <button className="text-white header_register_bttn">
                    <Link to='/register'>Register</Link>
                </button>
            </>
            )}
        </div>

        {/* Mobile menu */}
        <div className='header_mobile_menu'>
            <div className='header_mobile_menu_logo'>
                {
                    dropdown?
                    <i class="ri-close-line" onClick={toggleDropdown}></i>
                    :
                    <i class="ri-menu-line" onClick={toggleDropdown}></i>                    
                }
            </div>
            {
                dropdown?
                <div className='flex flex-col header_mobile_menu_main'>
                    {nav_links.map((item, index) => (
                        <div className="mobile_menu_element">
                            <NavLink to={item.path} className={(navClass) => (navClass.isActive ? "header_nav_link active" : "header_nav_link")}>
                                {item.display}
                            </NavLink>
                        </div>
                    ))}
                    {user ? (
                        <div className="mobile_menu_element">
                            <button className="text-white bg-black header_logout_bttn" onClick={()=>setLogout(1)}>Logout</button>
                        </div>
                    ) : (
                        <>
                        <div className="mobile_menu_element">
                            <button className="text-black bg-white header_login_bttn" >
                                <Link to='/login'>Login</Link>
                            </button>
                        </div>
                        <div className="mobile_menu_element">
                            <button className="text-white header_register_bttn">
                                <Link to='/register'>Register</Link>
                            </button>
                        </div>
                        </>
                    )}
                </div>
                :
                <></>
            }
        </div>
        
      {
          logout?
          <Logout setLogout={setLogout}/>
          :
          <></>
      }
    </header>
  );
};

export default Header;
