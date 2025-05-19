import React,{memo} from 'react'
import {NavLink} from 'react-router-dom'
import './admin-sidebar.css'

interface AdminSidebarProps {
    toggleSidebar: any;
}

const AdminSidebar: React.FC<AdminSidebarProps> =({toggleSidebar})=>{
    return(
        <div className="admin_sidebar" style={{width:toggleSidebar?'250px':'60px'}}>
            <div className="admin_sidebar_section">
                <div className="admin_sidebar_section_title">
                    <p>MENU</p>
                </div>
                <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'admin_sidebar_element active' : 'admin_sidebar_element')} style={{justifyContent:toggleSidebar?'':'center'}}>
                    <div className="flex items-center gap-2 admin_sidebar_element_main">
                        <i className="ri-line-chart-line"></i>
                        {toggleSidebar?<p>Analytics</p>:<></>}
                    </div>
                    {toggleSidebar?<div className="admin_sidebar_element_arrow"><i className="ri-arrow-right-s-fill"></i></div>:<></>}    
                </NavLink>
                <NavLink to="/add-tour" className={({ isActive }) => (isActive ? 'admin_sidebar_element active' : 'admin_sidebar_element')} style={{justifyContent:toggleSidebar?'':'center'}}>
                    <div className="flex gap-2 items-center admin_sidebar_element_main">
                        <i className="ri-suitcase-3-line"></i>
                        {toggleSidebar?<p>Tours</p>:<></>}
                    </div>
                    {toggleSidebar?<div className="admin_sidebar_element_arrow"><i className="ri-arrow-right-s-fill"></i></div>:<></>}               
                </NavLink>
                <NavLink to="/add-destination" className={({ isActive }) => (isActive ? 'admin_sidebar_element active' : 'admin_sidebar_element')} style={{justifyContent:toggleSidebar?'':'center'}}>
                    <div className="flex gap-2 items-center admin_sidebar_element_main">
                        <i className="ri-road-map-line"></i>
                        {toggleSidebar?<p>Destinations</p>:<></>}
                    </div>
                    {toggleSidebar?<div className="admin_sidebar_element_arrow"><i className="ri-arrow-right-s-fill"></i></div>:<></>}      
                </NavLink>
                <NavLink to="/add-activity" className={({ isActive }) => (isActive ? 'admin_sidebar_element active' : 'admin_sidebar_element')} style={{justifyContent:toggleSidebar?'':'center'}}>
                    <div className="flex gap-2 items-center admin_sidebar_element_main">
                        <i className="ri-run-line"></i> 
                        {toggleSidebar?<p>Activities</p>:<></>}
                    </div>
                    {toggleSidebar?<div className="admin_sidebar_element_arrow"><i className="ri-arrow-right-s-fill"></i></div>:<></>}     
                </NavLink>
                <NavLink to="/manage-bookings" className={({ isActive }) => (isActive ? 'admin_sidebar_element active' : 'admin_sidebar_element')} style={{justifyContent:toggleSidebar?'':'center'}}>
                    <div className="flex items-center gap-2 admin_sidebar_element_main">
                        <i className="ri-booklet-line"></i>
                        {toggleSidebar?<p>Bookings</p>:<></>}
                    </div>
                    {toggleSidebar?<div className="admin_sidebar_element_arrow"><i className="ri-arrow-right-s-fill"></i></div>:<></>}    
                </NavLink>
            </div>
        </div>
    )
}


export default memo(AdminSidebar);