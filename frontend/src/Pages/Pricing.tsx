import { message } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/pricing.css';
import { generateRoute } from '../utils/generateRoute';
import { UserMembership } from '../enums/user-membership.enum';
import { useAuth } from '../auth/AuthProvider';
import PricingCard from '../Components/Pricing/PricingCard';
import PlanDescription from '../Components/Pricing/PlanDescription';
import Assurance from '../Components/common/Assurance/Assurance';

const Pricing = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user } = useAuth();

    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div>
            {/* Heading and subheading section */}
            <div className="pb-24 flex items-center justify-center gap-2 items-center pricing_description">
                <h2 className="text-center font-semibold text-white pricing_description_title">
                    Discover the best travel experiences with our plans
                </h2>
            </div>

            {/* Plans Section */}
            <div className="flex flex-col items-center pricing_plans_section">
                <p className="text-center font-semibold pricing_plans_title">Choose Your <span>Travel Plan</span></p>
                <p className="text-center pricing_plans_subtitle">
                    Our plans offer you the best options for an unforgettable travel experience.
                </p>
                <div className="flex flex-wrap justify-center items-center pricing_plans_main">
                    {/* General Plan */}
                    <PricingCard 
                        plan={UserMembership.GENERAL}
                        point1={<p>Access to free travel guides</p>}
                        point2={<p>Join travel community events</p>}
                        point3={<p>Basic support</p>}
                        price={0}
                        isDark={false}
                    />
                    {/* Gold Plan */}
                    <PricingCard 
                        plan={UserMembership.GOLD}
                        point1={<p>All features in <span style={{ color: '#fff' }}>General</span></p>}
                        point2={<p>10% discount on all bookings</p>}
                        point3={<p>Priority support</p>}
                        price={499}
                        isDark={true}
                    />
                    {/* Premium Plan */}
                    <PricingCard 
                        plan={UserMembership.PREMIUM}
                        point1={<p>All features in <span style={{ color: '#4D4D4D' }}>Gold</span></p>}
                        point2={<p>50% discount on all bookings</p>}
                        point3={<p>Dedicated travel consultant</p>}
                        price={999}
                        isDark={false}
                    />
                </div>
            </div>

            {/* Plan description section */}
            <div className="flex flex-wrap justify-center pricing_plan_desc">
                <PlanDescription 
                    plan={UserMembership.GENERAL}
                    point1={<p>Access to free travel guides and community events.</p>}
                    point2={<p>Basic support available.</p>}
                    point3={ <p>Perfect for occasional travelers.</p>}
                />
                <PlanDescription 
                    plan={UserMembership.GOLD}
                    point1={<p>All General plan features plus 10% booking discount.</p>}
                    point2={<p>Priority support for faster assistance.</p>}
                    point3={<p>Ideal for frequent travelers.</p>}
                />
                <PlanDescription 
                    plan={UserMembership.PREMIUM}
                    point1={<p>All Gold plan features plus 50% booking discount.</p>}
                    point2={<p>Dedicated travel consultant for personalized service.</p>}
                    point3={<p>Best for avid travelers seeking premium services.</p>}
                />
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
                        <div className="pricing_newsletter_section_bottom_logo"><i className="ri-mail-line"></i></div>
                        <input type="text" placeholder="yourmail123@gmail.com" />
                    </div>
                    <button className="pricing_newsletter_bttn"><i className="ri-arrow-right-line"></i></button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
