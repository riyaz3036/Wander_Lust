import React, { useEffect, useState, useContext, memo } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { AuthContext } from "../../context/AuthContext";
import {message} from 'antd';
import RouteConstants from '../../constants/RouteConstants';

interface BookingProps {
    tour: any;
    addAct: any;
}

const Booking: React.FC<BookingProps> = ({ tour, addAct }) => {
    
    const navigate = useNavigate();

    // Importing user data
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        if (user) {
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
            
            fetchUser();
        }
    }, [user]);

    // Data to send to API to book the trip
    const [formData, setFormData] = useState({
        user_id: user ? user._id : "",
        tour_id: tour._id,
        signed_activities: [],
        price: 0,
        bookFor: "",
        guestSize: 1
    });

    // Calculate total for the booking
    const calcTot = () => {
        let tot_ = addAct.reduce((total: any, item: any) => total + item.price * formData.guestSize, 0);
        tot_ += formData.guestSize * tour.price;
        return tot_;
    };

    // Calculate discount
    const calcDisc = () => {
        let dis_ = 0;
        if (user && userData) {
            if (userData.membership === "Premium") dis_ = calcTot() * 0.5;
            else if (userData.membership === "Gold") dis_ = 0.1 * calcTot();
        }
        return dis_;
    };

    // Check if any activity with vacancy < guest size is selected and balance >= price
    const check = () => {
        let chk__ = 1;
        //vacancy check
        if (tour.vacancy < formData.guestSize) chk__ = 0;

        // Balance check
        if (user && calcTot() - calcDisc() > userData.balance) {
            chk__ = -1;
        }
        return chk__;
    };

    // Handle all the changes
    const handleChange = (e: any) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.id]: e.target.value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Check if the user is logged in
        if (!user) {
            message.error('Please Login to Book your trip');
            return;
        }
        // Check if all required fields are filled
        const { bookFor, guestSize } = formData;
        if (!bookFor || !guestSize) {
            message.error('Please fill in all required fields.');
            return;
        }

        // Calculate and update price and signed activities
        const updatedPrice = calcTot() - calcDisc();
        const updatedSignedActivities = addAct;

        // Update formData
        setFormData(prevFormData => ({
            ...prevFormData,
            price: updatedPrice,
            signed_activities: updatedSignedActivities
        }));

        try {
            // Wait for formData to update
            const response = await fetch(`${BASE_URL}/bookings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: updatedPrice,
                    signed_activities: updatedSignedActivities
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            navigate(RouteConstants.thankYou);

        } catch (error) {
            console.error('Error Booking Trip:', error);
            message.error('Error Booking Trip. Please try again later.');
        }
    };

    return (
        <div className="booking">
            {/* Booking top form starts here */}
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>₹{tour.price} <span>/ Person</span></h3>
            </div>

            {/* Booking middle form starts here */}
            <div className="booking__form">
                <h5>Information:</h5>
                <Form className="booking__info-form">
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input type="text" placeholder="Booking Name" id="bookFor" required onChange={handleChange} />
                        <input type="number" placeholder="No.of Guests" id="guestSize" required onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>

            {/* Booking bottom form starts here */}
            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-0.5">₹{tour.price}<i className="ri-close-line"></i> {formData.guestSize} + Activities</h5>
                        <span>₹{calcTot()}</span>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0">
                        <h5>Membership Discount</h5>
                        <span>{calcDisc()}</span>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>{calcTot() - calcDisc()}</span>
                    </ListGroupItem>
                </ListGroup>

                <Button
                    className="btn primary__btn w-100 mt-4"
                    onClick={handleSubmit}
                    disabled={check() <= 0}
                >
                    {check() === 0
                        ? 'No Vacancy'
                        : check() === -1
                            ? 'Insufficient Balance'
                            : 'Book Now'}
                </Button>
            </div>
        </div>
    )
};

export default memo(Booking);
