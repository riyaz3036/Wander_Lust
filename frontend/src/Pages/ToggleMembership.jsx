import React, { useState, useContext, useEffect } from 'react';
import '../styles/toggle.css';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from "./../context/AuthContext";
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js';

function ToggleMembership() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (user) { // Check if user is not null before making the API call
      const fetchUser = async () => {
        try {
          const response = await fetch(`${BASE_URL}/users/${user._id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUser();
    }
  }, [user]);

  // Scroll to top when the pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle balance change
  const handleChange = (event) => {
    setBalance(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (balance === '') {
      alert('Add Amount');
      return;
    }
    navigate(`/balance-pay/${balance}`);
  };

  return (
    <>
      <Header />
      
      {user ? (
        <div className="toggle__main">
          <div className="details">
            <h5>About Me:</h5>
            <div className="details-item">
              <p><span>Name: </span>{userData.username}</p>
              <p><span>Email: </span>{userData.email}</p>
              <p><span>Phone: </span>{userData.phone}</p>
              <p><span>Available Balance: </span>₹{userData.balance}</p>
              <p><span>Membership: </span>{userData.membership}</p>
            </div>
          </div>  

          <div className="toggle__sub">
            <h5>Add Balance</h5>
            <div>
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div>
                  <label>Amount:</label>
                  <input
                    type="number"
                    name="balance"
                    value={balance}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="primary__btn">Update</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p className="no__login">(Please Login to view your details)</p>
      )}

      <Footer />
    </>
  );
}

export default ToggleMembership;
