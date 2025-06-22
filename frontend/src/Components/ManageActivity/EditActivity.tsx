import React, { useState, useEffect, memo } from 'react';
import {message} from 'antd';
import { Activity } from '../../types/activity.types';
import ActivityService from '../../service/activity.service';

interface EditActivityProps {
    setToEditActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
    activity: Activity;
}

const EditActivity: React.FC<EditActivityProps> = ({ setToEditActivity, activity }) => {
    // To check if the edit is successful
    const [editSuccess, setEditSuccess] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    
    // To store the event input details
    const [activityData, setActivityData] = useState({
        title: activity.title,
        description: activity.description,
        dest_id: activity.dest_id,
        price: activity.price
     });

     const [isFormValid, setIsFormValid] = useState(false);
    // To check if all the details are filled and passwords match
    useEffect(() => {
        const { title, description,dest_id, price } = activityData;
        setIsFormValid(!!(title && description && dest_id && price));
    }, [activityData]);


    // To handle changes in the form
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setActivityData({ ...activityData, [name]: value });
    };


    const handleSubmit = async () => {
        setLoading(true);
        ActivityService.addActivity(activityData)
            .then((response) => {
                setEditSuccess(1);
                // done message (1 sec)
                setTimeout(() => {
                    window.location.reload(); 
                }, 1000);
            })
            .catch((error) => {
                console.error('Error while editing Activity.', error);
                message.error(error.message || 'Error while editing Activity.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="edit_tour_main">
            {editSuccess === 0 ? (
                <div className="add_tour_add bg-white">
                    <div className="flex justify-end font-semibold text-xl cursor-pointer">
                        <i onClick={() => setToEditActivity(null)} className="ri-close-line"></i>
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

export default memo(EditActivity);
