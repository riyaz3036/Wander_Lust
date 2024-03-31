import React, { useState, useContext, useEffect } from 'react';
import '../styles/toggle.css';
import { BASE_URL } from '../utils/config.js';
import { AuthContext } from "./../context/AuthContext";
import useFetch from '../hooks/useFetch.js';
import { useNavigate,useLocation } from 'react-router-dom';

function ToggleMembership() {
    const { user } = useContext(AuthContext);
    const { data: userData } = useFetch(user ? `${BASE_URL}/users/${user._id}` : null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState('');
    const [balance, setBalance] = useState('');

    const handleChange = (event) => {
        setBalance(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const updatedUserResponse = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ balance: balance })
            });

            if (!updatedUserResponse.ok) {
                throw new Error('Failed to update balance');
            }

            alert('Balance updated successfully!');
            navigate('/toggle-membership');

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update membership. Please try again later.');
        }
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleUpdateMembership = async () => {
        try {
            const updatedUserResponse = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ membership: selectedOption })
            });

            if (!updatedUserResponse.ok) {
                throw new Error('Failed to update membership');
            }

            alert('Membership updated successfully!');
            navigate('/toggle-membership');

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update membership. Please try again later.');
        }
    };

    return (
        <>
            {
                user ? (
                    <div className="toggle__main">
                        <div className="details">
                            <h5>About Me:</h5>
                            <div className="details-item">
                                <p><span>Name: </span> {userData.username}</p>
                                <p><span>Email: </span> {userData.email}</p>
                                <p><span>Phone: </span> {userData.phone}</p>
                                <p><span>Available Balance: </span> {userData.balance}</p>
                                <p><span>Membership: </span>{userData.membership}</p>
                            </div>
                        </div>

                        <h5>Choose your Membership</h5>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateMembership(); }}>
                            {/* Radio inputs */}
                        </form>

                        <div className="toggle__sub">
                            <h5>Update Balance</h5>
                            <form onSubmit={handleSubmit}>
                                {/* Input for balance */}
                            </form>
                        </div>
                    </div>
                ) : (
                    <p className="no__login">(Please Login to view your details)</p>
                )
            }
        </>
    );
}

export default ToggleMembership;
