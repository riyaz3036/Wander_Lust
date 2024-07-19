import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import './dash-sidebar.css';
import logo from '../../../assets/images/logo.png'
import logo_mini from '../../../assets/images/logo_mini.png'
import Logout from '../Logout/Logout'

const DashboardSidebar = () => {

    const [logout,setLogout] = useState(0);

    //to manage sidebar and header
    const [open,setOpen] = useState(0);

    return (
        <div className="flex flex-col sidebar_main" style={{width:open?"210px":"50px"}}>
            <div className="sidebar_logo">
                {
                    open?
                    <img src={logo} />
                    :
                    <img src={logo_mini} />
                }
            </div>

            <div className="sidebar_arrow" onClick={()=>setOpen(!open)}>
                {
                    open?
                    <i class="ri-arrow-left-s-line"></i>
                    :
                    <i class="ri-arrow-right-s-line"></i>
                }
            </div>

            <div className="sidebar_section" style={{borderBottom: "1px solid #E0E0E0"}}>
                <NavLink to="/add-tour" className={({ isActive }) => (isActive ? 'sidebar_option active' : 'sidebar_option')} style={{width:open?"200px":"40px"}}>
                    <i class="ri-road-map-fill"></i>
                    {
                        open?
                        <p className="m-0">Tours</p>
                        :
                        <></>
                    }
                </NavLink>
                <NavLink to="/add-destination" className={({ isActive }) => (isActive ? 'sidebar_option active' : 'sidebar_option')} style={{width:open?"200px":"40px"}}>
                    <i class="ri-map-pin-5-fill"></i>
                    {
                        open?
                        <p className="m-0">Destinations</p>
                        :
                        <></>
                    }
                </NavLink>
                <NavLink to="/add-activity" className={({ isActive }) => (isActive ? 'sidebar_option active' : 'sidebar_option')} style={{width:open?"200px":"40px"}}>
                    <i class="ri-input-method-fill"></i>
                    {
                        open?
                        <p className="m-0">Activities</p>
                        :
                        <></>
                    }
                </NavLink>
                <NavLink to="/manage-bookings" className={({ isActive }) => (isActive ? 'sidebar_option active' : 'sidebar_option')} style={{width:open?"200px":"40px"}}>
                    <i class="ri-git-repository-fill"></i>
                    {
                        open?
                        <p className="m-0">Bookings</p>
                        :
                        <></>
                    }
                </NavLink>
            </div>

            <div>
                <div className='sidebar_option cursor-pointer' style={{width:open?"200px":"40px"}} onClick={()=>setLogout(1)}>
                    <i class="ri-logout-circle-fill"></i>
                    {
                        open?
                        <p className="m-0">Logout</p>
                        :
                        <></>
                    }
                </div>
            </div>

            {
                logout?
                <Logout setLogout={setLogout}/>
                :
                <></>
            }

            
        </div>
    )
}

export default DashboardSidebar;