import React,{useState, memo} from 'react'
import './admin-header.css'
import logo from '../../../assets/images/logo.png'
import logo_mini from '../../../assets/images/logo_mini.png'
import admin from '../../../assets/images/user_alt.png'
import Logout from '../Logout/Logout'

interface AdmnHeaderProps {
    toggleSidebar: boolean,
    setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdmnHeader: React.FC<AdmnHeaderProps> =({toggleSidebar,setToggleSidebar})=>{
    const [userDropdown, setUserDropdown] = useState<boolean>(false);
    const [showLogout,setShowLogout] = useState<boolean>(false);

    return(
        <div className="admin_header">
            <div>
                <div className={`admin_header_logo hidden ${toggleSidebar? 'md:block' : ''}`} style={{width:'250px', padding: '10px'}}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={`admin_header_logo block ${toggleSidebar? 'md:hidden':''}`} style={{width:'60px', padding: '15px 5px'}}>
                    <img src={logo_mini} alt="logo" />
                </div>
            </div>
            

            <div className="flex items-center justify-between admin_header_right">
                <div className="cursor-pointer admin_header_menu" onClick={() => setToggleSidebar(!toggleSidebar)}>
                    {toggleSidebar?<i className="ri-menu-3-line"></i>:<i className="ri-menu-2-line"></i>}
                </div>
                <div className="relative">
                    <div className="admin_header_user" onClick={()=> setUserDropdown(!userDropdown)}><img src={admin}/></div>
                    {userDropdown && (
                        <div className="admin_header_dropdown">
                            <div onClick={() => { setShowLogout(true); setUserDropdown(false); }} className="admin_header_dropdown_option">
                                <i className="ri-logout-box-r-line" style={{color: 'red'}}></i>
                                <p>Logout</p>
                            </div>
                        </div>
                    )}  
                </div>
            </div>
            {showLogout && (<Logout showLogout={showLogout} setShowLogout={setShowLogout}/>)}
        </div>
    )
}


export default memo(AdmnHeader);