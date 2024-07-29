import React, { useState, useContext, useEffect } from 'react';
import '../styles/register.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from '../context/AuthContext.js';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js';
import RegisterImages from '../Components/RegisterImages/RegisterImages.js'


const Register = () => {
    // To store all the registration details
    const [details, setDetails] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        role: 'user',
        ADMIN_KEY: '',
    });

    // To scroll to top
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handling change and submit
    const handleChange = (e) => {
        const { id, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(details.role==='admin' && details.ADMIN_KEY===''){
            alert('Please enter the ADMIN KEY to register as an admin');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(details),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Successfully Registered!!! Please login');
                dispatch({ type: 'REGISTER_SUCCESS' });
                navigate('/login');
            } else {
                alert(data.message || 'Registration failed. Please try again.');
                window.location.reload();
            }
        } catch (err) {
            alert(err.message || 'Registration Failed!!');
        }
    };

    return (
        <div>
            <Header />
            <div className="register_main">
                {/* Left Section */}
                <RegisterImages />

                {/* Right Section */}
                <div className="flex flex-col items-center register_right">
                    <p className="register_form_title">Register</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 register_form">
                        <div className="register_form_container">
                            <div className="register_form_element">
                                <label htmlFor="username">Full Name</label>
                                <input type="text" required id="username" name="username" value={details.username} onChange={handleChange} />
                            </div>

                            <div className="register_form_element">
                                <label htmlFor="password">Password</label>
                                <input type="password" required id="password" name="password" value={details.password} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="register_form_container">
                            <div className="register_form_element">
                                <label htmlFor="email">Email</label>
                                <input type="email" required id="email" name="email" value={details.email} onChange={handleChange} />
                            </div>

                            <div className="register_form_element">
                                <label htmlFor="phone">Phone</label>
                                <input type="number" required id="phone" name="phone" value={details.phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="register_form_element_2">
                            <label htmlFor="role">Role</label>
                            <select id="role" name="role" onChange={handleChange} value={details.role} required>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {details.role === 'admin' && (
                            <div className="register_form_element_2">
                                <label htmlFor="ADMIN_KEY">Admin Key</label>
                                <input type="password" required id="ADMIN_KEY" name="ADMIN_KEY" value={details.ADMIN_KEY} onChange={handleChange} />
                            </div>
                        )}

                        <div className="flex justify-center mt-2 register_form_bttn">
                            <button type="submit">Register</button>
                        </div>

                        <p className='text-center text-semibold'>Aready have an acoount? <a href="/login" className="cursor-pointer">Login</a></p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
