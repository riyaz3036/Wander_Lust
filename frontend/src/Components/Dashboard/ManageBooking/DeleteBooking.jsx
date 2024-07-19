import React, { useState } from 'react';
import {BASE_URL} from '../../../utils/config';

const DeleteBooking = ({ setDelete, id }) => {
    // To check if it is successfully deleted
    const [delSuccess, setDelSuccess] = useState(0);
    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/bookings/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setDelSuccess(1);
            // done message (1 sec)
            setTimeout(() => {
                setDelete(0);  
                window.location.reload();  
            }, 1000);
        } catch (error) {
            console.error('Error deleting booking:', error);
            alert('Error deleting booking');
        }
    };

    return (
        <div className="delete_tour_main">
            {
                delSuccess === 0 ?
                <div className="delete_tour_box">
                    <p className="delete_tour_ques">Are you sure you want to delete this Booking?</p>
                    <div className="delete_tour_bttns">
                        <button className="delete_tour_yes" onClick={handleDelete}>Yes</button>
                        <button className="delete_tour_no" onClick={() => setDelete(0)}>No</button>
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

export default DeleteBooking;
