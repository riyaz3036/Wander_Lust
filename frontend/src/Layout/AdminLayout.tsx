import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../Components/Dashboard/AdminHeader/AdminHeader";
import AdminSidebar from "../Components/Dashboard/AdminSidebar/AdminSidebar";
import { AuthContext } from "../context/AuthContext";
import { RolesEnum } from "../enums/roles.enum";
import RouteConstants from "../constants/RouteConstants";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [toggleSidebar, setToggleSidebar] = useState(0);
    
    useEffect(() => {
        if (!user || user.role === RolesEnum.USER) {
            navigate(RouteConstants.pageNotFound);
        }
    }, [user, navigate]);

    return (
        <div className="w-full h-full">
            <AdminHeader setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar} />
            <AdminSidebar toggleSidebar={toggleSidebar} />
            <div className={`admin_dashboard_main ml-[60px] ${toggleSidebar ? 'md:ml-[250px]' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;