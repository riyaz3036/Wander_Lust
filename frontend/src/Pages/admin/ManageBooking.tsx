import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DeleteBooking from '../../Components/Dashboard/ManageBooking/DeleteBooking';
import BookingCard from '../../shared/BookingCard';
import '../../styles/my-bookings.css';
import { BASE_URL } from '../../utils/config';


const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [bookingError, setBookingError] = useState('');
  const [del, setDelete] = useState(0);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL

        }/bookings/`);
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
 

  return (
    <div>
        <section>
            {/* Bookings Section */}
            <div className="flex flex-col gap-3 profile_bookings">
                <h5 className="profile_bookings_title">All Bookings:</h5>
                <div className="flex flex-col gap-3 profile_bookins_main" >
                {bookingError && (<p className="p-5 add_tour_error">{bookingError}</p>)}
                {bookingLoading && (<p className="p-5 add_tour_error">Loading...</p>)}
                {!bookingError && !bookingLoading && bookings.map((booking, index) => (
                    <BookingCard booking={booking} setDelete={setDelete} />
                ))}
                </div>
            </div>
        </section>
        {del !== 0 && <DeleteBooking setDelete={setDelete} id={del} />}
    </div>
  );
};

export default ManageBooking;
