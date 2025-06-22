import { memo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import './Header.css';
import { useAuth } from '../../../auth/AuthProvider';
import Logout from '../Logout/Logout';
import ColorConstants from '../../../constants/ColorConstants';
import { hexToRgba } from '../../../utils/color.utils';
import RouteConstants from '../../../constants/RouteConstants';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const [showLogout,setShowLogout] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState<boolean>(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const nav_links = [
    { path: RouteConstants.home, display: 'Home' },
    { path: RouteConstants.pricing, display: 'Pricing'}
  ];

  if (isAuthenticated) {
    nav_links.push({
      path: RouteConstants.profile,
      display: 'Profile'
    });
  }

  const NavigateTo = (to: string) => {
    setDropdown(false);
    navigate(to);
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
            {isAuthenticated ? (
            <button className="text-white bg-black header_logout_bttn" onClick={()=>setShowLogout(true)}>Logout</button>
            ) : (
            <>
                <button className="text-black bg-white header_login_bttn" 
                onClick={() => {
                    setDropdown(false);
                    navigate(RouteConstants.login)
                }}>
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
                    <i className="ri-close-line" onClick={toggleDropdown}></i>
                    :
                    <i className="ri-menu-line" onClick={toggleDropdown}></i>                    
                }
            </div>
            {
                dropdown?
                <div className='flex flex-col gap-[10px] header_mobile_menu_main p-[10px]'>
                    {nav_links.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => NavigateTo(item.path)} className='w-full py-[8px] font-medium rounded-[5px] text-center cursor-pointer' 
                            style={{color: location.pathname.includes(item.path) ? ColorConstants.secondaryColor : ColorConstants.black}}
                        >
                            {item.display}
                        </div>
                    ))}
                    {isAuthenticated ? (
                        <button className="text-white bg-black px-[20px] py-[8px] rounded-[10px]" onClick={()=>setShowLogout(true)}>Logout</button>
                    ) : (
                        <>
                            <button className="text-black font-medium w-full py-[8px] rounded-[5px]" style={{backgroundColor: ColorConstants.darkGrey}} onClick={() => {setDropdown(false); navigate(RouteConstants.login)}}>
                                <p className='m-0'>Login</p>
                            </button>
                            <button className="text-white font-medium py-[8px] rounded-[5px]" style={{backgroundColor: ColorConstants.secondaryColor}} onClick={() => {setDropdown(false); navigate(RouteConstants.register)}}>
                                <p className='m-0'>Register</p>
                            </button>
                        </>
                    )}
                </div>
                :
                <></>
            }
        </div>
        
      {
          showLogout?
          <Logout showLogout={showLogout} setShowLogout={setShowLogout}/>
          :
          <></>
      }
    </header>
  );
};

export default memo(Header);
