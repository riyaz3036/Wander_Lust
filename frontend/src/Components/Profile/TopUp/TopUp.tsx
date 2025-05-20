import React,{useState, memo} from 'react';
import {useNavigate} from 'react-router-dom'
import './top-up.css'
import topup from '../../../assets/images/topup.png';
import {message} from 'antd';
import { generateRoute } from '../../../utils/generateRoute';

const TopUp = () => {
    const navigate = useNavigate();

    const [balance, setBalance] = useState('');

    const handleChange = (event: any) => {
        setBalance(event.target.value);
    };

    const handleSubmit = async () => {
        if (balance === '') {
            message.info('Add Amount');
            return;
        }
        navigate(generateRoute.balancePay(balance));
    };


  return (
    <div className="flex flex-wrap items-center justify-center p-5 gap-5 profile_topup">
        <div className="profile_topup_left">
            <p className="top-up-title">Top Up Your <span className="highlight">Balance</span></p>
            <p className="top-up-description">Top up your balance to book your next holiday trip easily and enjoy your vacation without any worries!</p>
            <div>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="flex flex-col gap-1 mb-2 top_up_input">
                        <label>Amount(₹):</label>
                        <input type="number" name="balance" value={balance} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="topup_bttn">Pay</button>
                </form>
            </div>
        </div>

        <div className="topup_img"><img src={topup} loading="lazy" alt="Top Up" /></div>
    </div>
  );
};

export default memo(TopUp);
