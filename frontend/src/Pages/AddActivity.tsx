import React, { useState, useEffect } from 'react';
import '../styles/add-tour.css';
import { BASE_URL } from '../utils/config';
import AdminHeader from '../Components/Dashboard/AdminHeader/AdminHeader';
import AdminSidebar from '../Components/Dashboard/AdminSidebar/AdminSidebar';
import ActivityCard from '../Components/Dashboard/ActivityCard/ActivityCard';
import EditActivity from '../Components/Dashboard/ManageActivity/EditActivity';
import DeleteActivity from '../Components/Dashboard/ManageActivity/DeleteActivity';


const AddActivity = () => {

    const [allActivities, setAllActivities] = useState(true);
    const [addActivity, setAddActivity] = useState(0);
    const [edit, setEdit] = useState(null);  
    const [del, setDelete] = useState(0);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [toggleSidebar,setToggleSidebar] = useState(0);

    const [activityData, setActivityData] = useState<any>({
       title: '',
       description: '',
       dest_id: '',
       price: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { title, description,dest_id, price } = activityData;
        setIsFormValid(
            title && description && dest_id && price 
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

    const handleChange = (e: any) => {
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
        <div>
            <AdminHeader setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar}/>
            <AdminSidebar toggleSidebar={toggleSidebar}/>

            <div className={`admin_dashboard_main ml-[60px] ${toggleSidebar?'md:ml-[250px]':''}`}>

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

                            <div className="add_tour_cards">
                            {loading && <p className="text-center p-5 add_tour_error">Loading...</p>}
                            {error && <p className="text-center p-5 add_tour_error">{error}</p>}
                            {!loading && !error && activities.length === 0 && (
                                <p className="text-center p-5 add_tour_error">No Activities added</p>
                            )}
                            {!loading && !error &&
                                activities.map((activity) => (
                                <ActivityCard activity={activity} setEdit={setEdit} setDelete={setDelete} />
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
