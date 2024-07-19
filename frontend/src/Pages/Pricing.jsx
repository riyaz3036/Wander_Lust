import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pricing.css';
import Assurance from '../Components/Assurance/Assurance.js';
import Header from '../Components/Header/Header.js';
import Footer from '../Components/Footer/Footer.js'


const Pricing = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Header />
            {/* Heading and subheading section */}
            <div className="pb-24 flex flex-col gap-2 items-center home_description">
                <h2 className="text-center font-semibold home_description_title">
                    Discover the best travel experiences with our plans
                </h2>
            </div>

            {/* Plans Section */}
            <div className="bg-black flex flex-col items-center pricing_plans_section">
                <p className="text-center font-semibold pricing_plans_title">Choose Your <span>Travel Plan</span></p>
                <p className="text-center pricing_plans_subtitle">
                    Our plans offer you the best options for an unforgettable travel experience.
                </p>
                <div className="flex flex-wrap justify-center items-center pricing_plans_main">
                    
                    {/* General Plan */}
                    <div onClick={()=>navigate('/payment/General')} className="p-7 pricing_plan_card" style={{backgroundColor: '#fff'}}>
                        <div className="pricing_plan_card_top" style={{ borderBottom: '1px solid #D5D5D5' }}>
                            <p className="font-semibold text-3xl" style={{color: '#4D4D4D'}}>General</p>
                            <p className="text-xs" style={{color: '#AEAEAE'}}>₹ <span className="text-lg font-medium" style={{color: '#4D4D4D'}}>0</span> /year</p>
                        </div>
                        <div className="pricing_plan_card_bottom">
                            <div className="pricing_plan_card_bottom_element">
                                <i className="ri-checkbox-circle-fill" style={{color: '#4D4D4D'}}></i>
                                <p>Access to free travel guides</p>
                            </div>
                            <div className="pricing_plan_card_bottom_element">
                                <i className="ri-checkbox-circle-fill" style={{color: '#4D4D4D'}}></i>
                                <p>Join travel community events</p>
                            </div>
                            <div className="pricing_plan_card_bottom_element">
                                <i className="ri-checkbox-circle-fill" style={{color: '#4D4D4D'}}></i>
                                <p>Basic support</p>
                            </div>
                        </div>
                        <button className="pricing_plan_card_bttn">Choose Plan</button>
                    </div>

                    {/* Gold Plan */}
                    <div onClick={()=>navigate('/payment/Gold')} className="pricing_plan_card" style={{backgroundColor: '#1E1E1E'}}>
                        <div className="pricing_plan_card_top" style={{ borderBottom: '1px solid #3F3F3F' }}>
                            <p className="font-semibold text-3xl" style={{color: '#fff'}}>Gold</p>
                            <p className="text-xs" style={{color: '#AEAEAE'}}>₹ <span className="text-lg font-medium" style={{color: '#fff'}}>499</span> /year</p>
                        </div>
                        <div className="pricing_plan_card_bottom">
                            <div className="pricing_plan_card_bottom_element">
                                <i className="ri-checkbox-circle-fill" style={{color: '#fff'}}></i>
                                <p>All features in <span style={{color: '#fff'}}>General</span></p>
                            </div>
                            <div className="pricing_plan_card_bottom_element">
                                <i className="ri-checkbox-circle-fill" style={{color: '#fff'}}></i>
                                <p>10% discount on all bookings</p>
                            </div>
                            <div className="pricing_plan_card_bottom_element">
                                <i className="ri-checkbox-circle-fill" style={{color: '#fff'}}></i>
                                <p>Priority support</p>
                            </div>
                        </div>
                        <button className="pricing_plan_card_bttn">Choose Plan</button>
                    </div>

                    {/* Premium Plan */}
                    <div onClick={()=>navigate('/payment/Premium')} className="pricing_plan_card" style={{backgroundColor: '#fff'}}>
                        <div className="pricing_plan_card_top" style={{ borderBottom: '1px solid #D5D5D5' }}>
                            <p className="font-semibold text-3xl" style={{color: '#4D4D4D'}}>Premium</p>
                            <p className="text-xs" style={{color: '#AEAEAE'}}>₹ <span className="text-lg font-medium" style={{color: '#4D4D4D'}}>999</span> /year</p>
                        </div>
                        <div className="pricing_plan_card_bottom">
                            <div className="pricing_plan_card_bottom_element">
                                <i className="ri-checkbox-circle-fill" style={{color: '#4D4D4D'}}></i>
                                <p>All features in <span style={{color: '#4D4D4D'}}>Gold</span></p>
                            </div>
                            <div className="pricing_plan_card_bottom_element">
                                <i className="ri-checkbox-circle-fill" style={{color: '#4D4D4D'}}></i>
                                <p>50% discount on all bookings</p>
                            </div>
                            <div className="pricing_plan_card_bottom_element">
                                <i className="ri-checkbox-circle-fill" style={{color: '#4D4D4D'}}></i>
                                <p>Dedicated travel consultant</p>
                            </div>
                        </div>
                        <button className="pricing_plan_card_bttn">Choose Plan</button>
                    </div>
                </div>
            </div>

        

            {/* Plan description section */}
            <div className="flex flex-wrap justify-center pricing_plan_desc">
                <div className="pricing_plan_desc_card">
                    <p className="pricing_plan_desc_card_title">General Plan</p>
                    <div className="pricing_plan_desc_card_element">
                        <i className="ri-checkbox-circle-fill"></i>
                        <p>Access to free travel guides and community events.</p>
                    </div>
                    <div className="pricing_plan_desc_card_element">
                        <i className="ri-checkbox-circle-fill"></i>
                        <p>Basic support available.</p>
                    </div>
                    <div className="pricing_plan_desc_card_element">
                        <i className="ri-checkbox-circle-fill"></i>
                        <p>Perfect for occasional travelers.</p>
                    </div>
                </div>

                <div className="pricing_plan_desc_card">
                    <p className="pricing_plan_desc_card_title">Gold Plan</p>
                    <div className="pricing_plan_desc_card_element">
                        <i className="ri-checkbox-circle-fill"></i>
                        <p>All General plan features plus 10% booking discount.</p>
                    </div>
                    <div className="pricing_plan_desc_card_element">
                        <i className="ri-checkbox-circle-fill"></i>
                        <p>Priority support for faster assistance.</p>
                    </div>
                    <div className="pricing_plan_desc_card_element">
                        <i className="ri-checkbox-circle-fill"></i>
                        <p>Ideal for frequent travelers.</p>
                    </div>
                </div>

                <div className="pricing_plan_desc_card">
                    <p className="pricing_plan_desc_card_title">Premium Plan</p>
                    <div className="pricing_plan_desc_card_element">
                        <i className="ri-checkbox-circle-fill"></i>
                        <p>All Gold plan features plus 50% booking discount.</p>
                    </div>
                    <div className="pricing_plan_desc_card_element">
                        <i className="ri-checkbox-circle-fill"></i>
                        <p>Dedicated travel consultant for personalized service.</p>
                    </div>
                    <div className="pricing_plan_desc_card_element">
                        <i className="ri-checkbox-circle-fill"></i>
                        <p>Best for avid travelers seeking premium services.</p>
                    </div>
                </div>
            </div>


            {/* Assurance Section */}
            <Assurance /> 



            {/* Newsletter Section */}
            <div className="flex flex-col items-center pricing_newsletter_section">
                <div className="pricing_newsletter_section_top">
                    <p className="font-medium pricing_newsletter_section_title">Send us your Mail</p>
                    <p className="font-normal pricing_newsletter_section_subtitle">We will get you a perfect plan</p>
                </div>
                <div className="flex items-center justify-center pricing_newsletter_section_bottom">
                    <div className="flex items-center bg-white pricing_newsletter_section_bottom_main">
                        <div className="pricing_newsletter_section_bottom_logo"><i class="ri-mail-line"></i></div>
                        <input type="text" placeholder="yourmail123@gmail.com" />
                    </div>
                    <button className="pricing_newsletter_bttn"><i class="ri-arrow-right-line"></i></button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Pricing;
