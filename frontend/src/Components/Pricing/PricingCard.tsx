import { message } from "antd";
import { useAuth } from "../../auth/AuthProvider";
import { UserMembership } from "../../enums/user-membership.enum";
import { generateRoute } from "../../utils/generateRoute";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import ColorConstants from "../../constants/ColorConstants";

interface PricingCardProps {
    plan: UserMembership
    point1: ReactNode;
    point2: ReactNode;
    point3: ReactNode;
    price: number;
    isDark: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({plan, point1, point2, point3, price, isDark}) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleNavigate = (plan: UserMembership) => {
        if(user?.membership === plan) return; // return if it is his current membership
        if (user) navigate(generateRoute.membershipPayment(plan));
        else message.error('Please log in to choose a plan.');
    };

    return(
        <div onClick={() => handleNavigate(plan)} className="pricing_plan_card" style={{ backgroundColor: isDark ? '#1E1E1E' : '#fff', border: user !==null && user?.membership === plan ? `3px solid ${ColorConstants.secondaryColor}`: 'none' }}>
            <div className="pricing_plan_card_top" style={{ borderBottom: isDark ? '1px solid #3F3F3F': '1px solid #D5D5D5' }}>
                <p className="font-semibold text-3xl" style={{ color: isDark ? '#fff' : '#4D4D4D'}}>{plan}</p>
                <p className="text-xs" style={{ color: '#AEAEAE' }}>₹ <span className="text-lg font-medium" style={{ color: isDark ? '#fff' : '#4D4D4D' }}>{price}</span> /year</p>
            </div>
            <div className="pricing_plan_card_bottom">
                <div className="pricing_plan_card_bottom_element">
                    <i className="ri-checkbox-circle-fill" style={{ color: isDark ? '#fff' : '#4D4D4D' }}></i>
                    {point1}
                </div>
                <div className="pricing_plan_card_bottom_element">
                    <i className="ri-checkbox-circle-fill" style={{ color: isDark ? '#fff' : '#4D4D4D' }}></i>
                     {point2}
                </div>
                <div className="pricing_plan_card_bottom_element">
                    <i className="ri-checkbox-circle-fill" style={{ color: isDark ? '#fff' : '#4D4D4D' }}></i>
                     {point3}
                </div>
            </div>
            {user !==null && user?.membership === plan ? (
                <button className="pricing_plan_card_bttn" disabled={true}>Current Plan</button>
            ): (
                <button className="pricing_plan_card_bttn">Choose Plan</button>
            )}
        </div>
    )
}

export default PricingCard;