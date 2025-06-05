import { memo, useEffect, useState } from 'react';
import user_alt from '../../../assets/images/user_alt.png';
import { useAuth } from '../../../auth/AuthProvider';
import { UserMembership } from '../../../enums/user-membership.enum';
import EditProfile from '../EditProfile/EditProfile';
import './user-details.css';
import UserService from '../../../service/user.service';
import { User } from '../../../types/user.types';
import { message, Typography } from 'antd';
import ColorConstants from '../../../constants/ColorConstants';
import Loading from '../../common/Loading/Loading';

const UserDetails = () => {

    const { user } = useAuth();
    const [edit,setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<User>();
    
    const getMembershipColor = (membership: UserMembership) => {
        switch (membership) {
            case UserMembership.GOLD:
                return ColorConstants.membershipGold; 
            case UserMembership.PREMIUM:
                return ColorConstants.membershipPremium;
            case UserMembership.GENERAL:
            default:
                return ColorConstants.membershipGeneral; 
        }
    };

     const fetchUser = async () => {
        if(!user) return;
        setLoading(true);
        UserService.fetchUser(user?.id)
            .then((response) => {
                setUserData(response?.data);
            })
            .catch((error) => {
                console.error('Error while fetching User.', error);
                message.error(error.message || 'Error while fetching User.');
            })
            .finally(() => {
                setEdit(false);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchUser();
    }, []);

  return (
    <div className="flex gap-[10px] profile_details" style={{backgroundColor: ColorConstants.grey}}>
        <div className="profile_img flex-shrink-0">
            <img src={userData && userData.image?`${process.env.REACT_APP_LOCAL_BE_URL}/${userData.image.replace(/\\/g, '/')}`:user_alt} loading="lazy" alt="Profile" />
        </div>
        {
            !loading&& userData ? (
                <div className="w-full flex flex-wrap justify-between my-[10px]">
                    <div className="p-2 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <Typography.Title style={{fontSize: '28px', margin: 0}}>{userData.username}</Typography.Title>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex gap-1 items-center" style={{color: ColorConstants.textColor}}>
                                <i className="ri-mail-fill"></i>
                                <Typography.Title style={{fontSize: '20px', margin: 0, fontWeight: 400, color: ColorConstants.textColor}}>{userData.email}</Typography.Title>
                            </div>
                            {userData.phone && userData.phone.length > 0 && (
                                <div className="flex gap-1 items-center" style={{color: ColorConstants.textColor}}>
                                    <i className="ri-phone-fill"></i>
                                    <Typography.Title style={{fontSize: '20px', margin: 0, fontWeight: 400, color: ColorConstants.textColor}}>{userData.phone}</Typography.Title>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 items-center">
                            <i className="ri-wallet-3-fill"></i>
                            <Typography.Title style={{fontSize: '20px', margin: 0, fontWeight: 400}}>₹{userData.balance}</Typography.Title>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Typography.Title style={{fontSize: '20px', margin: 0, fontWeight: 500, color: getMembershipColor(userData.membership)}}>{userData.membership}</Typography.Title>
                            <i className="ri-vip-crown-fill" style={{color: getMembershipColor(userData.membership)}}></i>
                        </div>
                    </div>

                    <div>
                        <button className='flex items-center justify-center gap-[10px] w-[120px] h-[30px] rounded-[5px]' onClick={()=> setEdit(true)} style={{backgroundColor: ColorConstants.headingColor}}>
                            <i className="ri-pencil-fill m-0" style={{color: ColorConstants.white}}></i>
                            <Typography.Title style={{fontSize: '14px', margin: 0, fontWeight: 400, color: ColorConstants.white}}>Edit Details</Typography.Title>
                        </button>
                    </div>
                </div>
                
            ) : (
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
                    <Loading />
                </div>
            )
        }   

        {/* Edit profile details */}
        {userData !== undefined && edit && (<EditProfile setEdit={setEdit} fetchUser={fetchUser} user={userData}/>)}              
    </div>
  );
};

export default memo(UserDetails);
