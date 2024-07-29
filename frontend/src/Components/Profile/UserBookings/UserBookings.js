import React, {useState,useContext, useEffect, memo} from 'react';
import './user-bookings.css'
import { AuthContext } from '../../../context/AuthContext';
import { BASE_URL } from '../../../utils/config';
import { format } from 'date-fns';
import DeleteBooking from '../../Dashboard/ManageBooking/DeleteBooking';

const UserBookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [bookingLoading, setBookingLoading] = useState(true);
    const [bookingError, setBookingError] = useState('');
    const [del, setDelete] = useState(0);


    useEffect(()=>{
        if(user){
            const fetchBookings = async () => {
                try {
                    const response = await fetch(`${BASE_URL}/bookings/user/${user._id}`);
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
        }

    },[user])


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
    <div className="flex flex-col gap-3 profile_bookings">
       
            <h5 className="profile_bookings_title">My Bookings:</h5>
            <div className="flex flex-col gap-3 profile_bookins_main">
            {bookingError && (<p className="p-5 add_tour_error">{bookingError}</p>)}
            {bookingLoading && (<p className="p-5 add_tour_error">Loading...</p>)}
            {!bookingLoading && !bookingError && bookings.length===0 && (<p className="p-5 add_tour_error">No Bookings Yet</p>)}
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
  

        {/* Cancel booking confirmation */}
        {del !== 0 && <DeleteBooking setDelete={setDelete} id={del} />}
        
    </div>
  );
};

export default memo(UserBookings);
