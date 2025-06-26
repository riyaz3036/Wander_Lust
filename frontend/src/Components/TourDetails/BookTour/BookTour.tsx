import { message } from 'antd';
import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { useAuth } from '../../../auth/AuthProvider';
import RouteConstants from '../../../constants/RouteConstants';
import { UserMembership } from '../../../enums/user-membership.enum';
import BookingService from '../../../service/booking.service';
import { Activity } from '../../../types/activity.types';
import { CreateBooking } from '../../../types/booking.types';
import { Tour } from '../../../types/tour.types';
import PageLoader from '../../common/FullPageLoader/PageLoader';
import './book-tour.css';

interface BookTourProps {
    tour: Tour;
    additionalActivities: Activity[];
}

const BookTour: React.FC<BookTourProps> = ({ tour, additionalActivities }) => {
    
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [newBooking, setNewBooking] = useState<CreateBooking>({
        user_id: user ? user.id : "",
        tour_id: tour.id,
        signed_activities: [],
        price: 0,
        bookFor: "",
        guestSize: 1
    });

    const calcAdditionalActPrice = () => {
        let totalAmount = 0;
        totalAmount += additionalActivities.reduce((total: number, item: Activity) => total + item.price * newBooking.guestSize, 0);
        return totalAmount;
    }

    // Calculate total amount for the booking
    const calcTot = () => {
        if(!newBooking.guestSize) return 0;
        let totalAmount = 0;
        totalAmount += calcAdditionalActPrice();
        totalAmount += newBooking.guestSize * tour.price;
        return totalAmount;
    };

    // Calculate discount
    const calcDisc = () => {
        let discount = 0;
        if (user) {
            if (user.membership === UserMembership.PREMIUM) discount = calcTot() * 0.5;
            else if (user.membership === UserMembership.GOLD) discount = 0.1 * calcTot();
        }
        return discount;
    };

    // Check if any activity with vacancy < guest size is selected and balance >= price
    const check = () => {
        let check = 1;
        if (tour.vacancy < newBooking.guestSize) check = 0;

        if (user && calcTot() - calcDisc() > user.balance) {
            check = -1;
        }
        return check;
    };

    // Handle all the changes
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        const parsedValue = id === 'guestSize' ? parseInt(value, 10) : value;

        setNewBooking(prevFormData => ({
            ...prevFormData,
            [e.target.id]: parsedValue
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
        const { bookFor, guestSize } = newBooking;
        if (!bookFor || !guestSize) {
            message.error('Please fill in all required fields.');
            return;
        }

        // Calculate and update price and signed activities
        const updatedPrice = calcTot() - calcDisc();
        const updatedSignedActivities: string[] = additionalActivities.map(act => act.id);

        setLoading(true);
        BookingService.addBooking({...newBooking,  price: updatedPrice, signed_activities: updatedSignedActivities})
            .then((response) => {
                navigate(RouteConstants.thankYou);
            })
            .catch((error) => {
                console.error('Error while creating Booking.', error);
                message.error(error.message || 'Error while creating Booking.');
            })
            .finally(() => {
                setLoading(false);
            });
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
                        <input type="number" placeholder="No.of Guests" id="guestSize" min="1" required onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>

            {/* Booking bottom form starts here */}
            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-0.5">Base price (₹{tour.price}<i className="ri-close-line"></i> {newBooking.guestSize ? newBooking.guestSize : 0})</h5>
                        <span>₹{calcTot() - calcAdditionalActPrice()}</span>
                    </ListGroupItem>
                    {newBooking.guestSize !==0 && (
                        <ListGroupItem className="border-0 px-0">
                            <h5 className="d-flex align-items-center gap-0.5">Activities (₹{calcAdditionalActPrice() / newBooking.guestSize}<i className="ri-close-line"></i> {newBooking.guestSize ? newBooking.guestSize : 0})</h5>
                            <span>₹{calcAdditionalActPrice()}</span>
                        </ListGroupItem>
                    )}

                    <ListGroupItem className="border-0 px-0">
                        <h5>Membership Discount</h5>
                        <span>-₹{calcDisc()}</span>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>₹{calcTot() - calcDisc()}</span>
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

            {loading && <PageLoader />}
        </div>
    )
};

export default memo(BookTour);
