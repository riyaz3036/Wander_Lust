import React,{useState,useEffect} from 'react'
import '../styles/tour-details.css'
import {Container,Row, Col, Button} from 'reactstrap'
import { useParams,Link,useLocation } from 'react-router-dom';
import Booking from '../Components/Booking/Booking'
import {BASE_URL} from '../utils/config.js';
import useFetch from '../hooks/useFetch.js';


const TourDetails = ()=>{


    //get from top
    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


//extracting current tour data
const {id}=useParams()
const {data : tourData} = useFetch(`${BASE_URL}/tours/${id}`);
const {_id , title, location, photo, description,vacancy, duration,price,capacity,destinations } = tourData






//extracting current destinations populated by activites(imp)

const {data: destinationData} = useFetch(`${BASE_URL}/destination`);


    //select only destinations of current tour

    const curr_tour_dests = destinationData.map(dest => {
        const foundDestination = destinations?.find(d => d._id.toString() === dest._id.toString());
        if (foundDestination) {
            // Some code to execute if dest._id is found in destinations
            return dest;
        }
    }).filter(Boolean);

   


//add activity 

const [addAct, setAddAct] = useState([]);
    const [buttonText, setButtonText] = useState('Add');

    const addHandler = (act) => {
        if (addAct.includes(act)) {
            setAddAct(prevAddAct => prevAddAct.filter(item => item !== act));
        } else {
            setAddAct(prevAddAct => [...prevAddAct, act]);
        }
    };

    const isActAdded = (act) => {
        return addAct.includes(act);
    };




return (
    <section>
        <Container>
            <Row>
                <Col lg="8">
                <div className="tour__content">
                <img src={photo} alt="" />
                <div className="tour__info">
                    <h2>
                        {title}
                    </h2>
                    <div className="d-flex align-items-center gap-5">
                        <span className="d-flex align-items-center gap-1">
                            <i class="ri-map-pin-fill"></i> {location}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                        <i class="ri-wallet-3-fill"></i> ₹{price}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                            <i class="ri-group-line"></i> Vacencies: {vacancy}/{capacity}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                             {duration}
                        </span>

                    </div>

                    <div className="description">
                        <p>{description}
                        </p>
                    </div>

                   

                    <div className="iter__list">
            {curr_tour_dests && curr_tour_dests.map(dest => (
                <div className="dest__" key={dest._id}>
                    <h5>{dest.title}:</h5>
                    <p>{dest.description}</p>
                    {/* Check if activities exist before mapping over them */}
                    {dest.activities && dest.activities.map(act => (
                        <div className="act__" key={act._id}>
                        <h5>--{act.title}:</h5>
                        <p>{act.description}</p>
                        <span className="d-flex align-items-center gap-1">
                            Additional Price:<i className="ri-wallet-3-fill"></i> ₹{act.price}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                            <i className="ri-group-line"></i> Vacancies: {act.vacancy}/{capacity}
                        </span>
                        <button className={`primary__btn ${isActAdded(act) ? 'remove' : 'add'}`} onClick={() => addHandler(act)} disabled={act.vacancy === 0}>
                            {act.vacancy === 0 ? 'No Vacancy in the' : (isActAdded(act) ? 'Remove' : 'Add')} Activity
                        </button>
                    </div>
                    ))}
                </div>
          
                    ))}
                    </div>
                        

                    </div>
                </div>
            


                <div className="pass">
                    <h5>Passenges in this tour</h5>
                <Button><Link to={`/passengers/${id}`}>Get Passengers List</Link></Button>
                </div>
                </Col>

                <Col>
                <Booking 
                tour={tourData} 
                addAct={addAct}
                />
                </Col>
            </Row>
        </Container>
    </section>
)
};


export default TourDetails;