import React, { useContext,useState } from 'react';
import './Footer.css';
import { Row, Col, Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { AuthContext } from "./../../context/AuthContext";
import Logout from '../Logout/Logout'

const Footer = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [logout,setLogout] = useState(0);

 
  const quick__links = [
    {path: '/home',display: 'Home'},
    {path: '/pricing', display: 'Pricing'}
  ];

  if (user) {
    quick__links.push({
      path: '/profile',
      display: 'Profile'
    });
  }

  return (
    <footer className="footer">
        <div className="flex flex-wrap gap-5 justify-between footer_main">
            <div className="footer_company_desc">
                <div className="footer_logo">
                    <img src={Logo} alt="logo" />
                </div>
                <p>We offer curated travel experiences, blending luxury with exploration, to create unforgettable journeys around the globe. Discover hidden gems and exclusive destinations tailored to your unique preferences.</p>
            </div>

            <div className="flex flex-wrap gap-5 footer_links">
                <div className="footer_links_section">
                    <h5 className="footer_links_title">Discover</h5>
                    <div className="footer_links_section_main">
                    {
                        quick__links.map((item, index) => (
                        <div key={index} className="footer_link">
                            <Link to={item.path}>{item.display}</Link>
                        </div>
                        ))
                    }
                    </div>
                </div>

                <div className="footer_links_section">
                    <h5 className="footer_links_title">Quick Links</h5>
                    <div className="footer_links_section_main">
                    {
                        user ? (
                        <div className="footer_link">
                            <Link to="" onClick={()=>setLogout(1)}>Logout</Link>
                        </div>
                        ) : (
                        <>
                            <div className="footer_link">
                                <Link to="/login">Login</Link>
                            </div>
                            <div className="footer_link">
                                <Link to="/register">Register</Link>
                            </div>
                        </>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
            
        {/* Copyright */}
        <div className="footer_copyright">
            <p>developed by MD RIYAZ AHMED</p>
        </div>
          
       
        {/* Logout dialogue box */}
        {
            logout?
            <Logout setLogout={setLogout}/>
            :
            <></>
        }
    </footer>
  );
};

export default Footer;
