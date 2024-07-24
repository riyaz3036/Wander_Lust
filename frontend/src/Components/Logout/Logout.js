import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './logout.css';


const Logout = ({setLogout}) => {

    const navigate = useNavigate();
    const {user, dispatch} = useContext(AuthContext);

    const handleLogout=()=>{
        dispatch({type:'LOGOUT'})
        navigate('/')
        alert("Successfully Logged out!!")
    }
    
    return (
        <div className="delete_event_main">
            <div className="delete_event_box">
                <p className="delete_event_ques">Are you sure you want to Logout?</p>
                <div className="delete_event_bttns">
                    <button className="delete_event_yes" onClick={handleLogout}>Yes</button>
                    <button className="delete_event_no" onClick={() => setLogout(0)}>No</button>
                </div>
            </div>
        </div>
    );
}

export default Logout;
