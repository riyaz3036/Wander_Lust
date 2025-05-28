import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Assurance from '../../Components/Assurance/Assurance';
import DestinationList from '../../Components/Destination/DestinationList';
import PackageList from '../../Components/Package/PackageList';
import ScrollSection from '../../Components/ScrollSection/ScrollSection';
import FeaturesDisplay from '../../Components/homeFeatures/Featuers';
import VideoReviews from '../../Components/homeVideoReviews/VideoReviews';
import heroImg01 from '../../assets/images/hero-img01.jpg';
import heroImg02 from '../../assets/images/hero-img02.jpg';
import heroImg03 from '../../assets/images/hero-img03.jpg';
import Subtitle from '../../Components/common/Subtitle/Subtitle';
import '../../styles/home.css';
import { BASE_URL } from '../../utils/config';


const Home = () => {
    // To get Tour data
    const [tours, setTours] = useState([]);
    const [tourLoading, setTourLoading] = useState(true);
    const [tourError, setTourError] = useState('');

    // To get Destination Data
    const [destinations, setDestinations] = useState([]);
    const [destLoading, setDestLoading] = useState(true);
    const [destError, setDestError] = useState('');


    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tours/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTours(data);
                if (data.length === 0) {
                    setTourError('No Tours available');
                }
            } catch (error) {
                setTourError('Error loading data');
            } finally {
                setTourLoading(false);
            }
        };

        const fetchDestinations = async () => {
            try {
                const response = await fetch(`${BASE_URL}/destinations/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDestinations(data);
                if (data.length === 0) {
                    setDestError('No Destinations available');
                }
            } catch (error) {
                setDestError('Error loading data');
            } finally {
                setDestLoading(false);
            }
        };

        fetchTours();
        fetchDestinations();
    }, []);

    // To scroll to top
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    

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
            {/* Hero section ends here */}

            {/* Scroll Section */}
            <ScrollSection />

            {/* Destination section starts here */}
            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5">
                            <Subtitle subtitle={"Explore Destinations"} />
                            <h2 className="Packages__title">Have a quick glance at destinations we serve</h2>
                            {destLoading && <p className="p-5 add_tour_error">Loading...</p>}
                            {destError && <p className="text-center p-5 add_tour_error">{destError}</p>}
                        </Col>
                        <DestinationList destinations={destinations} />
                    </Row>
                </Container>
            </section>
            {/* Destination section ends here */}

            {/* Packages section starts here */}
            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5">
                            <Subtitle subtitle={"Explore Packages"} />
                            <h2 className="Packages__title">Our featured Packages</h2>
                            {tourLoading && <p className="p-5 add_tour_error">Loading...</p>}
                            {tourError && <p className="text-center p-5 add_tour_error">{tourError}</p>}
                        </Col>
                        <PackageList tours={tours} />
                    </Row>
                </Container>
            </section>
            {/* Packages section ends here */}

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
