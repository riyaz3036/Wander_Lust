import { message } from 'antd';
import React, { memo, useState } from 'react';
import BookingService from '../../../service/booking.service';

interface DeleteBookingProps {
    setToDeleteBooking: React.Dispatch<React.SetStateAction<string>>;
    toDeleteBooking: string;
}

const DeleteBooking: React.FC<DeleteBookingProps> = ({ setToDeleteBooking, toDeleteBooking }) => {
    // To check if it is successfully deleted
    const [delSuccess, setDelSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setLoading(true);
        BookingService.deleteBooking(toDeleteBooking)
            .then((response) => {
                setDelSuccess(true);
                setTimeout(() => {
                    setToDeleteBooking('');  
                    window.location.reload();  
                }, 1000);
            })
            .catch((error) => {
                console.error('Error while fetching Booking.', error);
                message.error(error.message || 'Error while fetching Booking.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="delete_tour_main">
            {
                delSuccess?
                <div className="delete_tour_box">
                    <p className="delete_tour_ques">Are you sure you want to delete this Booking?</p>
                    <div className="delete_tour_bttns">
                        <button className="delete_tour_yes" onClick={handleDelete}>Yes</button>
                        <button className="delete_tour_no" onClick={() => setToDeleteBooking('')}>No</button>
                    </div>
                </div>
                :
                <div className="flex flex-col items-center gap-8 bg-white p-5 add_tour_add_success">
                    <div className="flex items-center justify-center add_tour_add_success_tick">
                        <i className="ri-check-line"></i>
                    </div>
                    <p className="font-medium">Deleted Booking Successfully</p>
                </div>
            }
        </div>
    );
}

export default memo(DeleteBooking);
