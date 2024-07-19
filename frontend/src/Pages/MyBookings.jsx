import React, { useContext, useEffect, useState } from 'react';
import '../styles/my-bookings.css';
import { Container, Row, Col } from 'reactstrap';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from './../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js';
import { format } from 'date-fns';
import DeleteBooking from '../Components/Dashboard/ManageBooking/DeleteBooking.jsx';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [del, setDelete] = useState(0);

  useEffect(() => {
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

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bookings/user/${user._id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookings(data);
        if (data.length === 0) {
          setError('No bookings available');
        }
      } catch (error) {
        setError('Error loading bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchBookings();
  }, [user._id]);

  // Scroll to top on route change
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Format date utility function using date-fns
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd-MM-yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };



  return (
    <>
      <Header />

      {user ? (
        <section>
          <Container>
            <Row>
              <Col className="m-auto">
                <h5>About Me:</h5>
                <div className="details">
                  <div className="details-item">
                    <p><span>Name: </span>{userData.username}</p>
                    <p><span>Email: </span>{userData.email}</p>
                    <p><span>Phone: </span>{userData.phone}</p>
                    <p><span>Available Balance: </span>₹{userData.balance}</p>
                    <p><span>Membership: </span>{userData.membership}</p>
                  </div>
                </div>

                {bookings.length > 0 ? (
                  <>
                    <h5 className="book__title">My Bookings:</h5>
                    <div className="my__orders-content">
                      {bookings.map((booking, index) => (
                        <div key={index} className="booking-item">
                          <div className="booking__img">
                            <img src={`${BASE_URL}/${booking.tour_id.image.replace(/\\/g, '/')}`} alt="tour-image" />
                          </div>
                          <div className="booking__data">
                            <p><span>Booked Tour:</span>{booking.tour_id.title}</p>
                            <p><span>Guest Size:</span> {booking.guestSize}</p>
                            <p><span>Tour Date:</span> {formatDate(booking.tour_id.start_date)}</p>
                            <p><span>Booking Name:</span> {booking.bookFor}</p>
                            <p><span>Price:</span>₹{booking.price}</p>
                            <p><span>Activities:</span></p>
                            {booking.signed_activities.length === 0 ? (
                              <p>(No Additional signed Activities)</p>
                            ) : (
                              booking.signed_activities.map((activity, index) => (
                                <div key={index} className="activity-item">
                                  <p>{activity.title}</p>
                                </div>
                              ))
                            )}
                            <button className="text-white bg-red-600 font-semibold px-5 py-2" onClick={() => setDelete(booking._id)}>Cancel Booking</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="no__bookings text-center m-0">(No Bookings yet)</p>
                )}
              </Col>
            </Row>
          </Container>
          {del !== 0 && <DeleteBooking setDelete={setDelete} id={del} />}
        </section>
      ) : (
        <p className="no__login">(Please Login to view your details)</p>
      )}

      <Footer />
    </>
  );
};

export default MyBookings;
