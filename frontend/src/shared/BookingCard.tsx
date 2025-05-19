import React, {memo}from 'react'
import './booking-card.css'
import { BASE_URL } from '../utils/config';
import { format } from 'date-fns';

interface BookingCardProps {
    booking: any;
    setDelete: any;
}

const BookingCard: React.FC<BookingCardProps> = ({booking, setDelete}) =>{


    // Format date utility function using date-fns
    const formatDate = (dateString: string) => {
        try {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yyyy');
        } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
        }
    };

    return(
        <div key={booking._id} className="booking_card">
            <div className="booking_card_img">
                <img src={`${BASE_URL}/${booking.tour_id.image.replace(/\\/g, '/')}`} loading="lazy" alt="tour-image" />
            </div>
            <div className="booking_card_main">
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
                    booking.signed_activities.map((activity: any, index: any) => (
                        <p key={index}>{activity.title}, </p>
                    ))
                    )}
                </div>
                <button className="text-white bg-red-600 font-semibold px-3 py-2 booking_cancel" onClick={() => setDelete(booking._id)}>Cancel Booking</button>
            </div>
        </div>
    )
}

export default memo(BookingCard);