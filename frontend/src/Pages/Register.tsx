import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLoader from '../Components/common/FullPageLoader/PageLoader';
import LoginImages from '../Components/Login/LoginImages/LoginImages';
import RouteConstants from '../constants/RouteConstants';
import { RolesEnum } from '../enums/roles.enum';
import AuthService from '../service/auth.service';
import '../styles/register.css';
import { RegisterRequest } from '../types/auth.types';


const Register = () => {
    // To store all the registration details
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<RegisterRequest>({
        username: '',
        password: '',
        email: '',
        phone: '',
        role: RolesEnum.USER,
        ADMIN_KEY: '',
    });
    

    // To scroll to top
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

  
    // Handling change and submit
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    };


    // Handle register 
    const handleRegister = (e: any) => {
        e.preventDefault();
        setLoading(true);
        AuthService.register(details)
            .then((response: any) => {
                message.success('Registered Successfully');
                navigate(RouteConstants.login);
            })
            .catch((error) => {
                console.error('Error while registering.', error);
                message.error(error.response.data.message || 'Error while registering.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="register_main p-[30px]">
            {/* Left Section */}
            <div className="flex flex-col items-center">
                <p className="register_form_title">Register</p>

                <form onSubmit={handleRegister} className="flex flex-col gap-3 register_form">
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

            {/* Right Section */}
            <LoginImages />

            {/* Loader */}
            {loading && <PageLoader />}
        </div>
    );
};

export default Register;
