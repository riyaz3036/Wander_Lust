import { message, Typography } from 'antd';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import TourService from '../../service/tour.service';
import '../../styles/tour-details.css';
import { Tour } from '../../types/tour.types';
import { Activity } from '../../types/activity.types';
import { Destination } from '../../types/destination.types';
import BookTour from '../../components/TourDetails/BookTour/BookTour';
import LoadingOverlay from '../../components/common/LoadingOverlay/LoadingOverlay';
import ColorConstants from '../../constants/ColorConstants';


const TourDetails = () => {
    const { pathname } = useLocation();
    const { id } = useParams();
    const [tour, setTour] = useState<Tour>();  
    const [tourLoading, setTourLoading] = useState<boolean>(false);
    const [tourError, setTourError] = useState<string>('');
    const [additionalActivities, setAdditionalActivities] = useState<Activity[]>([]);
    

    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    // fetch the tours
    const fetchTour = () => {
        if(id === undefined) return;
        setTourLoading(true);
        TourService.fetchTour(id)
            .then((response) => {
                setTour(response?.data);
            })
            .catch((error) => {
                console.error('Error while fetching tours.', error);
                message.error(error.message || 'Error while fetching tours.');
                setTourError(error.message || 'Error while fetching tours.')
            })
            .finally(() => {
                setTourLoading(false);
            });
    };

    useEffect(() => {
        fetchTour();
    }, []);

    const addActivityHandler = (activity: Activity) => {
        if (additionalActivities.includes(activity)) {
            setAdditionalActivities((prevAddAct: any) => prevAddAct.filter((item: Activity) => item.id !== activity.id));
            message.success('activity removed');
        } else {
            setAdditionalActivities((prevAddAct: any) => [...prevAddAct, activity]);
            message.success('activity added');
        }
    };

    const isActAdded = (act: Activity) => {
        return additionalActivities.includes(act);
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
            <Container>
                <Row>
                    <Col lg="8">
                        {tourError ? (
                            <p className="p-5 add_tour_error">{tourError}</p>
                        ) : (
                            tour && (
                                <div className="tour__content">
                                    {tour.image && <img src={`${process.env.REACT_APP_BE_URL}/${tour.image.replace(/\\/g, '/')}`} loading="lazy" alt="" />}
                                    
                                    <div className="tour__info">
                                        <Typography.Title style={{fontSize: '26px'}}>{tour.title}</Typography.Title>
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

                                        <div className="flex flex-col gap-[10px]">
                                            {tour.destinations && tour.destinations.map((destination: Destination) => (
                                                <div key={destination.id}>
                                                    {/* Image and destination description */}
                                                    <div className="flex flex-col md:flex-row gap-[20px]">
                                                        <div className="w-[240px] h-[120px] flex-shrink-0">
                                                            {destination.image && (
                                                                <img src={`${process.env.REACT_APP_BE_URL}/${destination.image.replace(/\\/g, '/')}`} className="w-full h-full object-cover" />
                                                            )}
                                                        </div>
                                                        <div className="min-w-[300px]">
                                                            <Typography.Title className="m-0" style={{fontSize: '18px'}}>{destination.title}</Typography.Title>
                                                            <p className="mt-[5px]" style={{color: ColorConstants.textColor}}>{destination.description}</p>
                                                        </div>
                                                    </div>
                                                    {/* Activities */}
                                                    <div className="mt-[10px] flex flex-col gap-[10px]">
                                                        {destination.activities && destination.activities.map((activity: Activity) => (
                                                            <div className="p-[5px]" style={{backgroundColor: ColorConstants.grey}} key={activity.id}>
                                                                <Typography.Title style={{fontSize: '16px', margin: '0 0 5px 0'}}>{activity.title}</Typography.Title>
                                                                <Typography.Title style={{fontSize: '14px', margin: 0, fontWeight: 400, color: ColorConstants.textColor}}>{activity.description}</Typography.Title>
                                                                <div className="flex justify-between items-center mt-[15px]">
                                                                    <div className="flex flex-wrap items-center gap-1">
                                                                        <p className="m-0">Additional Price:</p>
                                                                        ₹{activity.price}
                                                                    </div>
                                                            
                                                                    <button
                                                                        className={`${isActAdded(activity) ? 'remove' : 'add'}`}
                                                                        style={{backgroundColor: ColorConstants.secondaryColor, padding: '5px', borderRadius: '5px', fontSize: '14px'}}
                                                                        onClick={() => addActivityHandler(activity)}
                                                                    >
                                                                        {isActAdded(activity) ? 'Remove' : 'Add'} Activity
                                                                    </button>
                                                                </div>
                                                                
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="w-full h-[10px]" style={{borderBottom: `1px solid${ColorConstants.darkGrey}`}}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </Col>

                    <Col>
                    {tour && <BookTour tour={tour} additionalActivities={additionalActivities} />}
                    </Col>
                </Row>
            </Container>
            {tourLoading && <LoadingOverlay />}
        </section>
    );
};

export default TourDetails;
