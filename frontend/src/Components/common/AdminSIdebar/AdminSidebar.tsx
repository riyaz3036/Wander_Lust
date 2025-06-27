import { NavLink } from "react-router-dom";
import RouteConstants from "../../../constants/RouteConstants";
import './admin-sidebar.css';


interface AdminSidebarProps {
    toggleSidebar: any;
}

const SidebarItems = [
    {
        title: 'Analytics',
        route: RouteConstants.analytics,
        icon: (<i className="ri-line-chart-line"></i>)
    },
    {
        title: 'Tours',
        route: RouteConstants.manageTour,
        icon: (<i className="ri-suitcase-3-line"></i>)
    },
    {
        title: 'Destinations',
        route: RouteConstants.manageDestination,
        icon: ( <i className="ri-road-map-line"></i>)
    },
    {
        title: 'Activities',
        route: RouteConstants.manageActivity,
        icon: (<i className="ri-run-line"></i>)
    },
    {
        title: 'Bookings',
        route: RouteConstants.manageBookings,
        icon: (<i className="ri-booklet-line"></i>)
    }
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({toggleSidebar}) => {
    return (
        <div className="admin_sidebar" style={{width: toggleSidebar? '250px' : '60px' }}>
            <div className="admin_sidebar_section">
                <div className="admin_sidebar_section_title">
                    <p>MENU</p>
                </div>
                {SidebarItems.map((sidebarItem, index) => (
                    <NavLink key={index} to={sidebarItem.route} className={({ isActive }) => (isActive ? 'admin_sidebar_element active' : 'admin_sidebar_element')} style={{justifyContent:toggleSidebar?'':'center'}}>
                        <div className="flex items-center gap-2 admin_sidebar_element_main">
                            {sidebarItem.icon}
                            {toggleSidebar?<p>{sidebarItem.title}</p>:<></>}
                        </div>
                        {toggleSidebar?<div className="admin_sidebar_element_arrow"><i className="ri-arrow-right-s-fill"></i></div>:<></>}    
                    </NavLink>
                ))}
            </div>
        </div>
    )
}


export default AdminSidebar;