import React, { useState, useEffect } from 'react';
import './edit-tour.css';
import {BASE_URL} from '../../../utils/config';


const EditTour = ({ setEdit, tour }) => {
    // To check if the edit is successful
    const [editSuccess, setEditSuccess] = useState(0);
    
    // Function to format date for input
    const formatDateForInput = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split('T')[0];
    };

    // To store the event input details
    const [tourData, setTourData] = useState({
       title: tour.title,
       location: tour.location,
       image: tour.image,
       description: tour.description,
       duration: tour.duration,
       price: tour.price,
       capacity: tour.capacity,
       vacancy: tour.vacancy,
       start_date: formatDateForInput(tour.start_date)
    });


    // To check if all the details are filled and passwords match
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        const { title,location,description,duration,price,capacity,vacancy,start_date} = tourData;
        setIsFormValid(
            title && location  && description && duration && price && capacity && vacancy && start_date
        );
    }, [tourData]);


    // To handle changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTourData({ ...tourData, [name]: value });
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
    
            setTourData({
                ...tourData,
                image: file,
            });
        }
    };

    // Handle submit
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', tourData.title);
            formData.append('location',  tourData.location);
            formData.append('description',  tourData.description);
            formData.append('duration',  tourData.duration);
            formData.append('price',  tourData.price);
            formData.append('capacity',  tourData.capacity);
            formData.append('vacancy',  tourData.vacancy);
            formData.append('start_date',  tourData.start_date);
            if ( tourData.image) {
                formData.append('image',  tourData.image);
            }

            const response = await fetch(`${BASE_URL}/tours/${tour._id}`, {
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
            console.error('Error editing tour:', error);
            alert('Error editing tour');
        }
    };

    return (
        <div className="edit_tour_main">
            {editSuccess === 0 ? (
                <div className="add_tour_add bg-white">
                    <div className="flex justify-end font-semibold text-xl cursor-pointer">
                        <i onClick={() => setEdit(0)} className="ri-close-line"></i>
                    </div>
                    <p className="text-center add_tour_add_title">Edit the Details of Tour</p>
                    <div className="flex justify-end">
                        <p className="add_tour_add_step">STEP 01/01</p>
                    </div>
                    <div className="add_tour_add_main">
                        <div className="add_tour_add_section">
                            <label htmlFor="title"><p>Title<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="title" name="title" placeholder='Enter the Title' value={tourData.title} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="location"><p>Location<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="location" name="location" placeholder='Enter the Location' value={tourData.location} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="description"><p>Description<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="description" name="description" placeholder='Enter the Description' value={tourData.description} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="image"><p>Photo</p></label>
                            <input type="file" id="image" name="image" accept="image/*"  onChange={handleImageChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="duration"><p>Duration<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="duration" name="duration" placeholder='Enter the Duration' value={tourData.duration} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="price"><p>Price<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="price" name="price" placeholder='Enter the Price' value={tourData.price} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="capacity"><p>Capacity<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="capacity" name="capacity" placeholder='Enter the Capacity' value={tourData.capacity} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="vacancy"><p>Vacancy<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="text" id="vacancy" name="vacancy" placeholder='Enter the Vacancy' value={tourData.vacancy} onChange={handleChange} />
                        </div>
                        <div className="add_tour_add_section">
                            <label htmlFor="start_date"><p>Start Date<span style={{ color: 'red' }}>*</span></p></label>
                            <input type="date" id="start_date" name="start_date" placeholder='Enter the Start Date' value={tourData.start_date} onChange={handleChange} />
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
                    <p className="font-medium">Edited Tour Successfully</p>
                </div>
            )}
        </div>
    );
}

export default EditTour;
