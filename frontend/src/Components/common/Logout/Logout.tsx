import React, { useState } from 'react';
import './logout.css';
import { authStore } from '../../../store/auth.store';
import { Modal, Typography } from 'antd';
import Loading from '../Loading/Loading';
import ColorConstants from '../../../constants/ColorConstants';

interface LogoutProps {
  showLogout: boolean;
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>;
}


const Logout: React.FC<LogoutProps> = ({showLogout, setShowLogout}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleLogout=()=>{
        authStore.logout(setIsLoading);
        setShowLogout(false);
    }
    
    return (
        <Modal 
            open={showLogout}
            footer={
            <div style={{display: 'flex', justifyContent: 'end', gap: '20px'}}>
                <button style={{backgroundColor: ColorConstants.black, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={() => setShowLogout(false)}>No</button>
                <button style={{backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.white, width: '60px', height: '30px', borderRadius: '5px'}} onClick={handleLogout}>Yes</button>
            </div>
            }
            onCancel={() => setShowLogout(false)}
        >
                {isLoading ? (
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
                        <Loading />
                    </div>
                ): (
                    <Typography.Title style={{fontSize: '18px', padding: '20px 0', fontWeight: 400}}>Are you sure you want to logout?</Typography.Title>
                )} 
        </Modal>
    );
}

export default Logout;
