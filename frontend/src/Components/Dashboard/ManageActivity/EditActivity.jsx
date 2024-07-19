import React, { useState, useEffect } from 'react';
import {BASE_URL} from '../../../utils/config';


const EditActivity = ({ setEdit, activity }) => {
    // To check if the edit is successful
    const [editSuccess, setEditSuccess] = useState(0);
    
    // To store the event input details
    const [activityData, setActivityData] = useState({
        title: activity.title,
        description: activity.description,
        dest_id: activity.dest_id,
        price: activity.price,
        capacity: activity.capacity,
        vacancy: activity.vacancy
     });

     const [isFormValid, setIsFormValid] = useState(false);
    // To check if all the details are filled and passwords match
    useEffect(() => {
        const { title, description,dest_id, price, capacity,vacancy } = activityData;
        setIsFormValid(
            title && description && dest_id && price && capacity && vacancy
        );
    }, [activityData]);


    // To handle changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivityData({ ...activityData, [name]: value });
    };

    console.log(activityData);
    // Handle submit
    const handleSubmit = async () => {
        try {         

            const response = await fetch(`${BASE_URL}/activities/${activity._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData)
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
            console.error('Error editing activity:', error);
            alert('Error editing activity');
        }
    };

    return (
        <div className="edit_tour_main">
            {editSuccess === 0 ? (
                <div className="add_tour_add bg-white">
                    <div className="flex justify-end font-semibold text-xl cursor-pointer">
                        <i onClick={() => setEdit(0)} className="ri-close-line"></i>
                    </div>
                    <p className="text-center add_tour_add_title">Edit the Details of Activity</p>
                    <div className="flex justify-end">
                        <p className="add_tour_add_step">STEP 01/01</p>
                    </div>
                    <div className="add_tour_add_main">
                        <div className="add_tour_add_section">
                            <label htmlFor="title"><p>Title<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="title" name="title" placeholder='Enter the Title' value={activityData.title} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="description"><p>Description<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="description" name="description" placeholder='Enter the Description' value={activityData.description} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="dest_id"><p>Destination ID<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="dest_id" name="dest_id" placeholder='Enter the ID of the Destination' value={activityData.dest_id} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="price"><p>Price<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="price" name="price" placeholder='Enter the Price' value={activityData.price} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="capacity"><p>Capacity<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="capacity" name="capacity" placeholder='Enter the Capacity' value={activityData.capacity} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="vacancy"><p>Vacancy<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="vacancy" name="vacancy" placeholder='Enter the Vacancy' value={activityData.vacancy} onChange={handleChange} />
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
                    <p className="font-medium">Edited Activity Successfully</p>
                </div>
            )}
        </div>
    );
}

export default EditActivity;
