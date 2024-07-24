import React, { useState, useEffect } from 'react';
import {BASE_URL} from '../../utils/config';


const EditProfile = ({ setEdit, userData }) => {
    // To check if the edit is successful
    const [editSuccess, setEditSuccess] = useState(0);
    
    // To store the input details
    const [profileData, setProfileData] = useState({
        username: userData.username,
        phone: userData.phone,
        password: '',
        image: userData.image,
     });


    // To handle changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const [isFormValid, setIsFormValid] = useState(false);
    // To check if all the details are filled and passwords match
    useEffect(() => {
        const { username, phone } = profileData;
        setIsFormValid(
            username && phone
        );
    }, [profileData]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
    
        if (file) {
            if (file.size > 2 * 1024 * 1024) { 
                alert('File size exceeds 2 MB limit. Please choose a smaller file.');
                event.target.value = '';  
                return;
            }

            console.log(`File selected: ${file.name}, Size: ${Math.round(file.size / 1024)} KB, Type: ${file.type}`);
    
            setProfileData({
                ...profileData,
                image: file,
            });
        }
    };

    // Handle submit
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('username', profileData.username);
            formData.append('phone',  profileData.phone);
            if(profileData.password){
                formData.append('password',  profileData.password);
            }
            if ( profileData.image) {
                formData.append('image',  profileData.image);
            }

            const response = await fetch(`${BASE_URL}/users/${userData._id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }            

            setEditSuccess(1);
            // done message (1 sec)
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
        } catch (error) {
            console.error('Error editing details', error);
            alert('Error editing details');
        }
    };

    return (
        <div className="edit_tour_main">
            {editSuccess === 0 ? (
                <div className="add_tour_add bg-white">
                    <div className="flex justify-end font-semibold text-xl cursor-pointer">
                        <i onClick={() => setEdit(0)} className="ri-close-line"></i>
                    </div>
                    <p className="text-center add_tour_add_title">Edit your Details</p>
                    <div className="add_tour_add_main">
                        <div className="add_tour_add_section">
                            <label htmlFor="username"><p>Full Name<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="username" name="username" placeholder='Enter you Full Name' value={profileData.username} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="phone"><p>Phone<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="number" id="phone" name="phone" placeholder='Enter Phone Number' value={profileData.phone} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="password"><p>New Password</p></label>
                            <input type="password" id="password" name="password" placeholder='New Password' value={profileData.password} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="image"><p>Profile Picture</p></label>
                            <input type="file" id="image" name="imahge" accept="image/*"  onChange={handleImageChange} />
                        </div>
                        <div className="flex justify-center pt-5 add_tour_add_section_bttn">
                            <button disabled={!isFormValid} style={{ opacity: isFormValid ? 1 : 0.5 }} onClick={handleSubmit}>Edit</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-8 bg-white p-5 add_tour_add_success">
                    <div className="flex items-center justify-center add_tour_add_success_tick">
                        <i className="ri-check-line"></i>
                    </div>
                    <p className="font-medium">Edited Details Successfully</p>
                </div>
            )}
        </div>
    );
}

export default EditProfile;
