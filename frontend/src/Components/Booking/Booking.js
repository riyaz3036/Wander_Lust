import React, {useEffect,useState,useContext} from 'react'
import './booking.css'
import {Form, FormGroup, ListGroup,ListGroupItem, Button} from 'reactstrap'
import {useNavigate} from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import {BASE_URL} from '../../utils/config.js';
import {AuthContext} from "./../../context/AuthContext";


const Booking = ({tour,addAct})=>{

const {vacancy,price}= tour
const Navigate = useNavigate()


//importing user data
let {user} = useContext(AuthContext);
if(user){
    user = useFetch(`${BASE_URL}/users/${user._id}`).data;
}





//data to send to api to book the trip
const [formData, setFormData] = useState({
    user_id: "",
    tour_id: "",
    signed_activities: [],
    price: 0,
    bookFor: "",
    guestSize: 1
});



useEffect(() => {
    if (user && user._id) {
        setFormData(prevFormData => ({
            ...prevFormData,
            user_id: user._id
        }));
    }
}, [user]);



useEffect(() => {
    if (tour && tour._id) {
        setFormData(prevFormData => ({
            ...prevFormData,
            tour_id: tour._id
        }));
    }
}, [tour]);



//to calculate total for the booking
const calcTot= ()=>{
   
    
   
    //add activities price
    let tot_ = addAct.reduce((total, item) => total + item.price * formData.guestSize, 0);

    tot_+= formData.guestSize * price;

    return tot_;
}

//calculating discount
const calcDisc= ()=>{
   
    
   
    //add activities price
    let dis_ = 0;
    
    if(!(!user || user===undefined || user===null)){
        if(user.membership==="premium") dis_=calcTot();
        else if(user.membership==="gold") dis_= 0.1 * calcTot();
    }

    return dis_;
}


//to update vacancy in activities

const updateActivities = async () => {
    try {
        for (const activity of addAct) {
            const response = await fetch(`${BASE_URL}/activity/${activity._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vacancy: activity.vacancy - formData.guestSize }) // Set the updated vacancy value here
            });

            if (!response.ok) {
                throw new Error(`Failed to update activity with ID ${activity._id}`);
            }

        }
    } catch (error) {
        console.error('Error:', error);
    }
};




//To handle all the changes and submit
const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value
    });
};



const handleSubmit = async (e) => {
    e.preventDefault();

    //check if the user is logged in?
    if(!user || user===undefined || user===null){
        alert('Please Login to Book your trip');
        return;
    }

    // Check if all required fields are filled
    const { bookFor, guestSize } = formData;
    
    if (!bookFor || !guestSize) {
        alert('Please fill in all required fields.');
        return;
    }

    //update price
    formData.price=calcTot()-calcDisc();

    //update signed activities
    formData.signed_activities=addAct;

    
    
    

    try {

        //update balance
        const response1 = await fetch(`${BASE_URL}/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "balance": user.balance - formData.price })
        });

       //update vacancies in tours
       const response2 = await fetch(`${BASE_URL}/tours/${tour._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "vacancy": tour.vacancy - formData.guestSize })
      });
      
      // calling function forupdate vacancies in activities
       updateActivities();
      
       
      
      

        // Make POST request
        fetch(`${BASE_URL}/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {

            
        const bookingId = data.data._id;
           

        
            

        fetch(`${BASE_URL}/users/addBook/${user._id}`, {
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "BookingId" :bookingId })
        });
              
        })
        .catch(error => {
            console.error('Error creating booking:', error);
        });

        
        // Redirect to thank-you page
        Navigate("/thank-you");

    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
};


    




//check if any activity with vacancy< guest size is selected

const check = () => {
//tour check
let chk__ = 1;

if(vacancy< formData.guestSize) chk__=0;
  
addAct.forEach(this_act => {
    let x = 1;
    if (this_act.vacancy < formData.guestSize) {
        x = 0;
    }
    chk__ *= x;
});

  //balance check
  if( !(!user || user===undefined || user===null) && calcTot()-calcDisc() > user.balance) {
    chk__=-1;
  } 

    return chk__;
};




    return (

            

        <div className="booking">

            {/*Booking top form starts here */}
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>₹{price} <span>/ Person</span></h3>
            </div>

            {/*Booking middle form starts here */}

            <div className="booking__form">
                <h5>Information:</h5>
                <Form className="booking__info-form" onSubmit={handleSubmit}>

                <FormGroup className="d-flex align-items-center gap-3">
                    <input type="date" placeholder="" id="bookFor" required onChange={handleChange } />
                    <input type="number" placeholder="No.of Guests" id="guestSize" required onChange={handleChange } />
                </FormGroup>

                </Form>            
   
            </div>
 

        {/*Booking bottom form starts here */}

        <div className="booking__bottom">
            <ListGroup>
            <ListGroupItem className="border-0 px-0">

            <h5 className="d-flex align-items-center gap-0.5">₹{price}<i class="ri-close-line"></i> {formData.guestSize} + Activities</h5>
            <span>₹{calcTot()}</span>
            
            </ListGroupItem>

            <ListGroupItem className="border-0 px-0">

            <h5>Membership Discount</h5>
            <span>{calcDisc()}</span>
            
            </ListGroupItem>
            

            <ListGroupItem className="border-0 px-0 total">

            <h5>Total</h5>
            <span>{calcTot()-calcDisc()}</span>
            
            </ListGroupItem>
            
            </ListGroup>


            <Button 
          className="btn primary__btn w-100 mt-4" 
          onClick={handleSubmit}
          disabled={check() <= 0}
         >
         {check() === 0
          ? 'Make sure if added activities/tour vacancy greater than guest size'
          : check() === -1
          ? 'Insufficient Balance'
          : 'Book Now'}
            </Button>

        </div>
         
            
        </div>
    )
};

export default Booking;