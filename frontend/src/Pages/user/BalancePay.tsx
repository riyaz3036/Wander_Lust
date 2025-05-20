import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import payment from '../../assets/images/payment.png';
import Success from '../../Components/Success/Success';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import {message} from 'antd';


const BalancePay = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [mode, setMode] = useState('Bitcoin');
  const [success, setSuccess] = useState(0);
  const [balance, setBalance] = useState(0); // Initialize balance

  useEffect(() => {
    // Fetch user's current balance
    const fetchUserBalance = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${user._id}`);
        const data = await response.json();
        setBalance(data.balance || 0); // Set initial balance
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserBalance();
  }, [user._id]);

  const payDone = async () => {
    try {
      // Ensure id is a number and convert it to float
      const amount = id ? parseFloat(id) : 0;
      if (isNaN(amount) || amount <= 0) {
        message.error('Invalid amount');
        return;
      }

      // Send POST request to addBal endpoint
      const updatedUserResponse = await fetch(`${BASE_URL}/users/${user._id}/addBal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount }) // Send amount to be added
      });

      if (!updatedUserResponse.ok) {
        throw new Error('Failed to update balance');
      }

      setSuccess(1);

    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to update balance. Please try again later.');
    }
  };

  return (
    <main className="flex flex-wrap items-center justify-center gap-20 py-10 px-5">
      <div className="" style={{ width: '700px' }}>
        <p className="text-3xl font-bold mb-5 mt-0 mx-0">PAYMENT</p>
        <div className="flex flex-col mb-5">
          <button 
            className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" 
            style={{ border: '1px solid #C4C4C4' }} 
            onClick={() => setMode('Bitcoin')}
          >
            <div className="w-3 h-3 bg-white rounded-md" style={{ border: mode === "Bitcoin" ? '4px solid #f16d5b' : '1px solid #C4C4C4' }}></div>
            <p className="m-0">Bitcoin</p>
          </button>
          <button 
            className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" 
            style={{ border: '1px solid #C4C4C4' }} 
            onClick={() => setMode('Apple Wallet')}
          >
            <div className="w-3 h-3 bg-white rounded-md" style={{ border: mode === "Apple Wallet" ? '4px solid #f16d5b' : '1px solid #C4C4C4' }}></div>
            <p className="m-0">Apple Wallet</p>
          </button>
          <button 
            className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" 
            style={{ border: '1px solid #C4C4C4' }} 
            onClick={() => setMode('Paypal')}
          >
            <div className="w-3 h-3 bg-white rounded-md" style={{ border: mode === "Paypal" ? '4px solid #f16d5b' : '1px solid #C4C4C4' }}></div>
            <p className="m-0">Paypal</p>
          </button>
          <button 
            className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" 
            style={{ border: '1px solid #C4C4C4' }} 
            onClick={() => setMode('Debit/Credit Card')}
          >
            <div className="w-3 h-3 bg-white rounded-md" style={{ border: mode === "Debit/Credit Card" ? '4px solid #f16d5b' : '1px solid #C4C4C4' }}></div>
            <p className="m-0">Debit/Credit Card</p>
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between mb-5">
          <Link 
            to="/pricing" 
            className="no-underline font-semibold text-sm cursor-pointer m-0" 
            style={{ color: '#231F20' }}
          >
            &lt; go back
          </Link>
          <button
            className="text-white text-lg font-bold py-2 px-5"
            style={{ backgroundColor: '#E2342D' }}
            onClick={payDone}
          >
            Pay ₹{id ? parseFloat(id).toFixed(0) : 0} {/* Ensure integer display */}
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

export default BalancePay;
