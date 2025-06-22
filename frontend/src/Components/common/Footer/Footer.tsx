import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo.png';
import './Footer.css';
import { useAuth } from '../../../auth/AuthProvider';
import Logout from '../Logout/Logout';
import RouteConstants from '../../../constants/RouteConstants';

const Footer = () => {
  const { isAuthenticated } = useAuth();
  const [showLogout,setShowLogout] = useState<boolean>(false);

 
  const quick__links = [
    {path: RouteConstants.home,display: 'Home'},
    {path: RouteConstants.pricing, display: 'Pricing'}
  ];

  if (isAuthenticated) {
    quick__links.push({
      path: RouteConstants.profile,
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
                        isAuthenticated ? (
                        <div className="footer_link">
                            <Link to="" onClick={()=>setShowLogout(false)}>Logout</Link>
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
            showLogout?
            <Logout setShowLogout={setShowLogout} showLogout={showLogout}/>
            :
            <></>
        }
    </footer>
  );
};

export default memo(Footer);
