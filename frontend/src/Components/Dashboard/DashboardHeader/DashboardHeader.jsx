import React,{useContext} from 'react';
import './dash-header.css'
import admin from '../../../assets/images/admin.png'
import { AuthContext } from '../../../context/AuthContext';


const DashboardHeader = () => {

    const { user } = useContext(AuthContext);

    return(
       <div className="flex justify-end items-center uni_dash_header" style={{left:'50px'}}>
            
            <div className="flex items-center uni_dash_header_right">
                
                <div className="flex items-center justify-center uni_dash_header_right_right">
                    <div className="uni_dash_header_dp"><img src={admin}/></div>

                    <div className="uni_dash_header_name overflow-hidden" style={{maxWidth:'150px'}}>
                        <p className="text-sm m-0">{user.username}</p>
                        <p className="text-xs m-0">Admin</p>
                    </div>
                </div>

            </div>
       </div>
    )
}


export default DashboardHeader;