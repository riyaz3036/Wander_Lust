import React , {useEffect} from 'react';
import '../styles/home.css'
import {useLocation} from 'react-router-dom';
import {Container, Col, Row} from 'reactstrap';
import heroImg01 from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroImg03 from '../assets/images/hero-img03.jpg'
import Subtitle from '../shared/Subtitle';
import PackageList from '../Components/Package/PackageList';
import DestinationList from '../Components/Destination/DestinationList';
import experienceImg from '../assets/images/experience.png';
import {BASE_URL} from '../utils/config.js';
import useFetch from '../hooks/useFetch.js';

const Home = ()=>{


     const {data : tourData} = useFetch(`${BASE_URL}/tours`);  //This is all the tour data
     const {data : destinationData} = useFetch(`${BASE_URL}/destination`); //This is all the destination data


//to scroll to top
const { pathname } = useLocation();

useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]);
         

return (
   <>
    {/* Hero section starts here */}

    <section>
    <Container>
     <Row>

        <Col lg='6'>
            <div className="hero__content">
             <div className="hero__subtitle d-flex align-items-center ">
                <Subtitle subtitle={'Know beforeYou go'}/>
               
            </div>
            <h1>Traveling is the way to explore <span className="highlight__text">yourself</span></h1>
            <p>Join our expedition and immerse yourself in the wonders of travel.
                 Come explore the world with us, where every destination is a story waiting to be told<br/>
                 Let's wander together and discover the magic that awaits beyond the horizon, 
                 as we turn dreams into unforgettable experiences
            </p>
            </div>
        </Col>

        <Col lg='2'>
        <div className="hero__img-box">
            <img src={heroImg01} alt="" />
        </div>
        </Col>

        <Col lg='2'>
        <div className="hero__img-box mt-4">
            <img src={heroImg02} alt="" />
        </div>
        </Col>

       <Col lg='2'>
        <div className="hero__img-box mt-5">
            <img src={heroImg03} alt="" />
        </div>
       </Col>

       
     </Row>

     

    </Container>
    </section>

    {/*Hero section ends here */}

    {/* Destination section starts here*/}

    

     <section>
    <Container> 
    <Row>
    <Col lg="12" className="mb-5">
        <Subtitle subtitle={"Explore Destinations"}/>
        <h2 className="Packages__title">Have a quick glance at destinations we serve</h2>
    
    </Col>

     <DestinationList destinationData={destinationData}/>  
    
   
    </Row>
    </Container>
    </section> 


    {/* Destination section starts here*/}


    {/*Packages section starts here*/}
    <section>
    <Container> 
    <Row>
    <Col lg="12" className="mb-5">
        <Subtitle subtitle={"Explore Packages"}/>
        <h2 className="Packages__title">Our featured Packages</h2>
    
    </Col>

    <PackageList tourData={tourData}/>
   
    </Row>
    </Container>
    </section>

    {/*Packages section ends here*/}

    {/* Experience Section starts here */}
    <section>
    <Container> 
    <Row>
    <Col lg="6" >

    <div className="experience__content">

    <Subtitle subtitle={"Our Experience"}/>

    <h2>
        With all our experience <br/> we will serve you
    </h2>
    <p>
    With over a decade of expertise,
     Wanderlust Expeditions crafts bespoke travel itineraries tailored to each client's desires, 
     ensuring every journey is as unique as the adventurer themselves<br/> From remote wilderness expeditions
      to cultural immersions in vibrant cities, we create unforgettable experiences that ignite the spirit of exploration
    </p>
    </div>
    </Col>

    <Col lg="6">
        <div className="experience__image">
        <img src={experienceImg} alt="experience-image"/>
        </div>
    </Col>

    
   
    </Row>
    </Container>
    </section>

    {/* Experience Section end here */}

      
 </>
)

};


export default Home;