import React, { useState, useEffect } from 'react';
import '../styles/add-tour.css';
import UniSidebar from "../Components/Dashboard/DashboardSidebar/DashboardSidebar.jsx";
import UniDashboardHeader from "../Components/Dashboard/DashboardHeader/DashboardHeader.jsx";
import EditTour from '../Components/Dashboard/ManageTour/EditTour.jsx';
import DeleteTour from '../Components/Dashboard/ManageTour/DeleteTour.jsx';
import { BASE_URL } from '../utils/config.js';


const AddTour = () => {

    const [allTours, setAllTours] = useState(true);
    const [addTour, setAddTour] = useState(0);
    const [edit, setEdit] = useState(null);  
    const [del, setDelete] = useState(0);
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [tourData, setTourData] = useState({
       title: '',
       location: '',
       image: null,
       description: '',
       duration: '',
       price: '',
       capacity: '',
       vacancy: '',
       start_date: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { title, location, image, description, duration, price, capacity, vacancy, start_date } = tourData;
        setIsFormValid(
            title && location && image && description && duration && price && capacity && vacancy && start_date
        );
    }, [tourData]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tours`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTours(data);
                if (data.length === 0) {
                    setError('No Tours added');
                }
            } catch (error) {
                setError('Error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

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

            const response = await fetch(`${BASE_URL}/tours/`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setAddTour(2);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error adding tour:', error);
            setError('Error adding tour'); // Display error on UI instead of alert
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="add_tour_container">
            <UniSidebar />
            <UniDashboardHeader />

            <div className="add_tour_main" style={{marginLeft:'50px'}}>

                {/* Buttons Section */}
                <div className="flex gap-3 py-3 add_tour_bttns">
                    <button className={allTours ? "add_tour_all_bttn_active" : "add_tour_all_bttn"} onClick={() => { setAddTour(0); setAllTours(true); }}>All Tours</button>
                    <button className={addTour ? "add_tour_add_bttn_active" : "add_tour_add_bttn"} onClick={() => { setAddTour(1); setAllTours(false); }}>Add Tour</button>
                </div>

                {/* Add Tour Section */}
                {
                    addTour ?
                        <div className="py-12 flex justify-center">
                            {/* STEP 1 */}
                            {
                                addTour === 1 ?
                                    <div className="add_tour_add">
                                        <p className="text-center add_tour_add_title">Add the Details of Tour</p>
                                        <div className="flex justify-end"><p className="add_tour_add_step">STEP 01/01</p></div>
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
                                                <label htmlFor="image"><p>Photo<span style={{ color: 'red' }}>*</span></p></label>
                                                <input type="file" id="image" name="imahge" accept="image/*"  onChange={handleImageChange} />
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
                                                <button disabled={!isFormValid} style={{ opacity: isFormValid ? 1 : 0.5 }} onClick={handleSubmit}>ADD</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }

                            {/* Success Message */}
                            {
                                addTour === 2 ?
                                    <div className="flex flex-col items-center gap-8 add_tour_add_success">
                                        <div className="flex items-center justify-center add_tour_add_success_tick"><i className="ri-check-line"></i></div>
                                        <p className="font-medium m-0">Added Tour Successfully</p>
                                    </div>
                                    :
                                    <></>
                            }

                        </div>
                        :
                        <></>
                }

                {/* ALL Tours Section */}
                {
                    allTours ?
                        <div className="add_tour_list_section">
                            <div className="flex justify-between items-center add_tour_list_title_section">
                                <p className="text-2xl font-semibold">All Tours</p>
                            </div>

                            <div className="flex flex-wrap gap-5">
                            {loading && <p className="text-center p-5 add_tour_error">Loading...</p>}
                            {error && <p className="text-center p-5 add_tour_error">{error}</p>}
                            {!loading && !error && tours.length === 0 && (
                                <p className="text-center p-5 add_tour_error">No Tours added</p>
                            )}
                            {!loading && !error &&
                                tours.map((tour) => (
                                <div key={tour._id} className="add_tour_card">
                                    <div className="add_tour_card_img">
                                        <img src={`${BASE_URL}/${tour.image.replace(/\\/g, '/')}`} alt="tour poster"/>
                                    </div>
                                    <div className="flex py-1 px-2">
                                        <p className="m-0 text-lg"><span className="font-semibold">#id:</span> {tour._id}</p>
                                    </div>
                                    <div className="flex justify-between items-center py-1 px-2">
                                        <p className="m-0 font-bold text-lg truncate w-1/2">{tour.title}</p>
                                        <p className="m-0 font-semibold truncate w-1/2 text-right">{tour.location}</p>
                                    </div>
                                    <div className="flex justify-between items-center py-1 px-2">
                                        <p className="m-0 font-semibold truncate w-1/2">{tour.duration}</p>
                                        <p className="m-0 font-semibold truncate w-1/2 text-right">₹{tour.price}</p>
                                    </div>
                                    <div className="flex justify-between items-center py-1 px-2">
                                        <p className="m-0 font-semibold truncate w-1/2">Availability: {tour.vacancy}/{tour.capacity}</p>
                                        <p className="m-0 font-semibold truncate w-1/2 text-right">{formatDate(tour.start_date)}</p>
                                    </div>
                                    <div className="py-1 px-2 add_tour_desc">
                                        <p className="m-0"><span className="font-semibold">Description: </span>{tour.description}</p>
                                    </div>
                                    <div className="flex justify-end gap-4 py-1 px-3 text-2xl cursor-pointer">
                                        <i onClick={() => setEdit(tour)} className="ri-pencil-fill cursor-pointer hover:underline"></i>
                                        <i onClick={() => setDelete(tour._id)} className="ri-delete-bin-6-line cursor-pointer hover:underline"></i>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                        :
                        <></>
                }

                {/* Edit and Delete Sections */}
                {edit?
                    <EditTour setEdit={setEdit} tour={edit} />
                    :
                    <></>
                }
                {del !== 0 && <DeleteTour setDelete={setDelete} id={del} />}

            </div>
        </div>
    );
}

export default AddTour;
