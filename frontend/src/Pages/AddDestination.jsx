import React, { useState, useEffect } from 'react';
import '../styles/add-tour.css';
import AdminHeader from '../Components/Dashboard/AdminHeader/AdminHeader';
import AdminSidebar from '../Components/Dashboard/AdminSidebar/AdminSidebar';
import EditDestination from '../Components/Dashboard/ManageDestination/EditDestination.jsx';
import DeleteDestination from '../Components/Dashboard/ManageDestination/DeleteDestination.jsx';
import DestCard from '../Components/Dashboard/DestCard/DestCard.js';
import { BASE_URL } from '../utils/config.js';


const AddDestination = () => {

    const [allDestinations, setAllDestinations] = useState(true);
    const [addDestination, setAddDestination] = useState(0);
    const [edit, setEdit] = useState(null);  
    const [del, setDelete] = useState(0);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [toggleSidebar,setToggleSidebar] = useState(0);

    const [destinationData, setDestinationData] = useState({
       title: '',
       image: null,
       description: '',
       tour_id: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { title, image, description,tour_id } = destinationData;
        setIsFormValid(
            title && image && description && tour_id 
        );
    }, [destinationData]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch(`${BASE_URL}/destinations`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDestinations(data);
                if (data.length === 0) {
                    setError('No Destinations added');
                }
            } catch (error) {
                setError('Error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

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
    

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', destinationData.title);
            formData.append('description',  destinationData.description);
            formData.append('tour_id',  destinationData.tour_id);
            if ( destinationData.image) {
                formData.append('image',  destinationData.image);
            }

            const response = await fetch(`${BASE_URL}/destinations/`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setAddDestination(2);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error adding Destination:', error);
            setError('Error adding Destination'); // Display error on UI instead of alert
        }
    };

    
    return (
        <div>
            <AdminHeader setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar}/>
            <AdminSidebar toggleSidebar={toggleSidebar}/>

            <div className={`admin_dashboard_main ml-[60px] ${toggleSidebar?'md:ml-[250px]':''}`}>

                {/* Buttons Section */}
                <div className="flex gap-3 py-3 add_tour_bttns">
                    <button className={allDestinations ? "add_tour_all_bttn_active" : "add_tour_all_bttn"} onClick={() => { setAddDestination(0); setAllDestinations(true); }}>All Destinations</button>
                    <button className={addDestination ? "add_tour_add_bttn_active" : "add_tour_add_bttn"} onClick={() => { setAddDestination(1); setAllDestinations(false); }}>Add Destination</button>
                </div>

                {/* Add Destination Section */}
                {
                    addDestination ?
                        <div className="py-12 flex justify-center">
                            {/* STEP 1 */}
                            {
                                addDestination === 1 ?
                                    <div className="add_tour_add">
                                        <p className="text-center add_tour_add_title">Add the Details of Destination</p>
                                        <div className="flex justify-end"><p className="add_tour_add_step">STEP 01/01</p></div>
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
                                                <button disabled={!isFormValid} style={{ opacity: isFormValid ? 1 : 0.5 }} onClick={handleSubmit}>ADD</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }

                            {/* Success Message */}
                            {
                                addDestination === 2 ?
                                    <div className="flex flex-col items-center gap-8 add_tour_add_success">
                                        <div className="flex items-center justify-center add_tour_add_success_tick"><i className="ri-check-line"></i></div>
                                        <p className="font-medium m-0">Added Destination Successfully</p>
                                    </div>
                                    :
                                    <></>
                            }

                        </div>
                        :
                        <></>
                }

                {/* ALL Destinations Section */}
                {
                    allDestinations ?
                        <div className="add_tour_list_section">
                            <div className="flex justify-between items-center add_tour_list_title_section">
                                <p className="text-2xl font-semibold">All Destinations</p>
                            </div>

                            <div className="add_tour_cards">
                            {loading && <p className="text-center p-5 add_tour_error">Loading...</p>}
                            {error && <p className="text-center p-5 add_tour_error">{error}</p>}
                            {!loading && !error && destinations.length === 0 && (
                                <p className="text-center p-5 add_tour_error">No Destinations added</p>
                            )}
                            {!loading && !error &&
                                destinations.map((destination) => (
                                <DestCard destination={destination} setDelete={setDelete} setEdit={setEdit} />
                                ))}
                            </div>
                        </div>
                        :
                        <></>
                }

                {/* Edit and Delete Sections */}
                {edit?
                    <EditDestination setEdit={setEdit} destination={edit} />
                    :
                    <></>
                }
                {del !== 0 && <DeleteDestination setDelete={setDelete} id={del} />}

            </div>
        </div>
    );
}

export default AddDestination;
