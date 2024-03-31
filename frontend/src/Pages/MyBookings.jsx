import React, {useContext,useEffect}from 'react'
import '../styles/my-bookings.css'
import {Container, Row, Col} from 'reactstrap'
import useFetch from '../hooks/useFetch.js';
import {BASE_URL} from '../utils/config.js';
import {AuthContext} from "./../context/AuthContext";
import {useLocation} from 'react-router-dom';

const MyBookings = () =>{


//to scroll to top
const { pathname } = useLocation();

useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]);
    
    //Getting the user data
    let {user} = useContext(AuthContext);
    if(user){
        user = useFetch(`${BASE_URL}/users/${user._id}`).data;
    }
    
   
    
    return(

        <>
        {
        user?

        <section>

        <Container>
        <Row>
        <Col  className="m-auto">
        <h5>About Me:</h5>
        <div className="details">

        <div className="details-item">
        <p><span>Name: </span> {user.username}</p>
        <p><span>Email: </span> {user.email}</p>
        <p><span>Phone: </span> {user.phone}</p>
        <p><span>Available Balance: </span> {user.balance}</p>
        <p><span>Membership: </span>{user.membership}</p>
        </div>

        </div>


        {
        user.bookings?
        
        <>
        <h5 className="book__title">My Bookings:</h5>

        <div className="my__orders-content">
        {
        user.bookings?.map((booking, index) => (
        <div key={index} className="booking-item">

            <div className="booking__img">
            <img src={booking.tour.photo} alt="tour-image" />
            </div>

            <div className="booking__data">

            <p><span>Booked Tour:</span>{booking.tour.title}</p>
            <p><span>Guest Size:</span> {booking.guestSize}</p>
            <p><span>Booked for Date:</span> {booking.bookFor}</p>
            <p><span>Price:</span>₹{booking.price}</p>
            <p><span>Activities:</span></p>




            {/* Iterate through activities */}

            {
              booking.signed_activities.length === 0 ? (
             <p>(No Additional signed Activities)</p>
              ) : (
              booking.signed_activities.map((activity, index) => (
              <div key={index} className="activity-item">
              <p>{activity.title}</p>
              </div>
              ))
              )
            }

            </div>
           
        </div>
        ))  
        }
        </div>

        </>:

        <p className="no__bookings">(No Bookings yet)</p>
        
        }


        </Col>
        </Row>
        </Container>
        </section>:

        <>
        <p className="no__login">(Please Login to view your details)</p>
        </>
        }
        
        </>
   
    )


};

export default MyBookings;