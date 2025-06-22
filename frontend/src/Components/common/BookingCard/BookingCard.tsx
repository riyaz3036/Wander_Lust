import { format } from 'date-fns';
import React, { memo } from 'react';
import { Booking } from '../../../types/booking.types';
import './booking-card.css';

interface BookingCardProps {
    booking: Booking;
    setToDeleteBooking: React.Dispatch<React.SetStateAction<string>>;
}

const BookingCard: React.FC<BookingCardProps> = ({booking, setToDeleteBooking}) =>{

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
        <div key={booking.id} className="booking_card">
            <div className="booking_card_img">
                {booking.tour.image && <img src={`${process.env.REACT_APP_BE_URL}/${booking.tour.image.replace(/\\/g, '/')}`} loading="lazy" alt="tour-image" />}
            </div>
            <div className="booking_card_main">
                <p><span>Booked Tour:</span> {booking.tour.title}</p>
                <p><span>Tour Date:</span> {formatDate(booking.tour.start_date)}</p>
                <p><span>Booking Name:</span> {booking.bookFor}</p>
                <p><span>Guest Size:</span> {booking.guestSize}</p>
                <p><span>Price:</span> ₹{booking.price}</p>
                <p className=""><span>Activities:</span></p>
                <div className="flex flex-wrap gap-1">
                    {booking.signed_activities.length === 0 ? (
                    <p>(No Additional signed Activities)</p>
                    ) : (
                    booking.signed_activities.map((activity, index) => (
                        <p key={index}>{activity.title}{index < booking.signed_activities.length -1 ? ',' : ''} </p>
                    ))
                    )}
                </div>
                <button style={{fontSize: '14px'}} className="text-white bg-red-600 font-medium px-[20px] py-[4px] booking_cancel" onClick={() => setToDeleteBooking(booking.id)}>Cancel Booking</button>
            </div>
        </div>
    )
}

export default memo(BookingCard);