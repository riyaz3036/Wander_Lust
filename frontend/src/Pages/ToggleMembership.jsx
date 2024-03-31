import React, { useState,useContext,useEffect } from 'react';
import '../styles/toggle.css'
import {BASE_URL} from '../utils/config.js';
import {AuthContext} from "./../context/AuthContext";
import useFetch from '../hooks/useFetch.js';
import {useLocation} from 'react-router-dom';

function ToggleMembership() {



//to scroll to top
const { pathname } = useLocation();

useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]);
    


    let {user} = useContext(AuthContext);
    if(user){
        user = useFetch(`${BASE_URL}/users/${user._id}`).data;
    }
    
   
    const [selectedOption, setSelectedOption] = useState('');
    const [balance,setBalance]= useState('');

   //to change balance
   const handleChange = (event) => {
    setBalance(event.target.value);
};

const handleSubmit = async ()=>{
    try {
        const updatedUserResponse = await fetch(`${BASE_URL}/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ balance: balance  })
        });

        if (!updatedUserResponse.ok) {
            throw new Error('Failed to update balance');
        }
        
        alert('Balance updated successfully!');
        location.reload();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to update membership. Please try again later.');
    }
}
      //to change membership
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
   
    //to submit membership
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
            location.reload();
            
            
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update membership. Please try again later.');
        }
    };

    return (
        <>
        
        {
            user?<>

            <div className="toggle__main">

<div className="details">

<h5>About Me:</h5>
<div className="details-item">
<p><span>Name: </span> {user.username}</p>
<p><span>Email: </span> {user.email}</p>
<p><span>Phone: </span> {user.phone}</p>
<p><span>Available Balance: </span> {user.balance}</p>
<p><span>Membership: </span>{user.membership}</p>
</div>

</div>  




 <h5>Coose your Membership</h5>
 <form onSubmit={(e) => { e.preventDefault(); handleUpdateMembership(); }}>
     <div>
         <label>
             <input
                 type="radio"
                 value="general"
                 checked={selectedOption === 'general'}
                 onChange={handleOptionChange}
             />
             General
         </label>
     </div>
     <div>
         <label>
             <input
                 type="radio"
                 value="gold"
                 checked={selectedOption === 'gold'}
                 onChange={handleOptionChange}
             />
             Gold
         </label>
     </div>
     <div>
         <label>
             <input
                 type="radio"
                 value="premium"
                 checked={selectedOption === 'premium'}
                 onChange={handleOptionChange}
             />
              Premium
         </label>
     </div>
     <button type="submit" className="primary__btn">Update</button>
 </form>
 

 <div className="toggle__sub">
     <h5>Update Balance</h5>
     <div>
<form onSubmit={handleSubmit}>
   
<div>
<label>Balance:</label>
<input
 type="number"
 name="age"
 value={balance}
 onChange={handleChange}
 required
/>
</div>

<button type="submit" className="primary__btn">Update</button>
</form>
</div>
 </div>
</div>
            </>:<>
            <p className="no__login">(Please Login to view your details)</p>
            </>
        }
        
        </>
       
    );
}

export default ToggleMembership;