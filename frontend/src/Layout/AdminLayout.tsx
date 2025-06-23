import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdmnHeader from "../components/common/admin-header/AdmnHeader";
import ColorConstants from "../constants/ColorConstants";
import RouteConstants from "../constants/RouteConstants";
import { RolesEnum } from "../enums/roles.enum";
import { authStore } from "../store/auth.store";
import { isSecureRoute } from "../utils/route.utils";
import AdmnSidebar from "../components/common/admin-sidebar/AdmnSidebar";

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    const user  = authStore.getUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
    
    useEffect(() => {
        if(user === null && isSecureRoute(location.pathname)){
            navigate(RouteConstants.root);
        }

        if (!user || user.role === RolesEnum.USER) {
            navigate(RouteConstants.pageNotFound);
        }
    }, [user, navigate]);

    return (
        <div className="w-[100vw] h-[100vh]">
            <AdmnHeader  setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar} />
            <AdmnSidebar toggleSidebar={toggleSidebar} />
            <div style={{backgroundColor: ColorConstants.adminBackground}}className={`h-[100vh] w-[100vw] min-w-[400px] pt-[90px] pb-[20px] pr-[20px] pl-[80px] overflow-y-auto overflow-x-auto lg:overflow-x-hidden ${toggleSidebar ? 'md:pl-[270px]' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;