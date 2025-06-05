import { message } from "antd";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { LoginRequest } from "../types/auth.types";
import AuthService from "../service/auth.service";
import { authStore } from "../store/auth.store";
import { setAccessTokenInCookie } from "../utils/cookie.utils";
import RouteConstants from "../constants/RouteConstants";
import LoginImages from "../components/Login/LoginImages/LoginImages";
import LoadingOverlay from "../components/common/LoadingOverlay/LoadingOverlay";



const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  // Scroll to top on route change
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // State to store login details
  const [credentials, setCredentials] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e: any) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };


  // Handle form submission
  const handleLogin = (e: any) => {
      e.preventDefault();
      setLoading(true);
      AuthService.login(credentials)
          .then((response) => {
              const accessToken: string = response.data.token;
              authStore.setAccessToken(accessToken);
              authStore.setUser({
                  id: response.data._id,
                  username: response.data.username,
                  email: response.data.email,
                  phone: response.data.phone,
                  image: response.data.image,
                  balance: response.data.balance,
                  membership: response.data.membership,
                  role: response.data.role
              });
              authStore.setIsAuthenticated(true);
              setAccessTokenInCookie(accessToken);
              message.success('Login Successful!')
              navigate(RouteConstants.home);
          })
          .catch((error) => {
              console.error('Error while login.', error);
              message.error(error.response.data.message || 'Error while login.');
          })
          .finally(() => {
              setLoading(false);
          });
  };


  return (
    <div className="login_main p-[30px]">
        {/* Left Section */}
        <div className="flex flex-col items-center">
            <p className="login_form_title">Login</p>

            <form onSubmit={handleLogin} className="flex flex-col items-center gap-3 login_form w-full px-5">
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

                <p className='text-center text-semibold'>Don't have an account? <a href="/register" className="cursor-pointer">Register</a></p>
            </form>
        </div>

        {/* Right Section */}
        <LoginImages />
       

        {/* Loader */}
        {loading && <LoadingOverlay />}
    </div>
  );
};


export default Login;
