import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Footer from "../Components/common/Footer/Footer";
import Header from "../Components/common/Header/Header";
import RouteConstants from "../constants/RouteConstants";
import { RolesEnum } from "../enums/roles.enum";
import { isSecureRoute } from "../utils/route.utils";

const UserLayout = ({children} : {children: React.ReactNode})=> {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null && isSecureRoute(location.pathname)){
            navigate(RouteConstants.login);
        }

        if (user?.role === RolesEnum.ADMIN) {
            navigate(RouteConstants.pageNotFound);
        }
    }, [user, navigate]);
    

    return (
        <div className="w-[100vw] h-[100vh]">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default UserLayout;