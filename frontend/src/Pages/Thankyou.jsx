import React, {useEffect}from 'react'
import {Container,Row,Col,Button} from 'reactstrap'
import '../styles/thank-you.css'
import {Link,useLocation} from 'react-router-dom'
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js'

const Thankyou = ()=>{
        //get from top
        const { pathname } = useLocation();

        useEffect(() => {
          window.scrollTo(0, 0);
        }, [pathname]);
      
return (
    <section>
        <Header />
        <Container>
            <Row>
                <Col lg="12" className="pt-5 text-center">
                    <div className="thank__you">
                        <span><i class="ri-checkbox-circle-line"></i></span>
                    <h1 className="mb-3 fw-semibold">Thank You!!</h1>
                    <h3 className="mb-4">Your trip is booked</h3>
                    <h3 className="mb-4">You can check your Bookings in Bookings section</h3>
                    <Button className="btn primary__btn w-25"><Link to='/home'>Back to Home</Link></Button>
                    </div>
                </Col>
            </Row>
        </Container>
        <Footer />
    </section>
)
};


export default Thankyou;

