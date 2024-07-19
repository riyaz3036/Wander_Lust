import React, { useState, useContext, useEffect } from 'react';
import '../styles/login.css';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from './../context/AuthContext';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js';

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
    <section>
      <Header />
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container">
              <div className="login__form">
                <h2 className="text-center">Login</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </section>
  );
};

export default Login;
