import { useContext, useEffect } from "react";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { AuthContext } from "../context/AuthContext";
import { RolesEnum } from "../enums/roles.enum";
import RouteConstants from "../constants/RouteConstants";
import { useNavigate } from "react-router-dom";

const UserLayout = ({children} : {children: React.ReactNode})=> {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === RolesEnum.ADMIN) {
            navigate(RouteConstants.pageNotFound);
        }
    }, [user, navigate]);
    

    return (
        <div className="w-full h-full">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default UserLayout;