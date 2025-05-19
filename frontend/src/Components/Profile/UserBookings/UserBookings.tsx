import React, {useState,useContext, useEffect, memo} from 'react';
import './user-bookings.css'
import { AuthContext } from '../../../context/AuthContext';
import { BASE_URL } from '../../../utils/config';
import DeleteBooking from '../../Dashboard/ManageBooking/DeleteBooking';
import BookingCard from '../../../shared/BookingCard';

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


  return (
    <div className="flex flex-col gap-3 profile_bookings">
       
            <h5 className="profile_bookings_title">My Bookings:</h5>
            <div className="flex flex-col gap-3 profile_bookins_main">
            {bookingError && (<p className="p-5 add_tour_error">{bookingError}</p>)}
            {bookingLoading && (<p className="p-5 add_tour_error">Loading...</p>)}
            {!bookingLoading && !bookingError && bookings.length===0 && (<p className="p-5 add_tour_error">No Bookings Yet</p>)}
            {!bookingError && !bookingLoading && bookings.map((booking) => (
                <BookingCard booking={booking} setDelete={setDelete}/>
            ))}
        </div>
  

        {/* Cancel booking confirmation */}
        {del !== 0 && <DeleteBooking setDelete={setDelete} id={del} />}
        
    </div>
  );
};

export default memo(UserBookings);
