import React, { useState, useEffect, memo } from 'react';
import {BASE_URL} from '../../../utils/config';


const EditDestination = ({ setEdit, destination }) => {
    // To check if the edit is successful
    const [editSuccess, setEditSuccess] = useState(0);
    
    // To store the event input details
    const [destinationData, setDestinationData] = useState({
        title: destination.title,
        image: destination.image,
        description: destination.description,
        tour_id: destination.tour_id
     });

     const [isFormValid, setIsFormValid] = useState(false);
    // To check if all the details are filled and passwords match
    useEffect(() => {
        const { title, image, description,tour_id } = destinationData;
        setIsFormValid(
            title && image && description && tour_id 
        );
    }, [destinationData]);


    // To handle changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestinationData({ ...destinationData, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
    
        if (file) {
            if (file.size > 2 * 1024 * 1024) { 
                alert('File size exceeds 2 MB limit. Please choose a smaller file.');
                event.target.value = '';  
                return;
            }

            console.log(`File selected: ${file.name}, Size: ${Math.round(file.size / 1024)} KB, Type: ${file.type}`);
    
            setDestinationData({
                ...destinationData,
                image: file,
            });
        }
    };

    // Handle submit
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', destinationData.title);
            formData.append('description',  destinationData.description);
            formData.append('tour_id',  destinationData.tour_id);
            if ( destinationData.image) {
                formData.append('image',  destinationData.image);
            }

            const response = await fetch(`${BASE_URL}/destinations/${destination._id}`, {
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
            console.error('Error editing destination:', error);
            alert('Error editing destination');
        }
    };

    return (
        <div className="edit_tour_main">
            {editSuccess === 0 ? (
                <div className="add_tour_add bg-white">
                    <div className="flex justify-end font-semibold text-xl cursor-pointer">
                        <i onClick={() => setEdit(0)} className="ri-close-line"></i>
                    </div>
                    <p className="text-center add_tour_add_title">Edit the Details of Destination</p>
                    <div className="flex justify-end">
                        <p className="add_tour_add_step">STEP 01/01</p>
                    </div>
                    <div className="add_tour_add_main">
                        <div className="add_tour_add_section">
                            <label htmlFor="title"><p>Title<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="title" name="title" placeholder='Enter the Title' value={destinationData.title} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="description"><p>Description<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="description" name="description" placeholder='Enter the Description' value={destinationData.description} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="image"><p>Photo<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="file" id="image" name="imahge" accept="image/*"  onChange={handleImageChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="tour_id"><p>Tour ID<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="tour_id" name="tour_id" placeholder='Enter the ID of the Tour' value={destinationData.tour_id} onChange={handleChange} />
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
                    <p className="font-medium">Edited Destination Successfully</p>
                </div>
            )}
        </div>
    );
}

export default memo(EditDestination);
