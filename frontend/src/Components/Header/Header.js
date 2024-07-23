import React, { useEffect, useRef, useContext, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';
import { AuthContext } from './../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  // Dropdown state
  const [dropdown, setDropdown] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    alert("Successfully Logged out!!");
  };

  const nav_links = [
    {
      path: '/home',
      display: 'Home'
    },
    {
      path: '/my-bookings',
      display: 'Bookings'
    },
    {
      path: '/pricing',
      display: 'Pricing'
    }
  ];

  if (user) {
    nav_links.push({
      path: '/profile',
      display: 'Profile'
    });
  }

  // Sticky header
  const headerRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef?.current.classList.add('sticky__header');
      } else {
        headerRef?.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo-top">
              <img className="logo-img" src={logo} alt="logo-image" />
            </div>

            {/* Navigation menu */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={(navClass) => (navClass.isActive ? "active__link" : "")}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* User actions */}
            <div className="navigation2">
              <div className="nav__right d-flex align-items-center gap-4">
                <div className="nav__btns d-flex align-items-center gap-4">
                  {user ? (
                    <Button className="btn btn-dark" onClick={logout}>Logout</Button>
                  ) : (
                    <>
                      <Button className="btn secondary__btn">
                        <Link to='/login'>Login</Link>
                      </Button>
                      <Button className="btn primary__btn">
                        <Link to='/register'>Register</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <div className='mobile__menu'>
              <i className="ri-menu-line" onClick={toggleDropdown}></i>
              <div className={dropdown ? 'dropdown__menu' : 'dropdown__menu_close'}>
                {nav_links.map((item, index) => (
                  <li className="dropdown__link" key={index}>
                    <Button className="btn secondary__btn">
                      <Link onClick={toggleDropdown} to={item.path}><span className="dropdown__text">{item.display}</span></Link>
                    </Button>
                  </li>
                ))}
                {user ? (
                  <li className="dropdown__link">
                    <Button className="btn btn-dark" onClick={() => { logout(); toggleDropdown(); }}>Logout</Button>
                  </li>
                ) : (
                  <>
                    <li className="dropdown__link">
                      <Button className="btn secondary__btn">
                        <Link to='/login'><span className="dropdown__text" onClick={toggleDropdown}>Login</span></Link>
                      </Button>
                    </li>
                    <li className="dropdown__link">
                      <Button className="btn primary__btn">
                        <Link to='/register' onClick={toggleDropdown}>Register</Link>
                      </Button>
                    </li>
                  </>
                )}
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
