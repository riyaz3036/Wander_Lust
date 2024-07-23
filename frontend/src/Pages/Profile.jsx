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

const Profile = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [userDataLoading,setUserDataLoading] = useState(true);
    const [userDataError,setUserDataError] = useState('');
    const [balance, setBalance] = useState('');
  
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

            fetchUser();
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
                <div className="profile_title_img">
                    <img src={profile_title} alt="Profile Title" />
                </div>

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

            <Footer />
        </div>
    );
};

export default Profile;
