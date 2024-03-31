import React,{useEffect,useContext} from 'react'
import {Container, Row,Col} from 'reactstrap'
import { useParams,useLocation} from 'react-router-dom';
import '../styles/passengers.css'
import {BASE_URL} from '../utils/config.js';
import useFetch from '../hooks/useFetch.js';
import {AuthContext} from "./../context/AuthContext";

const Passengers = ({})=>{

//to scroll to top
const { pathname } = useLocation();

useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]);




//Retreieving all the tour data and passenger data
const {id}=useParams()
const {data : tourData} = useFetch(`${BASE_URL}/tours/${id}`); 
const {data : passengers} = useFetch(`${BASE_URL}/tours/all/${id}`); 
const {user}= useContext(AuthContext);

return (
    <section>
        <Container>
            <Row>
                <Col lg="8">
                <div className="tour__img">
                <img src={tourData.photo} alt="" />
                </div>  

                <div className="tour__info">
                    <h2>
                        {tourData.title}
                    </h2>
                    <div className="d-flex align-items-center gap-5">
                        <span className="d-flex align-items-center gap-1">
                            <i class="ri-map-pin-fill"></i> {tourData.location}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                        <i class="ri-wallet-3-fill"></i> ₹{tourData.price}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                            <i class="ri-group-line"></i>{tourData.vacancy}/ {tourData.capacity}
                        </span>

                </div>
                </div>

                </Col>

                <Col>
                {
                    user?
                    <div className="pass">
                    <h3>Passengers:</h3>
                    {passengers.map((passenger, index) => (
                    <div className="pass-item" key={index}>
                    <p><span>Name:</span> {passenger.username}</p>
                    <p><span>Booked For:</span>{passenger.bookDate}</p>
                    <p><span>Guest Size:</span> {passenger.guestSize}</p>
                    
                    </div>
                     ))}
                    </div>
                    :<>
                    <p>(Please login to view details)</p>
                    </>
                }
               
                
                </Col>

                
            </Row>
        </Container>
    </section>
)
};


export default Passengers;