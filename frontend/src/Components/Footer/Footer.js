import React, { useContext } from 'react';
import './Footer.css';
import { Row, Col, Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { AuthContext } from "./../../context/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    alert("Successfully Logged out!!");
  };

  const quick__links = [
    {path: '/home',display: 'Home'},
    {path: '/pricing', display: 'Pricing'}
  ];

  if (user) {
    quick__links.push({
      path: '/profile',
      display: 'Profile'
    });
  }

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="6" className="temp2">
            <div className="logo">
              <img src={Logo} alt="logo" />
              <p>
                We offer curated travel experiences, blending luxury with exploration, to create unforgettable journeys around the globe.
              </p>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>
            <div className="flex flex-col gap-3 footer_quick-links z-1">
              {
                quick__links.map((item, index) => (
                  <ListGroupItem key={index} className="ps-0 border-0">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Quick Links</h5>
            <div className="flex flex-col gap-3 footer_quick-links">
              {
                user ? (
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/" onClick={logout}>Logout</Link>
                  </ListGroupItem>
                ) : (
                  <>
                    <ListGroupItem className="ps-0 border-0">
                      <Link to="/login">Login</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                      <Link to="/register">Register</Link>
                    </ListGroupItem>
                  </>
                )
              }
            </div>
          </Col>

          <Col lg="12" className="copy">
            <p className="copyright">
              developed by MD RIYAZ AHMED
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
