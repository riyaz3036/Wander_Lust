import React, { useState, useContext, useEffect } from 'react';
import '../styles/login.css';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from './../context/AuthContext';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js';
import reg_img1 from '../assets/images/reg_img1.jpg'
import reg_img2 from '../assets/images/reg_img2.jpg'
import reg_img3 from '../assets/images/reg_img3.jpg'
import reg_img4 from '../assets/images/reg_img4.jpg'
import reg_img5 from '../assets/images/reg_img5.jpg'
import reg_img6 from '../assets/images/reg_img6.jpg'
import reg_img7 from '../assets/images/reg_img7.jpg'
import reg_img8 from '../assets/images/reg_img8.jpg'
import reg_img9 from '../assets/images/reg_img9.jpg'

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // Scroll to top on route change
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // State to store login details
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });
      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
      alert('Login Successful');
  
      // Redirect based on user role
      if (result.data.role === 'admin') {
        navigate('/add-tour');
      } else {
        navigate('/');
      }
    } catch (e) {
      dispatch({ type: 'LOGIN_FAILURE', payload: e.message });
    }
  };

  return (
    <div>
    <Header />
    <div className="login_main">
        {/* Left Section */}
        <div className="flex items-center justify-center items-start login_left">
            <div className="login_photos">
                <div className="login_photos_column">
                    <div className="login_photo">
                        <img src={reg_img1} alt="gallery-image"/>
                    </div>
                    <div className="login_photo">
                        <img src={reg_img2} alt="gallery-image"/>
                    </div>
                    <div className="login_photo">
                        <img src={reg_img3} alt="gallery-image"/>
                    </div>
                </div>
                <div className="login_photos_column">
                    <div className="login_photo">
                        <img src={reg_img4} alt="gallery-image"/>
                    </div>
                    <div className="login_photo">
                        <img src={reg_img5} alt="gallery-image"/>
                    </div>
                    <div className="login_photo">
                        <img src={reg_img6} alt="gallery-image"/>
                    </div>
                    <div className="login_photo">
                        <img src={reg_img9} alt="gallery-image"/>
                    </div>
                </div>
                <div className="login_photos_column">
                    <div className="login_photo">
                        <img src={reg_img7} alt="gallery-image"/>
                    </div>
                    <div className="login_photo">
                        <img src={reg_img8} alt="gallery-image"/>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center login_right">
            <p className="login_form_title">Login</p>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 login_form w-full px-5">
                <div className="login_form_element">
                    <label htmlFor="email">Email</label>
                    <input type="email" required id="email" name="email" value={credentials.email} onChange={handleChange} />
                </div>

                <div className="login_form_element">
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" name="password" value={credentials.password} onChange={handleChange} />
                </div>

                <div className="flex justify-center mt-2 login_form_bttn">
                    <button type="submit">Login</button>
                </div>

                <p className='text-center text-semibold'>Donot have an acoount? <a href="/register" className="cursor-pointer">Register</a></p>
            </form>
        </div>
    </div>
    <Footer />
</div>
  );
};

export default Login;
