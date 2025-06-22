import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import profile_title from '../../assets/images/profile_title.jpg';
import '../../styles/profile.css';
import UserDetails from '../../components/UserProfile/UserDetails/UserDetails';
import UserBookings from '../../components/UserProfile/UserBookings/UserBookings';
import TopUp from '../../components/UserProfile/TopUp/TopUp';
import RouteConstants from '../../constants/RouteConstants';
import { Booking } from '../../types/booking.types';
import { useAuth } from '../../auth/AuthProvider';
import BookingService from '../../service/booking.service';
import { message } from 'antd';



const UserProfile = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();    

    // to scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    
    return (
        <div>
            <div>
                {/* Image */}
                <div className="profile_title_img">
                    <img src={profile_title} loading="lazy" alt="Profile Title" />
                </div>
                
                {/* Profile details */}
                <UserDetails />

                {/* Topup Section */}
                <TopUp />

                {/* Bookings Section */}
                <UserBookings/>
            </div>

            {/* Pricing Section */}
            <div className="p-5 flex flex-col items-center profile_pricing">
                <p className="profile_pricing_title">
                    Explore our <span>Pricing</span>
                </p>
                <p className="profile_pricing_subtitle">
                    Discover the perfect plan that suits your needs. Whether you are looking for basic access or premium features, we have a plan for you.
                </p>
                <div className="mt-4 flex gap-1 items-center profile_pricing_bttn" onClick={()=>navigate(RouteConstants.pricing)}>
                    <p >Explore Pricing</p>
                    <i className="ri-arrow-right-line"></i>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
