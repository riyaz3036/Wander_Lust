import React, { useContext, useEffect, useState } from 'react';
import '../styles/my-bookings.css';
import { Container, Row, Col } from 'reactstrap';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from './../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import AdminHeader from '../Components/Dashboard/AdminHeader/AdminHeader';
import AdminSidebar from '../Components/Dashboard/AdminSidebar/AdminSidebar';
import DeleteBooking from '../Components/Dashboard/ManageBooking/DeleteBooking.jsx';

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [bookingError, setBookingError] = useState('');
  const [del, setDelete] = useState(0);
  const [toggleSidebar,setToggleSidebar] = useState(0);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bookings/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setBookingError('Error loading bookings');
      } finally {
        setBookingLoading(false);
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
    <div>
        <AdminHeader setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar}/>
        <AdminSidebar toggleSidebar={toggleSidebar}/>

        <div className={`admin_dashboard_main ml-[60px] ${toggleSidebar?'md:ml-[250px]':''}`}>
            <section>
            {/* Bookings Section */}
            <div className="flex flex-col gap-3 profile_bookings">
                    {bookings.length > 0 ? (
                    <>
                        <h5 className="profile_bookings_title">All Bookings:</h5>
                        <div className="flex flex-col gap-3 profile_bookins_main" >
                        {bookingError && (<p className="p-5 add_tour_error">{bookingError}</p>)}
                        {bookingLoading && (<p className="p-5 add_tour_error">Loading...</p>)}
                        {!bookingError && !bookingLoading && bookings.map((booking, index) => (
                            <div key={index} className="profile_booking_element">
                                <div className="profile_booking_element_img">
                                    <img src={`${BASE_URL}/${booking.tour_id.image.replace(/\\/g, '/')}`} loading="lazy" alt="tour-image" />
                                </div>
                                <div className="booking_element_main">
                                    <p><span>Booked Tour:</span> {booking.tour_id.title}</p>
                                    <p><span>Tour Date:</span> {formatDate(booking.tour_id.start_date)}</p>
                                    <p><span>Booking Name:</span> {booking.bookFor}</p>
                                    <p><span>Guest Size:</span> {booking.guestSize}</p>
                                    <p><span>Price:</span> ₹{booking.price}</p>
                                    <p className=""><span>Activities:</span></p>
                                    <div className="flex flex-wrap gap-1">
                                        {booking.signed_activities.length === 0 ? (
                                        <p>(No Additional signed Activities)</p>
                                        ) : (
                                        booking.signed_activities.map((activity, index) => (
                                            <p key={index}>{activity.title}, </p>
                                        ))
                                        )}
                                    </div>
                                    <button className="text-white bg-red-600 font-semibold px-3 py-2 booking_cancel" onClick={() => setDelete(booking._id)}>Cancel Booking</button>
                                </div>
                            </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <p className="no__bookings text-center m-0">(No Bookings yet)</p>
                )}
                </div>
            </section>
            {del !== 0 && <DeleteBooking setDelete={setDelete} id={del} />}
        </div>
    </div>
  );
};

export default ManageBooking;
