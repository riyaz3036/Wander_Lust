import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginImages from '../Components/LoginImages/LoginImages';
import { AuthContext } from '../context/AuthContext';
import '../styles/login.css';
import { BASE_URL } from '../utils/config';


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
  const handleChange = (e: any) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
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
  
      if (result.data.role === 'admin') {
        navigate('/analytics');
      } else {
        navigate('/');
      }
    } catch (e: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: e.message });
    }
  };



  return (
    <div className="login_main">
        {/* Left Section */}
        <LoginImages />

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
  );
};


export default Login;
