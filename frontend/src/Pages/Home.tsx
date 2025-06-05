import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import heroImg01 from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroImg03 from '../assets/images/hero-img03.jpg';
import '../styles/home.css';
import { Tour } from '../types/tour.types';
import { Destination } from '../types/destination.types';
import TourService from '../service/tour.service';
import DestinationService from '../service/destination.service';
import Subtitle from '../components/common/Subtitle/Subtitle';
import ScrollSection from '../components/Home/ScrollSection/ScrollSection';
import Loading from '../components/common/Loading/Loading';
import DestinationList from '../components/Home/DestinationList/DestinationList';
import VideoReviews from '../components/Home/homeVideoReviews/VideoReviews';
import Assurance from '../components/common/Assurance/Assurance';
import FeaturesDisplay from '../components/Home/homeFeatures/Featuers';
import TourList from '../components/Home/TourList/TourList';
import ColorConstants from '../constants/ColorConstants';
import RouteConstants from '../constants/RouteConstants';



const Home = () => {
    const navigate = useNavigate();
    const [tours, setTours] = useState<Tour[]>([]);
    const [tourLoading, setTourLoading] = useState<boolean>(true);
    const [tourError, setTourError] = useState<string>('');
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [destLoading, setDestLoading] = useState<boolean>(true);
    const [destError, setDestError] = useState<string>('');

    // To scroll to top
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    // fetch the tours
    const fetchTours = () => {
        setTourLoading(true);
        TourService.fetchTourWithPagination(1, 4)
            .then((response) => {
                setTours(response?.data);
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


    // fetch the destinations
    const fetchDestinations = () => {
        setDestLoading(true);
        DestinationService.fetchDestinationsWithPagination(1, 8)
            .then((response) => {
                setDestinations(response?.data);
            })
            .catch((error) => {
                console.error('Error while fetching destinations.', error);
                message.error(error.message || 'Error while fetching destinations.');
                setDestError(error.message || 'Error while fetching destinations.')
            })
            .finally(() => {
                setDestLoading(false);
            });
    };
    

    useEffect(() => {
        fetchTours();
        fetchDestinations();
    }, []);

    return (
        <>
            {/* Heading and subheading section */}
            <div className="pb-24 flex items-center justify-center gap-2 items-center home_description">
                <h2 className="text-center font-semibold text-white home_description_title">
                Unlock Your Next Adventure with Exclusive Travel Deals
                </h2>
            </div>

            {/* Hero section starts here */}
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="hero__content">
                                <div className="hero__subtitle d-flex align-items-center ">
                                    <Subtitle subtitle={'Know before You go'} />
                                </div>
                                <h1>Traveling is the way to explore <span className="highlight__text">yourself</span></h1>
                                <p>
                                    Join our expedition and immerse yourself in the wonders of travel.
                                    Come explore the world with us, where every destination is a story waiting to be told.
                                    Let's wander together and discover the magic that awaits beyond the horizon,
                                    as we turn dreams into unforgettable experiences.
                                </p>
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box">
                                <img src={heroImg01} loading="lazy" alt="" />
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box mt-4">
                                <img src={heroImg02} loading="lazy" alt="" />
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box mt-5">
                                <img src={heroImg03} loading="lazy" alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Scroll Section */}
            <ScrollSection />

            {/* Destination section starts here */}
            <section>
                <Container>
                    <Row>
                        <Col className="mb-5">
                            <Subtitle subtitle={"Explore Destinations"} />
                            <h2 className="Packages__title">Have a quick glance at destinations we serve</h2>
                            {destError.length !== 0 && <p className="text-center p-5 add_tour_error">{destError}</p>}
                        </Col>
                        {destLoading ? (
                            <Loading />
                        ): (
                            <DestinationList destinations={destinations} />
                        )}
                    </Row>
                    {!destLoading && (
                        <div className="my-[40px] flex justify-center gap-1 items-center profile_pricing_bttn" onClick={() => navigate(RouteConstants.AllDestinations)}>
                            <p >view more</p>
                            <i className="ri-arrow-right-line"></i>
                        </div>
                    )}
                </Container>
            </section>

            {/* Packages section starts here */}
            <section>
                <Container>
                    <Row>
                        <Col className="mb-5">
                            <Subtitle subtitle={"Explore Packages"} />
                            <h2 className="Packages__title">Our featured Packages</h2>
                            {tourError.length !== 0 && <p className="text-center p-5 add_tour_error">{tourError}</p>}
                        </Col>
                        {tourLoading ? (
                            <Loading />
                        ): (
                            <TourList tours={tours} />
                        )}
                    </Row>
                    {!tourLoading && (
                        <div className="my-[40px] flex justify-center gap-1 items-center profile_pricing_bttn" onClick={() => navigate(RouteConstants.allTours)}>
                            <p >view more</p>
                            <i className="ri-arrow-right-line"></i>
                        </div>
                    )}
                </Container>
            </section>


            {/* Customer video reviews section */}
            <VideoReviews />
            
            {/* Assurance section */}
            <Assurance />

            {/* Features Video Section */}
            <FeaturesDisplay />
        </>
    );
};

export default Home;
