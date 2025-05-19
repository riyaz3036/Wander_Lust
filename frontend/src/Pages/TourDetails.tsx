import { useState, useEffect } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col} from 'reactstrap';
import { useParams, useLocation } from 'react-router-dom';
import Booking from '../Components/Booking/Booking';
import { BASE_URL } from '../utils/config';
import { format } from 'date-fns';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

const TourDetails = () => {
    const { pathname } = useLocation();
    const { id } = useParams();

    const [tour, setTour] = useState<any>(null);  
    const [tourLoading, setTourLoading] = useState(true);
    const [tourError, setTourError] = useState('');
    const [addAct, setAddAct] = useState<any>([]);
    const [buttonText, setButtonText] = useState('Add');
    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tours/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTour(data);
            } catch (error) {
                console.error('Error fetching tour data:', error);
                setTourError('Error loading data');
            } finally {
                setTourLoading(false);
            }
        };

        fetchTours();
    }, []);

    const addHandler = (act: any) => {
        if (addAct.includes(act)) {
            setAddAct((prevAddAct: any) => prevAddAct.filter((item: any) => item !== act));
        } else {
            setAddAct((prevAddAct: any) => [...prevAddAct, act]);
        }
    };

    const isActAdded = (act: any) => {
        return addAct.includes(act);
    };

    // Format date utility function using date-fns
    const formatDate = (dateString: any) => {
        try {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yyyy');
        } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
        }
    };
    

    return (
        <section>
            <Header />
            <Container>
                <Row>
                    <Col lg="8">
                        {tourLoading ? (
                            <p className="p-5 add_tour_error">Loading...</p>
                        ) : tourError ? (
                            <p className="p-5 add_tour_error">{tourError}</p>
                        ) : (
                            tour && (
                                <div className="tour__content">
                                    <img src={`${BASE_URL}/${tour.image.replace(/\\/g, '/')}`} loading="lazy" alt="" />
                                    <div className="tour__info">
                                        <h2>{tour.title}</h2>
                                        <div className="tour__details">
                                            <span className="d-flex align-items-center gap-1">
                                                <i className="ri-map-pin-fill"></i> {tour.location}
                                            </span>
                                            <span className="d-flex align-items-center gap-1">
                                                <i className="ri-wallet-3-fill"></i> ₹{tour.price}
                                            </span>
                                            <span className="d-flex align-items-center gap-1">
                                                <i className="ri-user-fill"></i> Vacancies: {tour.vacancy}/{tour.capacity}
                                            </span>
                                            <span className="d-flex align-items-center gap-1">
                                                <i className="ri-time-fill"></i> {tour.duration}
                                            </span>
                                            <span className="d-flex align-items-center gap-1">
                                            <i className="ri-calendar-fill"></i> {formatDate(tour.start_date)}
                                            </span>
                                        </div>

                                        <div className="description">
                                            <p>{tour.description}</p>
                                        </div>

                                        <div className="iter__list">
                                            {tour.destinations && tour.destinations.map((dest: any) => (
                                                <div className="dest__" key={dest._id}>
                                                    <h5>{dest.title}:</h5>
                                                    <p>{dest.description}</p>
                                                    {dest.activities && dest.activities.map((act: any) => (
                                                        <div className="act__" key={act._id}>
                                                            <h5>--{act.title}:</h5>
                                                            <p>{act.description}</p>
                                                            <span className="d-flex align-items-center gap-1">
                                                                Additional Price:<i className="ri-wallet-3-fill"></i> ₹{act.price}
                                                            </span>
                                                    
                                                            <button
                                                                className={`primary__btn ${isActAdded(act) ? 'remove' : 'add'}`}
                                                                onClick={() => addHandler(act)}
                                                            >
                                                                {isActAdded(act) ? 'Remove' : 'Add'} Activity
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </Col>

                    <Col>
                    {
                       tour?
                       <Booking tour={tour} addAct={addAct} />
                       :
                       <div>Loading...</div>
                    }
                    </Col>
                </Row>
            </Container>
            <Footer />
        </section>
    );
};

export default TourDetails;
