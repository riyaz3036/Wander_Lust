import React, {useState,useEffect, useContext, memo} from 'react';
import './user-details.css'
import user_alt from '../../../assets/images/user_alt.jpg';
import { BASE_URL } from '../../../utils/config';
import { AuthContext } from '../../../context/AuthContext';
import EditProfile from '../../EditProfile/EditProfile';

const UserDetails = () => {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [userDataLoading,setUserDataLoading] = useState(true);
    const [userDataError,setUserDataError] = useState('');
    const [edit,setEdit] = useState(0);


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
    <div className="flex gap-1 profile_details">
        <div className="profile_img">
            <img src={userData.image?`${BASE_URL}/${userData.image.replace(/\\/g, '/')}`:user_alt} loading="lazy" alt="Profile" />
        </div>

        
        {userDataError && (<p className="p-5 add_tour_error">{userDataError}</p>)}   
        { userDataLoading && (<p className="p-5 add_tour_error">Loading...</p>)}    
        {
            !userDataError && !userDataLoading && (
                <div className="profile_details_main p-2 flex flex-col gap-2">
                    <div className="flex items-center gap-3 profile_edit">
                        <p className="m-0 font-bold text-2xl">{userData.username}</p>
                        <i class="ri-pencil-fill m-0" onClick={()=>setEdit(1)}></i>
                    </div>
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

        {/* Edit profile details */}
        {edit?
            <EditProfile setEdit={setEdit} userData={userData} />
            :
            <></>
        }              
    </div>
  );
};

export default memo(UserDetails);
