import { message, Modal } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useAuth } from '../../../auth/AuthProvider';
import ColorConstants from '../../../constants/ColorConstants';
import UserService from '../../../service/user.service';
import { authStore } from '../../../store/auth.store';
import { UpdateUser, User } from '../../../types/user.types';
import Loading from '../../common/Loading/Loading';
import ManageFormInput from '../../common/ManageFormInput/ManageFormInput';
import ManageFormImage from '../../common/ManageFormImage/ManageFormImage';


interface EditProfileProps {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    fetchUser: () => void;
    user: User;
}

const EditProfile: React.FC<EditProfileProps> = ({ setEdit, fetchUser, user }) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [profileData, setProfileData] = useState<UpdateUser>({ // To store the input details
        username:  user?.username ?? '',
        phone: user?.phone ?? '',
     });
    const [userImg, setUserImg] = useState<string | null>(user?.image ?? null);


    console.log('ff', user?.image)
    // To handle changes in the form
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    
    // To check if all the details are filled and passwords match
    useEffect(() => {
        const { username } = profileData;
        setIsFormValid(!!(username));
    }, [profileData]);


    // Handle submit
    const handleSubmit = async () => {
        if(!user) return;
        setLoading(true);
        UserService.editUser(user?.id, profileData, newImageFile || undefined)
            .then((response) => {
                message.success('Updated details successfully')
                authStore.setUser(response?.data)
            })
            .catch((error) => {
                console.error('Error while updating User.', error);
                message.error(error.message || 'Error while updating User.');
            })
            .finally(() => {
                setLoading(false);
                setEdit(false);
                fetchUser();
            });
    }
    

    return (
        <div className="">
            {
            loading? (
                <Loading />
            ): (
            <div className="p-[5px] rounded-[5px] bg-white">
                <Modal 
                    open={true} 
                    onCancel={() => setEdit(false)} 
                    footer={
                   <div className="flex justify-center mt-[40px]">
                        <button style={{backgroundColor: ColorConstants.secondaryColor, width: '100px', height: '30px',borderRadius: '5px', opacity: isFormValid ? 1 : 0.5}} onClick={handleSubmit}>Edit</button>
                    </div>
                }>
                    <div>
                        <p className="text-center add_tour_add_title">Edit your Details</p>
                        <div className="flex flex-col gap-[10px] mt-[20px]">
                            <ManageFormInput value={profileData.username} handleChange={handleChange} label={"Full Name"} isMandatory={true} id={"username"} type={"text"} />
                            <ManageFormInput value={profileData.phone} handleChange={handleChange} label={"Phone"} isMandatory={false} id={"phone"} type={"text"} />
                            <ManageFormImage setNewImageFile={setNewImageFile} newImageFile={newImageFile} value={userImg} label={"Picture"} isMandatory={false} id={"image"} type={"file"} />
                        </div>
                    </div>
                </Modal>
            </div>
            )}
        </div>
    );
}

export default memo(EditProfile);
