import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import payment from '../../assets/images/payment.png';
import Success from '../../Components/Success/Success';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import {message} from 'antd';


const Payment = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); 


  const [mode, setMode] = useState('Bitcoin');
  const [success, setSuccess] = useState(0);

  // Determine amount based on plan ID
  const getAmount = (planId: string) => {
    if (planId === 'General') {
      return 0;
    } else if (planId === 'Gold') {
      return 499;
    } else if (planId === 'Premium') {
      return 999;
    } else {
      return 0; 
    }
  };

  const amount = id ? getAmount(id) : 0;

  const payDone = async () => {

    try {
      const updatedUserResponse = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ membership: id })
      });

      if (!updatedUserResponse.ok) {
        throw new Error('Failed to update Membership');
      }

      setSuccess(1);

    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to update Membership. Please try again later.');
    }
  };

  return (
      <main className="flex flex-wrap items-center justify-center gap-20 py-10 px-5">
        <div className="" style={{ width: '700px' }}>
          <p className="text-3xl font-bold mb-5 mt-0 mx-0">PAYMENT</p>
          <div className="flex flex-col mb-5">
            <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4' }} onClick={() => setMode('Bitcoin')}>
              <div className="w-3 h-3 bg-white rounded-md" style={{ border: mode === "Bitcoin" ? '4px solid #f16d5b' : '1px solid #C4C4C4' }}></div>
              <p className="m-0">Bitcoin</p>
            </button>
            <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4' }} onClick={() => setMode('Apple Wallet')}>
              <div className="w-3 h-3 bg-white rounded-md" style={{ border: mode === "Apple Wallet" ? '4px solid #f16d5b' : '1px solid #C4C4C4' }}></div>
              <p className="m-0">Apple Wallet</p>
            </button>
            <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4' }} onClick={() => setMode('Paypal')}>
              <div className="w-3 h-3 bg-white rounded-md" style={{ border: mode === "Paypal" ? '4px solid #f16d5b' : '1px solid #C4C4C4' }}></div>
              <p className="m-0">Paypal</p>
            </button>
            <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4' }} onClick={() => setMode('Debit/Credit Card')}>
              <div className="w-3 h-3 bg-white rounded-md" style={{ border: mode === "Debit/Credit Card" ? '4px solid #f16d5b' : '1px solid #C4C4C4' }}></div>
              <p className="m-0">Debit/Credit Card</p>
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between mb-5">
            <Link to="/pricing" className="no-underline font-semibold text-sm cursor-pointer m-0" style={{ color: '#231F20' }}>&lt; go back</Link>
            <button
              className="text-white text-lg font-bold py-2 px-5"
              style={{ backgroundColor: '#f16d5b' }}
              onClick={payDone}
            >
              Pay ₹{amount}
            </button>
          </div>
          {success === 1 && <Success />}
        </div>
        <div className="" style={{ width: '500px' }}>
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={payment} loading="lazy" alt="Payment Options" />
          </div>
        </div>
      </main>
  );
};

export default Payment;
