import React, { useState, useEffect } from 'react';
import '../styles/add-tour.css';
import UniSidebar from "../Components/Dashboard/DashboardSidebar/DashboardSidebar.jsx";
import UniDashboardHeader from "../Components/Dashboard/DashboardHeader/DashboardHeader.jsx";
import EditActivity from '../Components/Dashboard/ManageActivity/EditActivity.jsx';
import DeleteActivity from '../Components/Dashboard/ManageActivity/DeleteActivity.jsx';
import { BASE_URL } from '../utils/config.js';


const AddActivity = () => {

    const [allActivities, setAllActivities] = useState(true);
    const [addActivity, setAddActivity] = useState(0);
    const [edit, setEdit] = useState(null);  
    const [del, setDelete] = useState(0);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [activityData, setActivityData] = useState({
       title: '',
       description: '',
       dest_id: '',
       price: '',
       capacity: '',
       vacancy: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { title, description,dest_id, price, capacity,vacancy } = activityData;
        setIsFormValid(
            title && description && dest_id && price && capacity && vacancy
        );
    }, [activityData]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${BASE_URL}/activities/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setActivities(data);
                if (data.length === 0) {
                    setError('No Activities added');
                }
            } catch (error) {
                setError('Error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivityData({ ...activityData, [name]: value });
    };
    

    const handleSubmit = async () => {
        try { 
                
            const response = await fetch(`${BASE_URL}/activities/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            setAddActivity(2);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error adding Activity:', error);
            setError('Error adding Activity');
        }
    };
    

    
    return (
        <div className="add_tour_container">
            <UniSidebar />
            <UniDashboardHeader />

            <div className="add_tour_main" style={{marginLeft:'50px'}}>

                {/* Buttons Section */}
                <div className="flex gap-3 py-3 add_tour_bttns">
                    <button className={allActivities ? "add_tour_all_bttn_active" : "add_tour_all_bttn"} onClick={() => { setAddActivity(0); setAllActivities(true); }}>All Activities</button>
                    <button className={addActivity ? "add_tour_add_bttn_active" : "add_tour_add_bttn"} onClick={() => { setAddActivity(1); setAllActivities(false); }}>Add Activity</button>
                </div>

                {/* Add Activity Section */}
                {
                    addActivity ?
                        <div className="py-12 flex justify-center">
                            {/* STEP 1 */}
                            {
                                addActivity === 1 ?
                                    <div className="add_tour_add">
                                        <p className="text-center add_tour_add_title">Add the Details of Activity</p>
                                        <div className="flex justify-end"><p className="add_tour_add_step">STEP 01/01</p></div>
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
                                                <button disabled={!isFormValid} style={{ opacity: isFormValid ? 1 : 0.5 }} onClick={handleSubmit}>ADD</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }

                            {/* Success Message */}
                            {
                                addActivity === 2 ?
                                    <div className="flex flex-col items-center gap-8 add_tour_add_success">
                                        <div className="flex items-center justify-center add_tour_add_success_tick"><i className="ri-check-line"></i></div>
                                        <p className="font-medium m-0">Added Activity Successfully</p>
                                    </div>
                                    :
                                    <></>
                            }

                        </div>
                        :
                        <></>
                }

                {/* ALL Activities Section */}
                {
                    allActivities ?
                        <div className="add_tour_list_section">
                            <div className="flex justify-between items-center add_tour_list_title_section">
                                <p className="text-2xl font-semibold">All Activities</p>
                            </div>

                            <div className="flex flex-wrap gap-5">
                            {loading && <p className="text-center p-5 add_tour_error">Loading...</p>}
                            {error && <p className="text-center p-5 add_tour_error">{error}</p>}
                            {!loading && !error && activities.length === 0 && (
                                <p className="text-center p-5 add_tour_error">No Activities added</p>
                            )}
                            {!loading && !error &&
                                activities.map((activity) => (
                                <div key={activity._id} className="add_tour_card">
                                    <div className="flex py-1 px-2">
                                        <p className="m-0 text-lg"><span className="font-semibold">#id:</span> {activity._id}</p>
                                    </div>
                                    <div className="flex py-1 px-2">
                                        <p className="m-0 text-lg"><span className="font-semibold">Destination #id:</span> {activity.dest_id}</p>
                                    </div>
                                    <div className="flex justify-between items-center py-1 px-2">
                                        <p className="m-0 font-semibold truncate w-1/2">Availability: {activity.vacancy}/{activity.capacity}</p>
                                        <p className="m-0 font-semibold truncate w-1/2 text-right">₹{activity.price}</p>
                                    </div>                                   
                                    <div className="flex justify-between items-center py-1 px-2">
                                        <p className="m-0 font-bold text-lg truncate w-1/2">{activity.title}</p>
                                    </div>                                   
                                    <div className="py-1 px-2 add_tour_desc">
                                        <p className="m-0"><span className="font-semibold">Description: </span>{activity.description}</p>
                                    </div>
                                    <div className="flex justify-end gap-4 py-1 px-3 text-2xl cursor-pointer">
                                        <i onClick={() => setEdit(activity)} className="ri-pencil-fill cursor-pointer hover:underline"></i>
                                        <i onClick={() => setDelete(activity._id)} className="ri-delete-bin-6-line cursor-pointer hover:underline"></i>
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
                    <EditActivity setEdit={setEdit} activity={edit} />
                    :
                    <></>
                }
                {del !== 0 && <DeleteActivity setDelete={setDelete} id={del} />}

            </div>
        </div>
    );
}

export default AddActivity;
