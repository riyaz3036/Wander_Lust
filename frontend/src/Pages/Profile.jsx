import React, { useState, useContext, useEffect } from 'react';
import '../styles/profile.css';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js';
import profile_title from '../assets/images/profile_title.jpg';
import user_alt from '../assets/images/user_alt.jpg';
import topup from '../assets/images/topup.png';
import { format } from 'date-fns';
import DeleteBooking from '../Components/Dashboard/ManageBooking/DeleteBooking.jsx';

const Profile = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [userDataLoading,setUserDataLoading] = useState(true);
    const [userDataError,setUserDataError] = useState('');
    const [balance, setBalance] = useState('');
    const [bookings, setBookings] = useState([]);
    const [bookingLoading, setBookingLoading] = useState(true);
    const [bookingError, setBookingError] = useState('');
    const [del, setDelete] = useState(0);
  
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
                    setUserDataError('Error Loading Data')
                } finally{
                    setUserDataLoading(false);
                }
            };
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

            fetchUser();
            fetchBookings();
        }
    }, [user]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const handleChange = (event) => {
        setBalance(event.target.value);
    };

    const handleSubmit = async () => {
        if (balance === '') {
            alert('Add Amount');
            return;
        }
        navigate(`/balance-pay/${balance}`);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { 
                alert('File size exceeds 2 MB limit. Please choose a smaller file.');
                e.target.value = '';  
                return;
            }
            
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch(`${BASE_URL}/users/${user._id}`, {
                    method: 'PUT',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setTimeout(() => {
                    window.location.reload(); 
                }, 1000);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

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

    const getMembershipStyle = (membership) => {
        switch (membership) {
            case 'Gold':
                return { color: '#d29730' }; 
            case 'Premium':
                return { color: '#cf0b12' };
            case 'General':
            default:
                return { color: '#d3d3d3' }; 
        }
    };

    return (
        <div>
            <Header />

            <div>
                {/* Image */}
                <div className="profile_title_img">
                    <img src={profile_title} alt="Profile Title" />
                </div>
                
                {/* Profile details */}
                <div className="flex gap-2 profile_details">
                    <div className="profile_img">
                        <img src={userData.image?`${BASE_URL}/${userData.image.replace(/\\/g, '/')}`:user_alt} alt="Profile" />
                        <input 
                            type="file" 
                            id="upload" 
                            style={{ display: 'none' }} 
                            onChange={handleImageUpload} 
                        />
                        <label htmlFor="upload" className="upload-btn">Upload</label>
                    </div>

                   
                        {userDataError && (<p className="p-5 add_tour_error">{userDataError}</p>)}   
                        { userDataLoading && (<p className="p-5 add_tour_error">Loading...</p>)}    
                        {
                            !userDataError && !userDataLoading && (
                                <div className="profile_details_main p-3 flex flex-col gap-2">
                                    <p className="m-0 font-bold text-2xl">{userData.username}</p>
                                    <div className="flex flex-wrap gap-3 profile_phone_email">
                                        <div className="flex gap-1 items-center">
                                            <i className="ri-mail-fill"></i>
                                            <p className="m-0">{userData.email}</p>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <i className="ri-phone-fill"></i>
                                            <p className="m-0">{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center profile_membership">
                                        <p className="m-0" style={getMembershipStyle(userData.membership)}>{userData.membership}</p>
                                        <i className="ri-vip-crown-fill" style={getMembershipStyle(userData.membership)}></i>
                                    </div>
                                    <div className="flex gap-2 items-center profile_balance">
                                        <i className="ri-wallet-3-fill"></i>
                                        <p className="m-0">₹{userData.balance}</p>
                                    </div>
                                </div>
                            )
                        }                 
                </div>

                {/* Bookings Section */}
                <div className="p-5 flex flex-col gap-3 profile_bookings">
                    {bookings.length > 0 ? (
                    <>
                        <h5 className="profile_bookings_title">My Bookings:</h5>
                        <div className="flex flex-col gap-3 profile_bookins_main">
                        {bookingError && (<p className="p-5 add_tour_error">{userDataError}</p>)}
                        {bookingLoading && (<p className="p-5 add_tour_error">Loading...</p>)}
                        {!bookingError && !bookingLoading && bookings.map((booking, index) => (
                            <div key={index} className="profile_booking_element">
                                <div className="profile_booking_element_img">
                                    <img src={`${BASE_URL}/${booking.tour_id.image.replace(/\\/g, '/')}`} alt="tour-image" />
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
                  </>
                ) : (
                  <p className="no__bookings text-center m-0">(No Bookings yet)</p>
                )}
                </div>
                
                {/* Topup Section */}
                <div className="flex flex-wrap items-center justify-center p-5 gap-5 profile_topup">
                    <div className="profile_topup_left">
                        <p className="top-up-title">Top Up Your <span className="highlight">Balance</span></p>
                        <p className="top-up-description">Top up your balance to book your next holiday trip easily and enjoy your vacation without any worries!</p>
                        <div>
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                <div className="flex flex-col gap-1 mb-2 top_up_input">
                                    <label>Amount(₹):</label>
                                    <input type="number" name="balance" value={balance} onChange={handleChange} required />
                                </div>
                                <button type="submit" className="topup_bttn">Pay</button>
                            </form>
                        </div>
                    </div>

                    <div className="topup_img"><img src={topup} alt="Top Up" /></div>
                </div>
            </div>

            {/* Pricing Section */}
            <div class="p-5 flex flex-col items-center profile_pricing">
                <p className="profile_pricing_title">
                    Explore our <span>Pricing</span>
                </p>
                <p className="profile_pricing_subtitle">
                    Discover the perfect plan that suits your needs. Whether you are looking for basic access or premium features, we have a plan for you.
                </p>
                <div class="mt-4 flex gap-1 items-center profile_pricing_bttn" onClick={()=>navigate("/pricing")}>
                    <p >Explore Pricing</p>
                    <i class="ri-arrow-right-line"></i>
                </div>
            </div>

            
            {/* Cancel booking confirmation */}
            {del !== 0 && <DeleteBooking setDelete={setDelete} id={del} />}

            <Footer />
        </div>
    );
};

export default Profile;
