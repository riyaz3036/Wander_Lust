import React, { useState, useContext, useEffect } from 'react';
import '../styles/register.css';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from '../context/AuthContext';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js';

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

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      console.log(res);
      
      if (res.ok) {
        alert('Successfully Registered!!! Please login');
      }
      else{
         alert(res.message || 'Registration failed. Please try again.');
         window.location.reload();
      }

      dispatch({ type: 'REGISTER_SUCCESS' });
      navigate('/login');
    } catch (err) {
        alert(err.message || 'Registration Failed!!');
    }
  };

  return (
    <section>
      <Header />
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="register__container">
              <div className="register__form">
                <h2 className="text-center">Register</h2>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input type="text" placeholder="Username" required id="username" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder="Phone Number" required id="phone" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <select id="role" onChange={handleChange} defaultValue="user" required>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </FormGroup>
                  {details.role === 'admin' ? (
                    <FormGroup>
                      <input type="text" placeholder="ADMIN KEY" id="ADMIN_KEY" onChange={handleChange} />
                    </FormGroup>
                  ) : (
                    <></>
                  )}
                  <Button className="btn secondary__btn auth__btn" type="submit" onSubmit={handleSubmit}>
                    Create Account
                  </Button>
                </Form>

                <p>
                  Already have an account?<Link to="/login">Login</Link>
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

export default Register;
