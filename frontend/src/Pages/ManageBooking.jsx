import React, { useContext, useEffect, useState } from 'react';
import '../styles/my-bookings.css';
import { Container, Row, Col } from 'reactstrap';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from './../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js';
import { format } from 'date-fns';
import UniSidebar from "../Components/Dashboard/DashboardSidebar/DashboardSidebar.jsx";
import UniDashboardHeader from "../Components/Dashboard/DashboardHeader/DashboardHeader.jsx";
import DeleteBooking from '../Components/Dashboard/ManageBooking/DeleteBooking.jsx';

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [del, setDelete] = useState(0);

  console.log(bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bookings/`);
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

    fetchBookings();
  }, []);

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
    <div className="add_tour_container">
        <UniSidebar />
        <UniDashboardHeader />

        <div className="add_tour_main" style={{marginLeft:'50px'}}>
            <section>
            {bookings.length > 0 ? (
                <>
                <h5 className="book__title">All Bookings:</h5>
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
                <p className="no__bookings">(No Bookings yet)</p>
            )}
            </section>
            {del !== 0 && <DeleteBooking setDelete={setDelete} id={del} />}
        </div>
    </div>
  );
};

export default ManageBooking;
