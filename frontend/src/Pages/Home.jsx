import React, { useEffect, useState, useRef } from 'react';
import '../styles/home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
import heroImg01 from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroImg03 from '../assets/images/hero-img03.jpg';
import customer_rev1 from "../assets/videos/customer_rev1.mp4";
import customer_rev2 from "../assets/videos/customer_rev2.mp4";
import customer_rev3 from "../assets/videos/customer_rev3.mp4";
import features_vid from "../assets/videos/features_vid.mp4";
import Subtitle from '../shared/Subtitle';
import ScrollSection from '../Components/ScrollSection/ScrollSection.jsx';
import Assurance from '../Components/Assurance/Assurance.js';
import PackageList from '../Components/Package/PackageList';
import DestinationList from '../Components/Destination/DestinationList';
import experienceImg from '../assets/images/experience.png';
import { BASE_URL } from '../utils/config.js';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js';

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

    const navigate = useNavigate();

    const customerRevRef1 = useRef();
    const customerRevRef2 = useRef();
    const customerRevRef3 = useRef();
    const featuresVidRef = useRef();

    // Function and states to handle playing and pausing videos
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = (videoRef) => {
        if (currentVideo && currentVideo !== videoRef) {
            currentVideo.pause();
            setIsPlaying(false);
        }

        if (videoRef.paused) {
            videoRef.play();
            setCurrentVideo(videoRef);
            setIsPlaying(true);
        } else {
            videoRef.pause();
            setCurrentVideo(null);
            setIsPlaying(false);
        }
    };

    return (
        <>
            <Header />

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
            <div className="home_video_reviews">
                <div className="flex justify-center mb-3 home_video_reviews_title">
                    <p className="font-semibold text-4xl"><span>Over</span> 1000+ <span>people trust us</span></p>
                </div>
                <div className="flex justify-center home_video_reviews_subtitle">
                    <p className="text-normal text-xl text-center">Discover the world with confidence. We provide the best travel deals, comprehensive guides, and exceptional customer service to make your journey unforgettable.</p>
                </div>
                <div className="flex justify-center mb-3 gap-14 home_video_reviews_main">
                    <div className="relative home_reviews_section">
                        <div className="home_review_img"><video src={customer_rev1} ref={customerRevRef1} /></div>
                        <div className="flex justify-between p-5 absolute bottom-0 home_review_content">
                            <div className="home_reviewer_details">
                                <p className="text-base font-medium text-white reviewer_name">Arjun Sharma</p>
                            </div>
                            <div className="home_play_button" onClick={() => handlePlayPause(customerRevRef1.current)}>
                                {isPlaying && currentVideo === customerRevRef1.current ? (
                                    <i className="ri-pause-line"></i>
                                ) : (
                                    <div className=""><i className="ri-play-line"></i></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="relative home_reviews_section">
                        <div className="home_review_img"><video src={customer_rev2} ref={customerRevRef2} /></div>
                        <div className="flex justify-between p-5 absolute bottom-0 home_review_content">
                            <div className="home_reviewer_details">
                                <p className="text-base font-medium text-white reviewer_name">Vihaan Patel</p>
                            </div>
                            <div className="home_play_button" onClick={() => handlePlayPause(customerRevRef2.current)}>
                                {isPlaying && currentVideo === customerRevRef2.current ? (
                                    <i className="ri-pause-line"></i>
                                ) : (
                                    <div className=""><i className="ri-play-line"></i></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="relative home_reviews_section">
                        <div className="home_review_img"><video src={customer_rev3} ref={customerRevRef3} /></div>
                        <div className="flex justify-between p-5 absolute bottom-0 home_review_content">
                            <div className="home_reviewer_details">
                                <p className="text-base font-medium text-white reviewer_name">Aisha Khan</p>
                            </div>
                            <div className="home_play_button" onClick={() => handlePlayPause(customerRevRef3.current)}>
                                {isPlaying && currentVideo === customerRevRef3.current ? (
                                    <i className="ri-pause-line"></i>
                                ) : (
                                    <div className=""><i className="ri-play-line"></i></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Assurance section */}
            <Assurance />

            {/* Features Video Section */}
            <div className="home_features">
                <div className="flex justify-center home_features_video">
                    <div className="flex relative justify-center items-center home_features_video_main" onClick={() => handlePlayPause(featuresVidRef.current)}>

                        <video src={features_vid} ref={featuresVidRef}/>

                        {isPlaying && currentVideo === featuresVidRef.current ? (
                                <></>
                        ) : (
                                <>
                                    <div className="flex justify-center items-center cursor-pointer home_features_play_button pr-1">
                                        <i class="ri-play-line"></i>
                                    </div>
                                    <p className="text-white absolute text-center font-medium"> Discover how our travel platform can make your adventures unforgettable!</p>
                                </>
                        )}

                    </div>
                </div>

                <div className="flex flex-wrap px-5 justify-center gap-10 py-12 home_customer_reviews">
                    <div className="flex flex-col items-center home_customer_review_section">
                        <p className="text-center font-lg mb-4 home_customer_review">"WanderLust made our family vacation amazing! The detailed itineraries and personalized recommendations made our trip truly memorable."</p>
                        <p className="text-center font-base font-medium home_reviewer">Aarav Patel</p>
                    </div>

                    <div className="flex flex-col items-center home_customer_review_section">
                        <p className="text-center font-lg mb-4 home_customer_review">"Thanks to WanderLust, our honeymoon was perfect. The suggestions for off-the-beaten-path locations and activities were just what we wanted!"</p>
                        <p className="text-center font-base font-medium home_reviewer">Ishita Sharma</p>
                    </div>

                    <div className="flex flex-col items-center home_customer_review_section">
                        <p className="text-center font-lg mb-4 home_customer_review">"WanderLust turned our weekend getaway into an cheerful and unforgettable experience. The local insights and tips helped us explore like a local!"</p>
                        <p className="text-center font-base font-medium home_reviewer">Rohan Gupta</p>
                    </div>
                </div>


            </div>

            <Footer />
        </>
    );
};

export default Home;
